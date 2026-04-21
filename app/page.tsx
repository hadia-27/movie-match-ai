"use client";

import { useState } from "react";
import {
  Film,
  Sparkles,
  Popcorn,
  Clapperboard,
  Wand2,
  Star,
  Heart,
  Laugh,
  Rocket,
  Gift,
  Info,
  CircleDot,
} from "lucide-react";

type AIResult = {
  title: string;
  mainOutput: string;
  bullets: string[];
  extras: string[];
};

const quickPrompts = [
  { label: "Sad", value: "I want a sad emotional movie", icon: Heart },
  { label: "Funny", value: "I want a funny movie to watch with friends", icon: Laugh },
  { label: "Sci-Fi", value: "I want a mind-bending sci-fi movie", icon: Rocket },
  { label: "Romance", value: "I want a romantic movie with strong chemistry", icon: Heart },
  { label: "Thriller", value: "I want a tense thriller with twists", icon: CircleDot },
  { label: "Motivational", value: "I want an inspiring motivational movie", icon: Star },
];

export default function Home() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIResult | null>(null);
  const [error, setError] = useState("");

  async function handleGenerate() {
    setError("");
    setResult(null);

    if (!input.trim()) {
      setError("Please enter what kind of movie you want.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to generate recommendations.");
        return;
      }

      setResult(data);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setInput("");
    setResult(null);
    setError("");
  }

  return (
    <main className="min-h-screen bg-[#06081a] text-white">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.35),transparent_28%),radial-gradient(circle_at_top_right,rgba(236,72,153,0.22),transparent_25%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.18),transparent_25%)]" />
        <div className="absolute inset-0 bg-[#050816]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(99,102,241,0.08),transparent_18%,transparent_82%,rgba(99,102,241,0.06))]" />
      </div>

      <nav className="border-b border-white/10 bg-[#0a0d24]/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-gradient-to-br from-violet-500/30 to-fuchsia-500/20 p-2.5 text-violet-200 shadow-lg shadow-violet-900/30 transition duration-300 hover:scale-105">
              <Clapperboard size={22} />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Movie Match AI</h1>
              <p className="text-sm text-slate-400">
                Find movies based on your mood and preferences
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition duration-300 hover:bg-white/10 md:flex">
            <Sparkles size={16} className="text-violet-300" />
            AI Powered
          </div>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-fuchsia-400">
              AI Movie Recommender
            </p>

            <h2 className="max-w-3xl text-5xl font-semibold leading-tight md:text-6xl">
              Describe what you
              <br />
              want to{" "}
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                watch
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Enter a mood, genre, or type of film, and the AI will recommend
              movies that match your request.
            </p>
          </div>

          <div className="relative hidden h-[300px] overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-violet-600/30 via-slate-900/80 to-fuchsia-600/20 shadow-2xl shadow-violet-950/40 transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(76,29,149,0.35)] lg:block">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.18),transparent_18%),radial-gradient(circle_at_40%_60%,rgba(124,58,237,0.30),transparent_30%)]" />
            <div className="absolute left-12 top-16 rounded-full bg-white/10 p-6 backdrop-blur transition duration-300 hover:scale-105">
              <Film size={64} className="text-slate-200" />
            </div>
            <div className="absolute left-40 top-12 rounded-[28px] bg-gradient-to-b from-rose-400 to-red-500 px-6 py-8 shadow-xl transition duration-300 hover:scale-105">
              <Popcorn size={78} className="text-white" />
            </div>
            <div className="absolute right-12 top-14 rotate-[-10deg] rounded-3xl bg-white/10 p-8 backdrop-blur transition duration-300 hover:scale-105">
              <Clapperboard size={84} className="text-slate-100" />
            </div>
          </div>
        </div>

        <div className="mt-10">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-slate-300">
            Popular moods
          </p>

          <div className="flex flex-wrap gap-3">
            {quickPrompts.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => setInput(item.value)}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 transition duration-300 hover:-translate-y-0.5 hover:border-violet-400/40 hover:bg-white/10 hover:shadow-lg hover:shadow-violet-900/20 active:scale-[0.98]"
                >
                  <Icon size={16} className="text-fuchsia-400" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid items-start gap-8 xl:grid-cols-[1fr_1.12fr]">
          <div className="rounded-[30px] border border-violet-400/20 bg-[linear-gradient(180deg,rgba(22,26,60,0.96),rgba(10,13,36,0.96))] p-6 shadow-[0_20px_80px_rgba(76,29,149,0.25)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_25px_90px_rgba(76,29,149,0.35)]">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl bg-violet-500/20 p-3 text-violet-300 transition duration-300 hover:scale-105">
                <Wand2 size={18} />
              </div>
              <div>
                <p className="text-xl font-semibold">Tell us your preference</p>
                <p className="text-sm text-slate-400">
                  What kind of movie do you want?
                </p>
              </div>
            </div>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. I want a sad romantic movie with a strong story"
              className="min-h-[190px] w-full rounded-[24px] border border-white/10 bg-[#090d24] p-5 text-white placeholder:text-slate-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/30"
            />

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-fuchsia-950/30 transition duration-300 hover:scale-[1.03] hover:shadow-fuchsia-500/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
              >
                <Sparkles size={18} />
                {loading ? "Finding Movies..." : "Find Movies"}
              </button>

              <button
                onClick={handleClear}
                className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3.5 font-semibold text-white transition duration-300 hover:scale-[1.03] hover:bg-white/10 active:scale-[0.98]"
              >
                Clear
              </button>
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-slate-300 transition duration-300 hover:bg-white/[0.05]">
              <div className="flex items-start gap-3">
                <Info size={18} className="mt-0.5 text-sky-300" />
                <p className="text-sm leading-6">
                  The more details you provide, the better your recommendations
                  will be.
                </p>
              </div>
            </div>

            {error && (
              <div className="mt-5 rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-200">
                <p className="font-medium">
                  Something went wrong while generating recommendations.
                </p>
                <p className="mt-1 text-red-300/80">
                  Please try entering a movie preference again or refresh the page.
                </p>
              </div>
            )}
          </div>

          <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(21,24,49,0.95),rgba(15,18,39,0.95))] p-6 shadow-[0_20px_80px_rgba(15,23,42,0.45)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(15,23,42,0.55)]">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl bg-amber-400/15 p-3 text-amber-300 transition duration-300 hover:scale-105">
                <Star size={20} />
              </div>
              <h3 className="text-3xl font-semibold">Your Recommendations</h3>
            </div>

            {!result && !loading && (
              <div className="rounded-[24px] border border-dashed border-white/10 bg-white/[0.03] p-8 text-center text-slate-400 transition duration-300 hover:bg-white/[0.05]">
                <Film size={36} className="mx-auto mb-4 text-slate-500" />
                <p>Your AI-generated movie recommendations will appear here.</p>
              </div>
            )}

            {loading && (
              <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-8 text-center text-slate-400">
                <Sparkles
                  size={32}
                  className="mx-auto mb-4 animate-spin text-fuchsia-400"
                />
                <p>The AI is finding movies for you...</p>
              </div>
            )}

            {result && (
              <div className="space-y-5">
                <div className="rounded-[24px] border border-amber-400/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-5 transition duration-300 hover:bg-white/[0.05]">
                  <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-fuchsia-400">
                    {result.title || "Movie Recommendations"}
                  </p>
                  <p className="leading-7 text-slate-200">{result.mainOutput}</p>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-white/[0.02] p-5 transition duration-300 hover:bg-white/[0.03]">
                  <div className="mb-4 flex items-center gap-2">
                    <Sparkles size={18} className="text-fuchsia-400" />
                    <h4 className="text-xl font-semibold text-white">Main Picks</h4>
                  </div>

                  <div className="space-y-3">
                    {result.bullets?.map((item, index) => (
                      <div
                        key={index}
                        className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition duration-300 hover:translate-x-1 hover:border-fuchsia-400/20 hover:bg-white/[0.05]"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-sm font-semibold text-white transition duration-300 hover:scale-110">
                            {index + 1}
                          </div>
                          <p className="leading-7 text-slate-300">{item}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-white/[0.02] p-5 transition duration-300 hover:bg-white/[0.03]">
                  <div className="mb-4 flex items-center gap-2">
                    <Gift size={18} className="text-cyan-300" />
                    <h4 className="text-xl font-semibold text-white">Extra Picks</h4>
                  </div>

                  <div className="space-y-3">
                    {result.extras?.map((item, index) => (
                      <div
                        key={index}
                        className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-slate-300 transition duration-300 hover:translate-x-1 hover:border-cyan-300/20 hover:bg-white/[0.05]"
                      >
                        <div className="flex items-center gap-3">
                          <Star size={16} className="text-cyan-300" />
                          <span>{item}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <footer className="mt-14 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <div className="flex items-center gap-2 text-fuchsia-400">
              <Clapperboard size={18} />
              <span className="font-semibold">Movie Match AI</span>
            </div>
            <p className="text-slate-400">
              Your personal AI movie recommendation assistant
            </p>
          </div>
        </footer>
      </section>
    </main>
  );
}