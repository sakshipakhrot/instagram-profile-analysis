# Instagram Profile Analysis Dashboard

🚀 **[View the Live Application Here](https://instagram-profile-analysis.lovable.app/)**

A dynamic, fully responsive React dashboard designed to ingest and visualize Instagram profile analytics...
A dynamic, fully responsive React dashboard designed to ingest and visualize Instagram profile analytics, content gaps, and strategic recommendations in real-time. 

## 🏗️ Architecture & Tech Stack

* **Frontend:** React, Tailwind CSS, Lucide React Icons
* **UI Generation Engine:** Lovable
* **Backend/Data Pipeline:** n8n Workflow Automation
* **Database & Caching:** Supabase (PostgreSQL)
* **Version Control:** Git & GitHub

## ⚙️ How It Works

This project avoids hardcoded mock data entirely. It operates on a live-fetch architecture:

This project avoids hardcoded mock data entirely and implements a smart 24-hour caching layer to optimize API calls:

1. **User Input:** The dashboard starts with a clean input state where a user enters an Instagram username.
2. **Cache Check (Supabase):** Before running a new analysis, the system queries Supabase to check if this specific username has been analyzed within the last 24 hours. 
   * If **Yes**, it instantly serves the cached data to the UI.
   * If **No**, it proceeds to step 3.
3. **Live API Request:** The UI triggers an HTTP POST request to a live n8n webhook (`https://spworkflow.app.n8n.cloud/webhook/analyze-ig-profile`) with the payload `{ "username": "target_handle" }`.
4. **Data Ingestion & Storage:** The n8n workflow processes the profile, saves the fresh structured JSON array to Supabase (for future caching), and returns it to the frontend.
5. **Dynamic Rendering:** The React frontend maps the JSON into a beautiful, card-based layout featuring:
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
