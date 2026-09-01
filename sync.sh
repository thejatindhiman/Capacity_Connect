#!/bin/bash
# ============================================================
# sync.sh — Auto-Sync: VS Code + Antigravity → GitHub
# Watches for file changes and auto-commits + pushes to GitHub
# Usage: bash sync.sh
# ============================================================

REPO="/Users/madhukarsingh/SIH2/Capacity_Connect"
BRANCH="main"
POLL_INTERVAL=30  # seconds between checks

echo "🔄 Auto-Sync started for Capacity_Connect"
echo "   Watching: $REPO"
echo "   Branch:   $BRANCH"
echo "   Interval: every ${POLL_INTERVAL}s"
echo "   Press Ctrl+C to stop."
echo "────────────────────────────────────────"

cd "$REPO" || { echo "❌ Repo not found at $REPO"; exit 1; }

while true; do
    # Pull latest from GitHub first
    git fetch origin "$BRANCH" --quiet 2>/dev/null

    BEHIND=$(git rev-list HEAD..origin/$BRANCH --count 2>/dev/null)
    if [ "$BEHIND" -gt "0" ]; then
        echo "⬇️  $(date '+%H:%M:%S') — Pulling $BEHIND new commit(s) from GitHub..."
        git pull origin "$BRANCH" --quiet
    fi

    # Check for local changes to push
    CHANGED=$(git status --porcelain)
    if [ -n "$CHANGED" ]; then
        TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
        FILES=$(git status --short | awk '{print $2}' | tr '\n' ', ' | sed 's/,$//')
        echo "📝 $(date '+%H:%M:%S') — Changes detected: $FILES"

        git add -A
        git commit -m "auto-sync: $TIMESTAMP [$FILES]" --quiet

        if git push origin "$BRANCH" --quiet 2>/dev/null; then
            echo "✅ $(date '+%H:%M:%S') — Pushed to GitHub successfully"
        else
            echo "⚠️  $(date '+%H:%M:%S') — Push failed (check GitHub credentials)"
        fi
    fi

    sleep "$POLL_INTERVAL"
done
