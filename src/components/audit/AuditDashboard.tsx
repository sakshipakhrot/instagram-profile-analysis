import { type AuditReport } from "@/lib/mock-audit";
import {
  AtSign, Sparkles, TrendingUp, Gauge, CalendarDays, MessageCircleHeart,
  Activity, Clock, Layers, Tag, Mic2, Hash, Film, Image as ImageIcon, Images,
  AlertTriangle, CheckCircle2, ArrowUpRight, Trophy,
} from "lucide-react";

type Props = { data: AuditReport };

function Section({ title, kicker, children }: { title: string; kicker?: string; children: React.ReactNode }) {
  return (
    <section className="space-y-5">
      <div className="flex items-end justify-between gap-4">
        <div>
          {kicker && (
            <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-medium">
              {kicker}
            </div>
          )}
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mt-1">{title}</h2>
        </div>
      </div>
      {children}
    </section>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-border bg-card/80 backdrop-blur-sm shadow-[0_1px_0_0_rgba(255,255,255,0.6)_inset,0_8px_24px_-12px_rgba(15,23,42,0.12)] ${className}`}>
      {children}
    </div>
  );
}

function consistencyTone(rating: string) {
  const r = rating.toLowerCase();
  if (r.includes("low")) return { bg: "bg-rose-soft", fg: "text-rose", dot: "bg-rose" };
  if (r.includes("med")) return { bg: "bg-amber-soft", fg: "text-amber", dot: "bg-amber" };
  return { bg: "bg-emerald-soft", fg: "text-emerald", dot: "bg-emerald" };
}

function postIcon(type: string) {
  const t = type.toLowerCase();
  if (t.includes("reel") || t.includes("video")) return Film;
  if (t.includes("carousel") || t.includes("sidecar")) return Images;
  return ImageIcon;
}

function MetricCard({
  icon: Icon, label, value, sub, accent = "indigo",
}: {
  icon: any; label: string; value: string; sub?: React.ReactNode;
  accent?: "indigo" | "emerald" | "amber" | "rose";
}) {
  const accentMap = {
    indigo: "bg-indigo-soft text-indigo",
    emerald: "bg-emerald-soft text-emerald",
    amber: "bg-amber-soft text-amber",
    rose: "bg-rose-soft text-rose",
  };
  return (
    <Card className="p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
        <span className={`h-9 w-9 rounded-xl grid place-items-center ${accentMap[accent]}`}>
          <Icon size={18} strokeWidth={2.2} />
        </span>
      </div>
      <div>
        <div className="text-xl md:text-2xl font-semibold text-foreground leading-tight">{value}</div>
        {sub && <div className="text-xs text-muted-foreground mt-1">{sub}</div>}
      </div>
    </Card>
  );
}

export default function AuditDashboard({ data }: Props) {
  const r = data.analysis_report;
  const initials = data.username.slice(0, 2).toUpperCase();
  const created = new Date(data.created_at).toLocaleString(undefined, {
    dateStyle: "medium", timeStyle: "short",
  });
  const cTone = consistencyTone(r.consistency_rating);

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-8 md:py-12 space-y-14">
      {/* HERO */}
      <header className="space-y-6">
        <Card className="p-6 md:p-8 overflow-hidden relative">
          <div className="absolute inset-0 -z-0 opacity-60"
               style={{ background: "radial-gradient(600px 200px at 90% 0%, color-mix(in oklab, var(--indigo) 14%, transparent), transparent 70%)" }} />
          <div className="relative z-10 flex flex-col md:flex-row md:items-start gap-6">
            <div className="flex items-center gap-5">
              <div className="h-20 w-20 md:h-24 md:w-24 rounded-2xl grid place-items-center text-2xl font-semibold text-primary-foreground"
                   style={{ background: "linear-gradient(135deg, var(--indigo), color-mix(in oklab, var(--emerald) 70%, var(--indigo)))" }}>
                {initials}
              </div>
              <div className="md:hidden">
                <div className="flex items-center gap-1 text-muted-foreground text-sm">
                  <AtSign size={14} />
                  <span className="font-medium">{data.username}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">{r.niche}</div>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div className="hidden md:block">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <AtSign size={16} />
                  <span className="text-sm font-medium tracking-wide">{data.username}</span>
                  <span className="mx-2 text-border">•</span>
                  <span className="text-sm">{r.niche}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-semibold text-foreground mt-2">
                  Profile Audit & Strategy
                </h1>
              </div>
              <h1 className="md:hidden text-2xl font-semibold text-foreground">Profile Audit & Strategy</h1>

              <div className="inline-flex items-center gap-2 rounded-full bg-slate-deep text-primary-foreground px-3.5 py-1.5 text-xs font-medium">
                <Trophy size={14} className="text-amber" />
                <span className="uppercase tracking-wider opacity-80">Market position</span>
                <span className="opacity-40">/</span>
                <span>{r.competitor_market_position}</span>
              </div>

              <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Sparkles size={12} />
                <span>Report generated {created}</span>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-5">
          <Card className="p-6">
            <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-medium mb-2">
              Profile overview
            </div>
            <p className="text-[15px] leading-relaxed text-foreground/90">{r.profile_overview}</p>
          </Card>
          <Card className="p-6">
            <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-medium mb-2">
              Brand positioning
            </div>
            <p className="text-[15px] leading-relaxed text-foreground/90">{r.brand_positioning}</p>
          </Card>
        </div>
      </header>

      {/* METRICS */}
      <Section kicker="01 — Executive metrics" title="Performance at a glance">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <MetricCard icon={TrendingUp} label="Engagement rate" value={r.average_engagement_rate} accent="emerald" />
          <MetricCard icon={CalendarDays} label="Posts / week" value={r.frequency_per_week} sub="rolling 30 days" accent="indigo" />
          <MetricCard
            icon={Gauge}
            label="Consistency"
            value={r.consistency_rating}
            sub={
              <span className={`inline-flex items-center gap-1.5 ${cTone.fg}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${cTone.dot}`} />
                cadence signal
              </span>
            }
            accent={r.consistency_rating.toLowerCase().includes("low") ? "rose" : r.consistency_rating.toLowerCase().includes("med") ? "amber" : "emerald"}
          />
          <MetricCard icon={MessageCircleHeart} label="Sentiment" value={r.comment_sentiment} accent="emerald" />
          <MetricCard icon={Activity} label="Growth trajectory" value={r.growth_trajectory} accent="indigo" />
        </div>
      </Section>

      {/* TIMING */}
      <Section kicker="02 — Timing" title="When the audience is listening">
        <div className="grid md:grid-cols-2 gap-5">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <CalendarDays size={16} className="text-indigo" />
              <h3 className="font-semibold text-foreground">Best performing days</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {r.best_performing_days.map((d) => (
                <span key={d}
                      className="inline-flex items-center gap-2 rounded-xl border border-border bg-indigo-soft px-3.5 py-2 text-sm font-medium text-slate-deep">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo" />
                  {d}
                </span>
              ))}
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock size={16} className="text-emerald" />
              <h3 className="font-semibold text-foreground">Optimal hours</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {r.best_performing_times.map((t) => (
                <span key={t}
                      className="inline-flex items-center gap-1.5 rounded-full bg-slate-deep text-primary-foreground px-3.5 py-1.5 text-sm font-medium">
                  <Clock size={12} className="opacity-70" />
                  {t}
                </span>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      {/* CONTENT DNA */}
      <Section kicker="03 — Content DNA" title="What the feed is made of">
        <div className="grid md:grid-cols-2 gap-5">
          <Card className="p-6 md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <Layers size={16} className="text-indigo" />
              <h3 className="font-semibold text-foreground">Format breakdown</h3>
            </div>
            <p className="text-[15px] leading-relaxed text-foreground/90">{r.format_breakdown}</p>
          </Card>

          <Card className="p-6 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Tag size={16} className="text-emerald" />
              <h3 className="font-semibold text-foreground">Core content themes</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {r.content_themes.map((t) => (
                <span key={t}
                      className="inline-flex items-center rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground/90 hover:bg-accent transition-colors">
                  {t}
                </span>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <Mic2 size={16} className="text-indigo" />
              <h3 className="font-semibold text-foreground">Caption tone</h3>
            </div>
            <p className="text-[15px] leading-relaxed text-foreground/90">{r.caption_tone}</p>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <Hash size={16} className="text-emerald" />
              <h3 className="font-semibold text-foreground">Hashtag strategy</h3>
            </div>
            <p className="text-[15px] leading-relaxed text-foreground/90">{r.hashtag_strategy}</p>
          </Card>
        </div>
      </Section>

      {/* TOP POSTS */}
      <Section kicker="04 — Top performers" title="What worked, and why">
        <div className="grid gap-4">
          {r.top_5_posts.map((p, i) => {
            const Icon = postIcon(p.post_type);
            return (
              <Card key={i} className="p-5 md:p-6">
                <div className="flex items-start gap-4 md:gap-6">
                  <div className="flex flex-col items-center gap-2 shrink-0">
                    <div className="h-12 w-12 rounded-xl bg-slate-deep text-primary-foreground grid place-items-center">
                      <Icon size={20} />
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground">#{i + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="inline-flex items-center rounded-full bg-indigo-soft text-indigo px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider">
                        {p.post_type}
                      </span>
                    </div>
                    <p className="text-[15px] leading-relaxed text-foreground/90">{p.reasoning}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* ROADMAP */}
      <Section kicker="05 — Strategic roadmap" title="Gaps vs. growth vectors">
        <div className="grid lg:grid-cols-2 gap-5">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-5">
              <span className="h-9 w-9 rounded-xl bg-rose-soft text-rose grid place-items-center">
                <AlertTriangle size={18} />
              </span>
              <div>
                <h3 className="font-semibold text-foreground">Content gaps</h3>
                <p className="text-xs text-muted-foreground">Where the strategy is currently leaking</p>
              </div>
            </div>
            <ul className="space-y-3">
              {r.content_gaps.map((g, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-rose shrink-0" />
                  <span className="text-[15px] leading-relaxed text-foreground/90">{g}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-5">
              <span className="h-9 w-9 rounded-xl bg-emerald-soft text-emerald grid place-items-center">
                <ArrowUpRight size={18} />
              </span>
              <div>
                <h3 className="font-semibold text-foreground">Actionable next steps</h3>
                <p className="text-xs text-muted-foreground">Ship these to compound growth</p>
              </div>
            </div>
            <ul className="space-y-3">
              {r.actionable_recommendations.map((a, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <CheckCircle2 size={18} className="text-emerald shrink-0 mt-0.5" />
                  <span className="text-[15px] leading-relaxed text-foreground/90">{a}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      <footer className="pt-6 pb-2 text-center text-xs text-muted-foreground">
        Dashboard rendered from n8n workflow payload · {data.id}
      </footer>
    </div>
  );
}
