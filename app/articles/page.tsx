"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, FileText, Linkedin } from "lucide-react";
import { Footer } from "@/components/footer";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

type Article = {
  title: string;
  link: string;
  pubDate: string;
  excerpt: string;
  thumbnail: string | null;
  author: string;
};

function formatDate(input: string): string {
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return input;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/articles")
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        if (data.error && (!data.articles || data.articles.length === 0)) {
          setError(data.error);
        }
        setArticles(data.articles ?? []);
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e.message);
        setArticles([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="min-h-screen w-full">
      <div className="h-20 md:h-24" />

      <section className="relative pt-16 md:pt-24 pb-24 md:pb-32 overflow-hidden">
        <div className="container relative">
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="flex items-center gap-3 mb-5"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            >
              <span className="h-px w-10 bg-primary" />
              <span className="font-mono text-primary text-xs uppercase tracking-[0.25em]">
                Articles
              </span>
            </motion.div>

            <motion.h1
              className="font-libre-franklin text-[40px] md:text-[58px] leading-[1.05] tracking-tight mb-5 max-w-3xl"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.05 }}
            >
              Our <span className="text-foreground/55">insights.</span>
            </motion.h1>

            <motion.p
              className="font-inter text-[15px] md:text-[16px] leading-[1.6] text-foreground/65 max-w-2xl mb-12 md:mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.1 }}
            >
              Accessible writing on venture capital, startups, and emerging
              trends in tech, written by our members. Below are some of our top
              articles.
            </motion.p>

            {articles === null && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-[360px] rounded-md bg-foreground/[0.04] animate-pulse"
                  />
                ))}
              </div>
            )}

            {articles && articles.length === 0 && (
              <p className="font-inter text-foreground/60">
                {error
                  ? `Couldn't load articles right now (${error}).`
                  : "No articles to show yet."}
              </p>
            )}

            {articles && articles.length > 0 && (
              <>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
                  },
                }}
              >
                {articles.map((a) => (
                  <motion.a
                    key={a.link}
                    href={a.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.6, ease: EASE_OUT_EXPO },
                      },
                    }}
                    className="group flex flex-col rounded-md overflow-hidden bg-white border border-black/[0.06] hover:border-black/[0.18] transition-colors"
                  >
                    <div className="relative w-full aspect-[16/10] bg-foreground/[0.04] overflow-hidden">
                      {a.thumbnail ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={a.thumbnail}
                          alt=""
                          loading="lazy"
                          draggable={false}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-foreground/30">
                          <FileText className="w-10 h-10" strokeWidth={1.5} />
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col flex-1 p-5 md:p-6">
                      <div className="flex items-center gap-2 mb-3 text-foreground/50">
                        <FileText
                          className="w-3.5 h-3.5"
                          strokeWidth={1.75}
                        />
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
                          {formatDate(a.pubDate)}
                        </span>
                      </div>

                      <h2 className="font-libre-franklin text-[19px] md:text-[20px] leading-[1.2] tracking-tight mb-3 group-hover:text-primary transition-colors">
                        {a.title}
                      </h2>

                      <p className="font-inter text-[13px] md:text-[14px] leading-[1.6] text-foreground/65 line-clamp-3 mb-5">
                        {a.excerpt}
                      </p>

                      <div className="mt-auto inline-flex items-center gap-1.5 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-foreground/55 group-hover:text-primary transition-colors">
                        Read on Medium
                        <ArrowUpRight
                          size={12}
                          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </div>
                    </div>
                  </motion.a>
                ))}
              </motion.div>

              <motion.div
                className="mt-16 md:mt-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 md:p-8 rounded-md border border-black/[0.08] bg-foreground/[0.02]"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
              >
                <div className="max-w-xl">
                  <h3 className="font-libre-franklin text-[22px] md:text-[26px] leading-tight tracking-tight mb-2">
                    Stay in the loop.
                  </h3>
                  <p className="font-inter text-[14px] md:text-[15px] leading-[1.6] text-foreground/65">
                    Follow us on LinkedIn to keep up with our latest
                    publications and announcements.
                  </p>
                </div>
                <a
                  href="https://www.linkedin.com/company/bocconi-students-for-venture-capital/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group shrink-0 inline-flex items-center gap-2.5
                    font-mono text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.2em]
                    px-6 py-3.5 rounded-full bg-foreground text-white
                    hover:bg-primary hover:text-foreground
                    transition-all duration-400
                    shadow-[0_8px_28px_-14px_rgba(0,0,0,0.45)]
                    hover:shadow-[0_14px_36px_-14px_rgba(235,184,0,0.55)]"
                >
                  <Linkedin size={14} strokeWidth={1.75} />
                  Follow on LinkedIn
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </motion.div>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
