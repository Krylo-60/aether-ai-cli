import sys
import os
import subprocess
import shutil

def main():
    # Find the Node.js entry point absolute path inside aether_pip/node_project
    script_dir = os.path.dirname(os.path.abspath(__file__))
    node_project_dir = os.path.join(script_dir, "node_project")
    aether_js = os.path.join(node_project_dir, "bin", "aether.js")
    
    # If not found globally, check dev layout relative to current working directory
    if not os.path.exists(aether_js):
        aether_js = os.path.join(os.getcwd(), "bin", "aether.js")
        node_project_dir = os.getcwd()

    if not shutil.which("node"):
        print("Error: Node.js is required to run Aether AI CLI.", file=sys.stderr)
        print("Please install Node.js (https://nodejs.org) and try again.", file=sys.stderr)
        sys.exit(1)

    # Check if node_modules exists in the node_project directory.
    # If not, automatically run npm install inside that directory!
    node_modules_dir = os.path.join(node_project_dir, "node_modules")
    if not os.path.exists(node_modules_dir):
        print("First-time launch check: Installing node dependencies via npm...")
        npm_cmd = shutil.which("npm")
        if not npm_cmd:
            print("Error: npm is required to install Node dependencies.", file=sys.stderr)
            print("Please install Node.js/npm and try again.", file=sys.stderr)
            sys.exit(1)
        
        # On Windows, run npm using shell=True to handle cmd/bat resolution
        subprocess.run([npm_cmd, "install", "--no-audit", "--no-fund"], cwd=node_project_dir, shell=(os.name == "nt"))

    try:
        # Run node aether.js passing all command line arguments
        os.environ["AETHER_PACKAGER"] = "pip"
        cmd = ["node", aether_js] + sys.argv[1:]
        result = subprocess.run(cmd, check=False)
        sys.exit(result.returncode)
    except KeyboardInterrupt:
        print("\nSession terminated by user.")
        sys.exit(0)
    except Exception as e:
        print(f"Error running Aether: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
