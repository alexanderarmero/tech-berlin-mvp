# AI Learning Companion

An AI-powered learning companion that builds personalized relationships with students through regular voice interactions, creating a feedback loop that continuously improves learning outcomes.

## Features

- Voice-to-text conversion of student reflections
- Natural conversation flow with emotion detection
- Student profile builder (learning style, pace, strengths/weaknesses)
- Content analyzer (identifies knowledge gaps)
- Progress tracker (monitors improvements and setbacks)
- Adaptive learning path generator
- Engagement optimizer
- Motivation pattern analyzer

## Tech Stack

- React with TypeScript
- Material-UI for the user interface
- React Speech Recognition for voice input
- Date-fns for date formatting

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```

## Project Structure

```
src/
  ├── components/
  │   ├── MessageList.tsx
  │   └── VoiceRecorder.tsx
  ├── App.tsx
  ├── index.tsx
  └── index.css
public/
  ├── index.html
  └── manifest.json
```

## Backend Integration

The frontend is designed to work with a backend service that can:
- Store and retrieve student messages
- Process and analyze voice input
- Generate personalized learning recommendations
- Track student progress over time

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 