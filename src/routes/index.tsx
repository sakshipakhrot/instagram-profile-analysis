import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Instagram, Search, Loader2, AlertTriangle, RotateCcw, Sparkles } from "lucide-react";
import AuditDashboard from "@/components/audit/AuditDashboard";
import { type AuditReport } from "@/lib/mock-audit";

const WEBHOOK_URL = "https://spworkflow.app.n8n.cloud/webhook/analyze-ig-profile";

const usernameSchema = z
  .string()
  .trim()
  .min(1, "Username is required")
  .max(30, "Username must be 30 characters or fewer")
  .regex(/^[A-Za-z0-9._]+$/, "Only letters, numbers, periods and underscores");

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Instagram Profile Audit & Strategy" },
      { name: "description", content: "Run a live audit of any Instagram profile — engagement, timing, content DNA, and a strategic roadmap." },
    ],
  }),
  component: Index,
});

type Status = "idle" | "loading" | "success" | "error";

function Index() {
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<AuditReport | null>(null);

  async function runAudit(e?: React.FormEvent) {
    e?.preventDefault();
    const clean = username.trim().replace(/^@/, "");
    const parsed = usernameSchema.safeParse(clean);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid username");
      setStatus("error");
      return;
    }
    setError(null);
    setStatus("loading");
    setData(null);
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: parsed.data }),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      const json = await res.json();
      const report: AuditReport | undefined = Array.isArray(json) ? json[0] : json?.[0] ?? json;
      if (!report || !report.analysis_report) {
        throw new Error("The workflow returned an unexpected payload.");
      }
      setData(report);
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong while analyzing the profile.");
      setStatus("error");
    }
  }

  function reset() {
    setStatus("idle");
    setError(null);
    setData(null);
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 md:px-8 pt-10 md:pt-16">
        <InputHero
          username={username}
          setUsername={setUsername}
          onSubmit={runAudit}
          disabled={status === "loading"}
          compact={status === "success"}
        />
      </div>

      {status === "idle" && <IdleState />}
      {status === "loading" && <LoadingState username={username} />}
      {status === "error" && <ErrorState message={error ?? "Unknown error"} onRetry={runAudit} onReset={reset} />}
      {status === "success" && data && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          <AuditDashboard data={data} />
        </div>
      )}
    </div>
  );
}

function InputHero({
  username, setUsername, onSubmit, disabled, compact,
}: {
  username: string;
  setUsername: (v: string) => void;
  onSubmit: (e?: React.FormEvent) => void;
  disabled: boolean;
  compact: boolean;
}) {
  return (
    <header className={`transition-all ${compact ? "pb-2" : "pb-8 md:pb-12"}`}>
      {!compact && (
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 backdrop-blur px-3 py-1 text-xs text-muted-foreground mb-5">
            <Sparkles size={12} className="text-indigo" />
            AI-powered Instagram profile audit
          </div>
          <h1 className="text-3xl md:text-5xl font-semibold text-foreground tracking-tight">
            Audit any Instagram profile in seconds
          </h1>
          <p className="text-muted-foreground mt-3 text-[15px] md:text-base">
            Engagement, timing, content DNA, and a strategic roadmap — generated from a live analysis.
          </p>
        </div>
      )}

      <form
        onSubmit={onSubmit}
        className="mx-auto max-w-2xl rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-2 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.18)] flex items-center gap-2"
      >
        <div className="flex items-center gap-2 pl-3 text-muted-foreground">
          <Instagram size={18} className="text-indigo" />
          <span className="text-sm font-medium">@</span>
        </div>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter Instagram username..."
          maxLength={30}
          autoComplete="off"
          spellCheck={false}
          disabled={disabled}
          className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground/70 text-[15px] py-2.5"
        />
        <button
          type="submit"
          disabled={disabled || !username.trim()}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-deep text-primary-foreground px-4 md:px-5 py-2.5 text-sm font-medium hover:opacity-95 active:scale-[0.98] transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {disabled ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
          <span className="hidden sm:inline">{disabled ? "Analyzing…" : "Analyze Profile"}</span>
        </button>
      </form>
    </header>
  );
}

function IdleState() {
  const items = [
    { title: "Performance metrics", body: "Engagement, cadence, growth, and sentiment at a glance." },
    { title: "Timing optimization", body: "The exact days and hours your audience is listening." },
    { title: "Strategic roadmap", body: "Content gaps balanced against actionable next steps." },
  ];
  return (
    <section className="mx-auto max-w-5xl px-4 md:px-8 pb-20">
      <div className="grid md:grid-cols-3 gap-4">
        {items.map((it) => (
          <div key={it.title} className="rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-5">
            <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-medium">
              What you'll get
            </div>
            <div className="text-foreground font-semibold mt-2">{it.title}</div>
            <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{it.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function LoadingState({ username }: { username: string }) {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8 pb-20">
      <div className="rounded-2xl border border-border bg-card/70 backdrop-blur-sm p-5 mb-5 flex items-center gap-3">
        <Loader2 size={18} className="animate-spin text-indigo" />
        <div className="text-sm text-foreground">
          Analyzing <span className="font-semibold">@{username.replace(/^@/, "")}</span> — this can take up to a minute while the workflow inspects the profile.
        </div>
      </div>

      <div className="space-y-5">
        <Skeleton className="h-40" />
        <div className="grid md:grid-cols-2 gap-5">
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-28" />)}
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          <Skeleton className="h-36" />
          <Skeleton className="h-36" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-20" />)}
        </div>
      </div>
    </section>
  );
}

function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-border bg-card/60 overflow-hidden relative ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-foreground/[0.06] to-transparent" />
    </div>
  );
}

function ErrorState({ message, onRetry, onReset }: { message: string; onRetry: () => void; onReset: () => void }) {
  return (
    <section className="mx-auto max-w-2xl px-4 md:px-8 pb-20">
      <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6 md:p-8 text-center">
        <div className="mx-auto h-12 w-12 rounded-2xl bg-rose-soft text-rose grid place-items-center mb-4">
          <AlertTriangle size={22} />
        </div>
        <h2 className="text-xl font-semibold text-foreground">We couldn't analyze that profile</h2>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{message}</p>
        <div className="mt-5 flex items-center justify-center gap-2">
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-deep text-primary-foreground px-4 py-2.5 text-sm font-medium hover:opacity-95 transition"
          >
            <RotateCcw size={15} /> Try again
          </button>
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground hover:bg-accent transition"
          >
            Start over
          </button>
        </div>
      </div>
    </section>
  );
}
