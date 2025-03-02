#!/bin/bash

echo "🚀 Starting Expo Dev Environment..."

# Clear cache for a fresh start
echo "🧹 Clearing Expo cache..."
expo start -c

# Optional: If you want to watch for file changes, add:
# fswatch -o ./ | xargs -n1 -I{} expo start

echo "✅ Expo Dev Server is running!"
