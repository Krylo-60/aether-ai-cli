// ═══════════════════════════════════════════════════════════
// AETHER AI CLI — Voice Input / Microphone Engine
// ═══════════════════════════════════════════════════════════

import { spawn } from "node:child_process";
import { platform } from "node:os";
import fs from "node:fs";

/**
 * Starts audio recording from the microphone and returns a handle to stop it.
 * @param {string} wavPath - Path where the .wav file will be saved
 * @returns {Promise<{ stop: () => Promise<void> }>}
 */
export async function startRecording(wavPath) {
  if (fs.existsSync(wavPath)) {
    try {
      fs.unlinkSync(wavPath);
    } catch (e) {
      // Ignore
    }
  }

  const isWin = platform() === "win32";

  if (isWin) {
    // Windows: Use native WinMM MCI API via a background PowerShell process
    const ps = spawn("powershell", ["-NoProfile", "-ExecutionPolicy", "Bypass", "-Command", "-"], {
      stdio: ["pipe", "pipe", "ignore"]
    });

    ps.stdin.write(`Add-Type -MemberDefinition '[DllImport("winmm.dll", CharSet = CharSet.Ansi)] public static extern int mciSendString(string cmd, System.Text.StringBuilder ret, int len, IntPtr cb);' -Name WinMM -Namespace Win32\r\n`);
    ps.stdin.write(`[Win32.WinMM]::mciSendString("open new Type waveaudio Alias myRecorder", $null, 0, [IntPtr]::Zero)\r\n`);
    ps.stdin.write(`[Win32.WinMM]::mciSendString("record myRecorder", $null, 0, [IntPtr]::Zero)\r\n`);

    return {
      stop: () => {
        return new Promise((resolve) => {
          ps.on("close", () => {
            resolve();
          });
          const escapedPath = wavPath.replace(/\\/g, "\\\\");
          ps.stdin.write(`[Win32.WinMM]::mciSendString('save myRecorder "${escapedPath}"', $null, 0, [IntPtr]::Zero)\r\n`);
          ps.stdin.write(`[Win32.WinMM]::mciSendString("close myRecorder", $null, 0, [IntPtr]::Zero)\r\n`);
          ps.stdin.write("exit\r\n");
          ps.stdin.end();
        });
      }
    };
  } else {
    // macOS / Linux: Try spawning standard command-line recording tools
    let cmd = "";
    let args = [];

    // Check if sox/rec is available (highest quality/reliability)
    if (await commandExists("rec")) {
      cmd = "rec";
      args = ["-q", wavPath];
    } else if (await commandExists("arecord")) {
      cmd = "arecord";
      args = ["-f", "cd", "-t", "wav", wavPath];
    } else if (await commandExists("ffmpeg")) {
      cmd = "ffmpeg";
      const isMac = platform() === "darwin";
      args = isMac
        ? ["-y", "-f", "avfoundation", "-i", ":0", wavPath]
        : ["-y", "-f", "alsa", "-i", "default", wavPath];
    } else {
      throw new Error("No recording utility found. On Windows, recording is native. On macOS/Linux, please install 'sox', 'arecord', or 'ffmpeg'.");
    }

    const proc = spawn(cmd, args, { stdio: "ignore" });

    return {
      stop: () => {
        return new Promise((resolve) => {
          proc.on("close", () => {
            resolve();
          });
          proc.kill("SIGTERM");
        });
      }
    };
  }
}

/**
 * Helper to check if a command exists in the environment PATH.
 */
function commandExists(name) {
  return new Promise((resolve) => {
    const isWin = platform() === "win32";
    const checkCmd = isWin ? "where" : "which";
    const check = spawn(checkCmd, [name], { stdio: "ignore" });
    check.on("close", (code) => {
      resolve(code === 0);
    });
  });
}

/**
 * Transcribes a local audio WAV file using the configured AI providers.
 * Priority: Google Gemini -> Groq Whisper -> OpenAI Whisper.
 * @param {string} wavPath - Path to the WAV file
 * @param {object} aiConfig - Active AI configuration
 * @returns {Promise<string>} Transcribed text
 */
export async function transcribeAudioFile(wavPath, aiConfig) {
  if (!fs.existsSync(wavPath)) {
    throw new Error(`Audio file not found: ${wavPath}`);
  }

  const fileBuffer = fs.readFileSync(wavPath);

  // 1. Google Gemini Transcription
  if (aiConfig.GOOGLE_API_KEY) {
    const base64Audio = fileBuffer.toString("base64");
    const model = "gemini-2.5-flash";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${aiConfig.GOOGLE_API_KEY}`;

    const body = {
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                mimeType: "audio/wav",
                data: base64Audio
              }
            },
            {
              text: "Transcribe this audio file exactly as spoken. Output ONLY the plain transcription text, with no extra formatting, conversational filler, timestamps, or commentary. If there is no speech, output an empty string."
            }
          ]
        }
      ]
    };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini transcription error: ${response.statusText}. ${errorText}`);
    }

    const data = await response.json();
    const candidate = data.candidates?.[0];
    if (!candidate) {
      return "";
    }

    const text = candidate.content?.parts
      ?.map((p) => p.text)
      .filter(Boolean)
      .join("") || "";

    // Clean up timestamps if returned (e.g. 00:00:23)
    const cleaned = text.trim();
    if (/^\d{2}:\d{2}:\d{2}$/.test(cleaned)) {
      return "";
    }
    return cleaned;
  }

  // 2. Groq Whisper / OpenAI Whisper
  let apiKey = aiConfig.GROQ_API_KEY;
  let url = "https://api.groq.com/openai/v1/audio/transcriptions";
  let modelName = "whisper-large-v3";

  if (!apiKey) {
    apiKey = aiConfig.OPENAI_API_KEY;
    url = "https://api.openai.com/v1/audio/transcriptions";
    modelName = "whisper-1";
  }

  if (!apiKey) {
    throw new Error("No API key configured for speech-to-text. Please configure GOOGLE_API_KEY, GROQ_API_KEY, or OPENAI_API_KEY.");
  }

  const boundary = "----WebKitFormBoundary" + Math.random().toString(36).substring(2);

  const header = 
    `--${boundary}\r\n` +
    `Content-Disposition: form-data; name="file"; filename="audio.wav"\r\n` +
    `Content-Type: audio/wav\r\n\r\n`;

  const modelPart = 
    `\r\n--${boundary}\r\n` +
    `Content-Disposition: form-data; name="model"\r\n\r\n${modelName}\r\n`;

  const footer = `--${boundary}--\r\n`;

  const body = Buffer.concat([
    Buffer.from(header, 'utf-8'),
    fileBuffer,
    Buffer.from(modelPart, 'utf-8'),
    Buffer.from(footer, 'utf-8')
  ]);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": `multipart/form-data; boundary=${boundary}`
    },
    body: body
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Whisper transcription error: ${response.statusText}. ${errorText}`);
  }

  const data = await response.json();
  return (data.text || "").trim();
}
