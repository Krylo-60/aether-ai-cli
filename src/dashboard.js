// ═══════════════════════════════════════════════════════════
// Krims Code AI CLI — Cyberpunk Web Telemetry Dashboard Server
// Lightweight server using node:http to host dashboard diagnostics
// ═══════════════════════════════════════════════════════════

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getTelemetryData } from "./ai/telemetry.js";
import { getAIConfig } from "./config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let server = null;
let currentPort = 4567;

/**
 * Starts the telemetry HTTP server.
 * If the preferred port is occupied, automatically increments and tries the next port.
 * @param {number} preferredPort
 * @returns {Promise<{ port: number, server: http.Server }>}
 */
export async function startDashboardServer(preferredPort = 4567) {
  return new Promise((resolve, reject) => {
    let port = preferredPort;

    function attemptListen() {
      server = http.createServer(async (req, res) => {
        const url = new URL(req.url, `http://${req.headers.host}`);

        // CORS headers
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");

        if (req.method === "OPTIONS") {
          res.writeHead(200);
          res.end();
          return;
        }

        // Serve HTML dashboard
        if (url.pathname === "/" || url.pathname === "/index.html") {
          try {
            const htmlPath = path.join(__dirname, "ui", "dashboard.html");
            const html = fs.readFileSync(htmlPath, "utf8");
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(html);
          } catch (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Error loading telemetry dashboard UI: " + err.message);
          }
          return;
        }

        // API Endpoint: /api/telemetry
        if (url.pathname === "/api/telemetry") {
          try {
            const config = await getAIConfig();
            const data = getTelemetryData(config);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(data));
          } catch (err) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: err.message }));
          }
          return;
        }

        // Default 404
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
      });

      server.on("error", (err) => {
        if (err.code === "EADDRINUSE") {
          port++;
          attemptListen();
        } else {
          reject(err);
        }
      });

      server.listen(port, () => {
        currentPort = port;
        resolve({ port, server });
      });
    }

    attemptListen();
  });
}

/**
 * Stops the dashboard server if active.
 */
export function stopDashboardServer() {
  if (server) {
    server.close();
    server = null;
  }
}

/**
 * Gets the active port.
 * @returns {number}
 */
export function getDashboardPort() {
  return currentPort;
}
