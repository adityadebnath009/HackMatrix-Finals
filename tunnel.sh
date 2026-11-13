#!/usr/bin/env bash
# HackMatrix ngrok Tunnel Utility
# Fast, zero-friction tunnel runner for hackathon demos.

DEFAULT_NGROK_CONFIG="$HOME/Library/Application Support/ngrok/ngrok.yml"
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TUNNEL_CONFIG="$PROJECT_DIR/tunnel.yml"

print_header() {
  echo "================================================="
  echo "  🚀 HackMatrix ngrok Tunnel Launcher"
  echo "================================================="
}

usage() {
  print_header
  echo "Usage: ./tunnel.sh [frontend | backend | all | <port>]"
  echo ""
  echo "Commands:"
  echo "  frontend   Expose Next.js frontend (port 3000)"
  echo "  backend    Expose FastAPI backend (port 8000)"
  echo "  all        Launch both tunnels simultaneously (paid/pro tier)"
  echo "  <port>     Expose any custom port (e.g. ./tunnel.sh 5173)"
  echo ""
  echo "Examples:"
  echo "  ./tunnel.sh frontend"
  echo "  ./tunnel.sh backend"
  exit 1
}

TARGET="${1:-menu}"

case "$TARGET" in
  frontend|3000)
    print_header
    echo "📡 Exposing FRONTEND on port 3000..."
    echo "🔗 Next.js Host Header rewrite enabled"
    ngrok http 3000 --host-header="localhost:3000"
    ;;
  backend|8000)
    print_header
    echo "📡 Exposing BACKEND on port 8000..."
    ngrok http 8000
    ;;
  all)
    print_header
    echo "📡 Starting all tunnels (Frontend 3000 + Backend 8000)..."
    ngrok start --config "$DEFAULT_NGROK_CONFIG" --config "$TUNNEL_CONFIG" --all
    ;;
  menu)
    print_header
    echo "Select an option:"
    echo "  1) Expose Frontend (Next.js - Port 3000)"
    echo "  2) Expose Backend (FastAPI - Port 8000)"
    echo "  3) Expose Both simultaneously (Port 3000 + 8000)"
    echo "  4) Exit"
    read -rp "Enter choice [1-4]: " CHOICE
    case "$CHOICE" in
      1) ./tunnel.sh frontend ;;
      2) ./tunnel.sh backend ;;
      3) ./tunnel.sh all ;;
      *) echo "Exiting."; exit 0 ;;
    esac
    ;;
  *)
    if [[ "$TARGET" =~ ^[0-9]+$ ]]; then
      print_header
      echo "📡 Exposing custom port $TARGET..."
      ngrok http "$TARGET"
    else
      usage
    fi
    ;;
esac
