#!/bin/bash

echo "🏦 Starting UBank React Native App..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Check if Expo CLI is installed
if ! command -v expo &> /dev/null; then
    echo "📦 Installing Expo CLI..."
    npm install -g @expo/cli
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Start the development server
echo "🚀 Starting Expo development server..."
echo ""
echo "Choose an option:"
echo "1. Start development server (you can choose platform later)"
echo "2. Start iOS simulator directly"
echo "3. Start Android emulator directly"
echo ""

read -p "Enter your choice (1-3): " choice

case $choice in
    1)
        expo start
        ;;
    2)
        expo start --ios
        ;;
    3)
        expo start --android
        ;;
    *)
        echo "Invalid choice. Starting development server..."
        expo start
        ;;
esac
