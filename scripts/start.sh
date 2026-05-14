#!/bin/bash
set -e

cd "$(dirname "$0")/.."

# Check if server is already running
if ! curl -s -o /dev/null -w "%{http_code}" http://localhost:5420 | grep -q "200"; then
    echo "Starting tldraw server..."
    nohup npm run dev:managed > /tmp/tldraw-server.log 2>&1 &

    # Wait for server to be ready (max 15s)
    for i in {1..30}; do
        if curl -s -o /dev/null -w "%{http_code}" http://localhost:5420 | grep -q "200"; then
            break
        fi
        sleep 0.5
    done
fi

xdg-open http://localhost:5420
