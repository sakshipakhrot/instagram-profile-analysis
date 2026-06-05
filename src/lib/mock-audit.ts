export type AuditReport = {
  id: string;
  username: string;
  analysis_report: {
    niche: string;
    profile_overview: string;
    brand_positioning: string;
    competitor_market_position: string;
    average_engagement_rate: string;
    consistency_rating: string;
    frequency_per_week: string;
    comment_sentiment: string;
    growth_trajectory: string;
    best_performing_days: string[];
    best_performing_times: string[];
    format_breakdown: string;
    caption_tone: string;
    hashtag_strategy: string;
    content_themes: string[];
    top_5_posts: { post_type: string; reasoning: string }[];
    content_gaps: string[];
    actionable_recommendations: string[];
  };
  created_at: string;
};

export const mockAudit: AuditReport[] = [
  {
    id: "17f24896-d83a-46a5-acce-fe18b80c1a86",
    username: "northbound.studio",
    analysis_report: {
      niche: "Independent Design Studio",
      profile_overview:
        "A boutique design studio profile showcasing brand identity work, type-led case studies, and behind-the-scenes process clips. The bio is concise and links to a portfolio site, but the overall narrative leans toward visual portfolio rather than community building.",
      brand_positioning:
        "Positions itself as a craft-first studio for founders who care about typography and editorial detail. Visual language is muted, monochromatic and editorial — distinct from the louder, gradient-heavy studio category.",
      competitor_market_position: "Top 15% — Premium Craft Tier",
      average_engagement_rate: "4.7% (above industry avg 1.9%)",
      consistency_rating: "Medium",
      frequency_per_week: "3.2",
      comment_sentiment: "Overwhelmingly Positive",
      growth_trajectory: "+18.4% follower growth over last 90 days",
      best_performing_days: ["Tuesday", "Wednesday", "Saturday"],
      best_performing_times: ["8:00 AM", "12:30 PM", "7:00 PM", "9:30 PM"],
      format_breakdown: "52% Carousels · 28% Reels · 14% Single Image · 6% Stories highlights",
      caption_tone:
        "Editorial, considered and slightly literary. Strong opening hooks, frequent use of em-dashes, low emoji density.",
      hashtag_strategy:
        "Niche-first stack of 6–9 tags mixing #brandidentity, #typematters, regional studio tags and 2 broader discovery tags.",
      content_themes: [
        "Brand identity case studies",
        "Typography deep-dives",
        "Studio process & tooling",
        "Client storytelling",
        "Editorial moodboards",
      ],
      top_5_posts: [
        { post_type: "Carousel", reasoning: "10-slide case study with a strong hook slide and a clear before/after sequence drove saves 3.4× the account average." },
        { post_type: "Reel", reasoning: "15s timelapse of a logo refinement loop. High completion rate and shareability among other designers." },
        { post_type: "Carousel", reasoning: "Typography breakdown of a wordmark — educational, screenshot-friendly, strong save-to-like ratio." },
        { post_type: "Image", reasoning: "Single hero shot of finished print collateral with a personal caption. Drove the highest comment depth of the month." },
        { post_type: "Reel", reasoning: "Behind-the-scenes studio tour with ambient audio. Reached a new non-follower audience (62% of plays)." },
      ],
      content_gaps: [
        "No founder-facing educational content explaining when to rebrand",
        "Limited use of Reels for narrative storytelling beyond timelapses",
        "Missing client testimonial format that could build trust at the consideration stage",
        "No recurring series — every post reads as a one-off",
      ],
      actionable_recommendations: [
        "Launch a weekly 'Type Tuesday' carousel series to anchor the content calendar",
        "Repurpose top carousels into 30–45s narrated Reels to lift non-follower reach",
        "Add a monthly client-voice testimonial Reel with on-screen captions",
        "Tighten posting cadence to 4×/week, prioritising Tue / Wed / Sat slots",
        "Introduce a clear CTA in the last slide of every carousel (DM, save, or link in bio)",
      ],
    },
    created_at: new Date().toISOString(),
  },
];
