#!/bin/bash
set -euo pipefail

# Only run in remote (web) Claude Code sessions
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

# Start a static file server for live preview on port 4200
cd "$CLAUDE_PROJECT_DIR"

# Kill any existing server on port 4200
fuser -k 4200/tcp 2>/dev/null || true

# Start Python HTTP server in background
nohup python3 -m http.server 4200 > /tmp/preview-server.log 2>&1 &

echo "Preview server started on http://localhost:4200"
