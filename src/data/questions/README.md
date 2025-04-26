# SynapseSprint Question Data

This directory contains JSON files with quiz questions organized by English proficiency level (A1-C2).

## Data Structure

Each JSON file follows this structure:

```json
[
  {
    "id": 1,
    "level": "B1",
    "topic": "Grammar",
    "question": "Which sentence is grammatically correct?",
    "options": [
      "Option A",
      "Option B",
      "Option C",
      "Option D"
    ],
    "correctAnswer": "Option B"
  }
]
```

## Available Files

- `A1.json` - Beginner level questions
- `A2.json` - Elementary level questions
- `B1.json` - Intermediate level questions
- `B2.json` - Upper Intermediate level questions
- `C1.json` - Advanced level questions
- `C2.json` - Proficiency level questions

## Adding Questions

When adding new questions, ensure:
1. The `id` is unique within the file
2. The `level` matches the filename
3. The `topic` is one of: "Grammar", "Vocabulary", or "Mixed"
4. The `correctAnswer` exactly matches one of the options 