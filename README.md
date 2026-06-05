# Instagram Profile Analysis Dashboard

A dynamic, fully responsive React dashboard designed to ingest and visualize Instagram profile analytics, content gaps, and strategic recommendations in real-time. 

## 🏗️ Architecture & Tech Stack

* **Frontend:** React, Tailwind CSS, Lucide React Icons
* **UI Generation Engine:** Lovable
* **Backend/Data Pipeline:** n8n Workflow Automation
* **Version Control:** Git & GitHub

## ⚙️ How It Works

This project avoids hardcoded mock data entirely. It operates on a live-fetch architecture:

1. **User Input:** The dashboard starts with a clean input state where a user enters an Instagram username.
2. **API Request:** On submission, the UI triggers an HTTP POST request to a live n8n webhook (`https://spworkflow.app.n8n.cloud/webhook/analyze-ig-profile`) with the payload `{ "username": "target_handle" }`.
3. **Data Ingestion:** The n8n workflow processes the profile and returns a highly structured JSON array containing metrics like engagement rates, best posting times, content themes, top 5 posts, and actionable growth recommendations.
4. **Dynamic Rendering:** The React frontend maps this JSON into a beautiful, card-based layout featuring:
   * Executive performance metrics grid
   * Timing & optimization calendar/time pills
   * Content DNA breakdown (format, themes, tone)
   * Top-performing post carousel
   * Strategic roadmap (Gaps vs. Recommendations)

## 🚀 Project Origins (How it was built)

This project was built using a hybrid AI-engineering approach:

1. **Schema Definition:** We extracted a raw JSON payload output from the n8n pipeline.
2. **Prompt Engineering:** We wrote a strict, zero-hallucination prompt for the Lovable UI engine. The prompt explicitly mapped specific JSON keys to distinct UI components (Hero Header, Metrics Grid, Strategy Pane) and mandated the inclusion of a live API fetch state (Loading, Error, Success).
3. **Local Environment Setup:** Downloaded the generated React/Tailwind codebase to the local machine.
4. **Version Control:** Installed Git, initialized the repository, and established the GitHub pipeline via VS Code terminal to repository: `sakshipakhrot/instagram-profile-analysis`.

## 💻 Local Development Setup

To run this project locally:

1. Clone the repository:
```bash
   git clone https://github.com/sakshipakhrot/instagram-profile-analysis
