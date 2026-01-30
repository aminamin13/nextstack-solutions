import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Moon,
  Sun,
  ExternalLink,
  Sparkles,
  Check,
  Instagram,
  Briefcase,
  Store,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  demo?: string;
};

type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
};

function useThemeMode() {
  const [mode, setMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    const initial = (saved === "dark" || saved === "light") ? saved : (prefersDark ? "dark" : "light");
    setMode(initial);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark");
    localStorage.setItem("theme", mode);
  }, [mode]);

  return {
    mode,
    toggle: () => setMode((m) => (m === "dark" ? "light" : "dark")),
  };
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top: y - 84, behavior: "smooth" });
}

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
};

export default function PortfolioHome() {
  const { mode, toggle } = useThemeMode();
  const reduceMotion = useReducedMotion();

  const projects: Project[] = useMemo(
    () => [
      {
        id: "atlas",
        title: "Atlas Analytics Dashboard",
        description:
          "A premium analytics experience with clean hierarchy, live charts, and thoughtful empty states.",
        technologies: ["React", "TypeScript", "Recharts", "Tailwind"],
        demo: "#",
        github: "#",
      },
      {
        id: "aurora",
        title: "Aurora Landing Page System",
        description:
          "A modular marketing site kit built for speed—sections, pricing, FAQs, and conversion-focused layouts.",
        technologies: ["React", "Framer Motion", "shadcn/ui"],
        demo: "#",
        github: "#",
      },
      {
        id: "studio",
        title: "Studio Portfolio Builder",
        description:
          "A portfolio builder concept with drag-and-drop sections, smart typography presets, and export-ready pages.",
        technologies: ["React", "Radix", "Tailwind"],
        demo: "#",
        github: "#",
      },
      {
        id: "pulse",
        title: "Pulse Mobile App Concept",
        description:
          "A crisp mobile UI exploration—motion, micro-interactions, and a neutral, premium palette.",
        technologies: ["UI Design", "Motion", "Prototyping"],
        demo: "#",
      },
      {
        id: "craft",
        title: "Craft Commerce UI",
        description:
          "A storefront UI with product storytelling, clean product cards, and a refined checkout flow.",
        technologies: ["React", "Tailwind", "Accessibility"],
        demo: "#",
        github: "#",
      },
      {
        id: "relay",
        title: "Relay Brand Identity",
        description:
          "A brand system case study—type scale, color interactions, and component-led identity guidelines.",
        technologies: ["Brand", "Design System", "Figma"],
        demo: "#",
      },
    ],
    [],
  );

  const testimonials: Testimonial[] = useMemo(
    () => [
      {
        id: "t1",
        quote:
          "The work feels premium and intentional—every detail supports the story and the conversion flow.",
        name: "Avery Thompson",
        role: "Founder, Studio North",
      },
      {
        id: "t2",
        quote:
          "Fast, responsive, and unbelievably polished. The final UI looked like a product from day one.",
        name: "Mina Park",
        role: "Product Lead, Lumen",
      },
      {
        id: "t3",
        quote:
          "A rare mix of design taste and engineering rigor. Animations were subtle, smooth, and on-brand.",
        name: "Jonas Rivera",
        role: "CTO, Harbor",
      },
    ],
    [],
  );

  const services = useMemo(
    () => [
      {
        title: "Design Systems",
        description: "A cohesive UI foundation—tokens, components, and patterns that scale.",
      },
      {
        title: "Web Experiences",
        description: "High-end marketing sites and portfolios with crafted motion and typography.",
      },
      {
        title: "Product UI",
        description: "Dashboards and app interfaces that feel fast, clear, and premium.",
      },
    ],
    [],
  );

  const [contactStatus, setContactStatus] = useState<"idle" | "sent">("idle");
  const submitTimeout = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (submitTimeout.current) window.clearTimeout(submitTimeout.current);
    };
  }, []);

  const MotionDiv = reduceMotion ? ("div" as any) : motion.div;
  const MotionSection = reduceMotion ? ("section" as any) : motion.section;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-card focus:px-3 focus:py-2 focus:text-sm focus:shadow"
        data-testid="link-skip"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-50 border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container-pro flex h-16 items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => scrollToId("top")}
            className="group inline-flex items-center gap-2 rounded-xl px-2 py-1 ring-focus"
            data-testid="button-logo"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-foreground text-background shadow-sm">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="hidden sm:block">
              <span className="block text-sm font-semibold leading-4">Alex Morgan</span>
              <span className="block text-xs text-muted-foreground">Freelance Designer & Developer</span>
            </span>
          </button>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {[
              { label: "About", id: "about" },
              { label: "Projects", id: "projects" },
              { label: "Services", id: "services" },
              { label: "Testimonials", id: "testimonials" },
              { label: "Contact", id: "contact" },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToId(item.id)}
                className="rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground ring-focus"
                data-testid={`button-nav-${item.id}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              className="hidden sm:inline-flex rounded-xl"
              onClick={() => scrollToId("projects")}
              data-testid="button-view-work"
            >
              View My Work
              <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>

            <button
              type="button"
              onClick={toggle}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border bg-card/70 text-foreground shadow-sm transition hover:shadow-md ring-focus"
              aria-label={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              data-testid="button-theme-toggle"
            >
              {mode === "dark" ? (
                <Sun className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Moon className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      <main id="main" className="relative" data-testid="page-portfolio">
        <div id="top" />

        <MotionSection
          className="relative overflow-hidden"
          initial={reduceMotion ? undefined : "hidden"}
          whileInView={reduceMotion ? undefined : "show"}
          viewport={{ once: true, amount: 0.3 }}
          variants={reduceMotion ? undefined : { show: { transition: { staggerChildren: 0.08 } } }}
          aria-label="Hero"
        >
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 noise" />
            <div
              className="absolute -left-40 -top-44 h-[520px] w-[520px] rounded-full opacity-40 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, hsl(var(--primary) / 0.35), transparent 60%)",
              }}
            />
            <div
              className="absolute -right-40 top-24 h-[560px] w-[560px] rounded-full opacity-35 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle at 40% 40%, hsl(var(--accent) / 0.30), transparent 62%)",
              }}
            />
          </div>

          <div className="container-pro section pb-8 sm:pb-12">
            <MotionDiv variants={reduceMotion ? undefined : fadeUp}>
              <div className="inline-flex items-center gap-2 rounded-full border bg-card/60 px-3 py-1 text-xs text-muted-foreground shadow-sm glass">
                <span className="inline-flex h-2 w-2 rounded-full bg-[hsl(var(--accent))]" />
                Available for freelance • Q1 2026
              </div>
            </MotionDiv>

            <div className="mt-6 grid items-start gap-10 lg:grid-cols-[1.35fr_0.65fr]">
              <div>
                <MotionDiv variants={reduceMotion ? undefined : fadeUp}>
                  <h1 className="h1" data-testid="text-hero-title">
                    I design and build <span className="text-gradient">high-end</span> digital experiences.
                  </h1>
                </MotionDiv>

                <MotionDiv variants={reduceMotion ? undefined : fadeUp}>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg" data-testid="text-hero-tagline">
                    Alex Morgan — Freelance designer & developer helping founders ship premium websites,
                    product UI, and design systems with clarity, craft, and smooth motion.
                  </p>
                </MotionDiv>

                <MotionDiv
                  variants={reduceMotion ? undefined : fadeUp}
                  className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center"
                >
                  <Button
                    className="rounded-xl"
                    onClick={() => scrollToId("projects")}
                    data-testid="button-hero-view-work"
                  >
                    View My Work
                    <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Button>

                  <Button
                    variant="secondary"
                    className="rounded-xl"
                    onClick={() => scrollToId("contact")}
                    data-testid="button-hero-contact"
                  >
                    Contact Me
                    <Mail className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Button>

                  <div className="flex items-center gap-2 sm:ml-2">
                    <a
                      href="#"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border bg-card/70 shadow-sm transition hover:shadow-md ring-focus"
                      aria-label="GitHub"
                      data-testid="link-github"
                    >
                      <Github className="h-4 w-4" aria-hidden="true" />
                    </a>
                    <a
                      href="#"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border bg-card/70 shadow-sm transition hover:shadow-md ring-focus"
                      aria-label="LinkedIn"
                      data-testid="link-linkedin"
                    >
                      <Linkedin className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                </MotionDiv>

                <MotionDiv variants={reduceMotion ? undefined : fadeUp} className="mt-10">
                  <div className="grid gap-3 sm:grid-cols-3" aria-label="Quick stats">
                    {[
                      { label: "Years", value: "7+" },
                      { label: "Projects shipped", value: "45+" },
                      { label: "Repeat clients", value: "70%" },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="surface rounded-2xl border p-4"
                        data-testid={`card-stat-${s.label.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        <div className="text-sm text-muted-foreground">{s.label}</div>
                        <div className="mt-1 text-2xl font-semibold tracking-tight">{s.value}</div>
                      </div>
                    ))}
                  </div>
                </MotionDiv>
              </div>

              <MotionDiv variants={reduceMotion ? undefined : fadeUp}>
                <div className="surface overflow-hidden rounded-3xl border p-4 sm:p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="kicker">Profile</div>
                      <div className="mt-1 text-sm text-muted-foreground" data-testid="text-profile-subtitle">
                        Clean, confident, and conversion-focused.
                      </div>
                    </div>
                    <Badge className="rounded-full" data-testid="badge-availability">Available</Badge>
                  </div>

                  <div className="mt-4 grid gap-4">
                    <div
                      className="relative aspect-[4/5] overflow-hidden rounded-2xl border bg-muted"
                      data-testid="img-profile"
                    >
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "radial-gradient(circle at 30% 25%, hsl(var(--primary) / 0.25), transparent 55%), radial-gradient(circle at 70% 65%, hsl(var(--accent) / 0.22), transparent 58%)",
                        }}
                      />
                      <div className="absolute inset-0 grid place-items-center">
                        <div className="rounded-2xl border bg-card/70 px-4 py-3 text-center shadow-sm glass">
                          <div className="text-sm font-semibold">Profile image</div>
                          <div className="text-xs text-muted-foreground">Drop in a headshot later</div>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-2">
                      {[
                        { k: "Focus", v: "UI systems, landing pages, dashboards" },
                        { k: "Tools", v: "React, Tailwind, Framer Motion" },
                        { k: "Timezone", v: "UTC−5" },
                      ].map((row) => (
                        <div
                          key={row.k}
                          className="flex items-center justify-between rounded-2xl border bg-card/70 px-4 py-3 shadow-sm glass"
                          data-testid={`row-profile-${row.k.toLowerCase()}`}
                        >
                          <span className="text-sm text-muted-foreground">{row.k}</span>
                          <span className="text-sm font-medium">{row.v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </MotionDiv>
            </div>
          </div>
        </MotionSection>

        <section id="about" className="section" aria-label="About">
          <div className="container-pro">
            <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
              <MotionDiv
                initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="kicker" data-testid="text-about-kicker">About</div>
                <h2 className="mt-3 h2" data-testid="text-about-title">
                  A calm aesthetic with crisp execution.
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground" data-testid="text-about-body">
                  I help freelancers, startups, and teams translate ideas into interfaces that feel
                  premium: clean typography, intentional spacing, and motion that supports the story.
                  I work end-to-end—from positioning and layout to responsive build and polish.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2" aria-label="Skills overview">
                  {["Product UI", "Design Systems", "Responsive Web", "Motion"].map((skill) => (
                    <div
                      key={skill}
                      className="surface rounded-2xl border p-4"
                      data-testid={`card-skill-${skill.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-foreground text-background shadow-sm">
                          <Check className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <div>
                          <div className="font-semibold">{skill}</div>
                          <div className="mt-1 text-sm text-muted-foreground">
                            Crafted for clarity, accessibility, and conversion.
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </MotionDiv>

              <MotionDiv
                initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
              >
                <div className="surface rounded-3xl border p-6 sm:p-7">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="kicker" data-testid="text-skills-kicker">Skills</div>
                      <div className="mt-1 text-sm text-muted-foreground" data-testid="text-skills-subtitle">
                        A modern frontend toolkit.
                      </div>
                    </div>
                    <Badge variant="secondary" className="rounded-full" data-testid="badge-skillset">
                      2026-ready
                    </Badge>
                  </div>

                  <Separator className="my-5" />

                  <div className="grid gap-3 sm:grid-cols-2" aria-label="Skills list">
                    {[
                      { label: "React + TypeScript", detail: "Component systems" },
                      { label: "Tailwind", detail: "Design tokens" },
                      { label: "Framer Motion", detail: "Subtle animation" },
                      { label: "Accessibility", detail: "Keyboard & semantics" },
                      { label: "Performance", detail: "Fast loading" },
                      { label: "UI Review", detail: "Polish & iteration" },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="rounded-2xl border bg-card/70 px-4 py-3 shadow-sm glass"
                        data-testid={`row-skill-${s.label.toLowerCase().replace(/\W+/g, "-")}`}
                      >
                        <div className="text-sm font-semibold">{s.label}</div>
                        <div className="text-xs text-muted-foreground">{s.detail}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </MotionDiv>
            </div>
          </div>
        </section>

        <section id="projects" className="section" aria-label="Projects">
          <div className="container-pro">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="kicker" data-testid="text-projects-kicker">Portfolio</div>
                <h2 className="mt-3 h2" data-testid="text-projects-title">
                  Selected projects & case studies.
                </h2>
                <p className="mt-3 max-w-2xl text-muted-foreground" data-testid="text-projects-subtitle">
                  A curated grid of work with a focus on craft, clarity, and modern UI execution.
                </p>
              </div>
              <Button
                variant="secondary"
                className="rounded-xl"
                onClick={() => scrollToId("contact")}
                data-testid="button-projects-cta"
              >
                Start a project
                <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="grid-projects">
              {projects.map((p) => (
                <Card
                  key={p.id}
                  className="surface group relative overflow-hidden rounded-3xl border p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                  data-testid={`card-project-${p.id}`}
                >
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div
                      className="absolute -right-20 -top-24 h-60 w-60 rounded-full blur-3xl"
                      style={{
                        background:
                          "radial-gradient(circle at 40% 40%, hsl(var(--primary) / 0.25), transparent 65%)",
                      }}
                    />
                  </div>

                  <div className="relative">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="h3" data-testid={`text-project-title-${p.id}`}>{p.title}</div>
                        <p
                          className="mt-2 text-sm leading-relaxed text-muted-foreground"
                          data-testid={`text-project-desc-${p.id}`}
                        >
                          {p.description}
                        </p>
                      </div>
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border bg-card/70 shadow-sm glass">
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2" data-testid={`list-project-tech-${p.id}`}>
                      {p.technologies.map((t) => (
                        <Badge
                          key={t}
                          variant="secondary"
                          className="rounded-full"
                          data-testid={`badge-tech-${p.id}-${t.toLowerCase().replace(/\W+/g, "-")}`}
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {p.demo && (
                        <a
                          href={p.demo}
                          className="inline-flex items-center gap-2 rounded-xl border bg-card/70 px-3 py-2 text-sm shadow-sm transition hover:shadow-md ring-focus"
                          data-testid={`link-project-demo-${p.id}`}
                        >
                          Live demo
                          <ExternalLink className="h-4 w-4" aria-hidden="true" />
                        </a>
                      )}
                      {p.github && (
                        <a
                          href={p.github}
                          className="inline-flex items-center gap-2 rounded-xl border bg-card/70 px-3 py-2 text-sm shadow-sm transition hover:shadow-md ring-focus"
                          data-testid={`link-project-github-${p.id}`}
                        >
                          GitHub
                          <Github className="h-4 w-4" aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="section" aria-label="Services">
          <div className="container-pro">
            <div className="kicker" data-testid="text-services-kicker">Services</div>
            <h2 className="mt-3 h2" data-testid="text-services-title">
              What I can help you ship.
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground" data-testid="text-services-subtitle">
              A small, high-impact menu of services designed for founders and teams that value craft.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3" data-testid="grid-services">
              {services.map((s, idx) => (
                <Card
                  key={s.title}
                  className="surface rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                  data-testid={`card-service-${idx}`}
                >
                  <div className="kicker" data-testid={`text-service-kicker-${idx}`}>Service</div>
                  <div className="mt-2 text-xl font-semibold tracking-tight" data-testid={`text-service-title-${idx}`}>
                    {s.title}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground" data-testid={`text-service-desc-${idx}`}>
                    {s.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="section" aria-label="Testimonials">
          <div className="container-pro">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="kicker" data-testid="text-testimonials-kicker">Testimonials</div>
                <h2 className="mt-3 h2" data-testid="text-testimonials-title">
                  Trusted by thoughtful teams.
                </h2>
                <p className="mt-3 max-w-2xl text-muted-foreground" data-testid="text-testimonials-subtitle">
                  Clean, readable cards with a calm premium feel.
                </p>
              </div>
              <div className="rounded-2xl border bg-card/70 px-4 py-3 text-sm text-muted-foreground shadow-sm glass" data-testid="card-testimonials-note">
                Tip: Swap in real client quotes.
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3" data-testid="grid-testimonials">
              {testimonials.map((t) => (
                <Card
                  key={t.id}
                  className="surface rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                  data-testid={`card-testimonial-${t.id}`}
                >
                  <p className="text-sm leading-relaxed text-foreground/90" data-testid={`text-testimonial-quote-${t.id}`}>
                    “{t.quote}”
                  </p>
                  <div className="mt-4">
                    <div className="text-sm font-semibold" data-testid={`text-testimonial-name-${t.id}`}>{t.name}</div>
                    <div className="text-xs text-muted-foreground" data-testid={`text-testimonial-role-${t.id}`}>{t.role}</div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section" aria-label="Contact">
          <div className="container-pro">
            <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
              <div>
                <div className="kicker" data-testid="text-contact-kicker">Contact</div>
                <h2 className="mt-3 h2" data-testid="text-contact-title">
                  Let’s build something clean and memorable.
                </h2>
                <p className="mt-3 max-w-xl text-muted-foreground" data-testid="text-contact-subtitle">
                  Send a message and I’ll reply within 24–48 hours. (This is a prototype form—no backend.)
                </p>

                <div className="mt-6 grid gap-3" aria-label="Social links">
                  <a
                    href="#"
                    className="inline-flex items-center justify-between rounded-2xl border bg-card/70 px-4 py-3 shadow-sm transition hover:shadow-md glass ring-focus"
                    data-testid="link-social-email"
                  >
                    <span className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-foreground text-background shadow-sm">
                        <Mail className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold">Email</span>
                        <span className="block text-xs text-muted-foreground">hello@alexmorgan.studio</span>
                      </span>
                    </span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>

                  <a
                    href="#"
                    className="inline-flex items-center justify-between rounded-2xl border bg-card/70 px-4 py-3 shadow-sm transition hover:shadow-md glass ring-focus"
                    data-testid="link-social-linkedin"
                  >
                    <span className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-foreground text-background shadow-sm">
                        <Linkedin className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold">LinkedIn</span>
                        <span className="block text-xs text-muted-foreground">linkedin.com/in/alexmorgan</span>
                      </span>
                    </span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>

                  <a
                    href="#"
                    className="inline-flex items-center justify-between rounded-2xl border bg-card/70 px-4 py-3 shadow-sm transition hover:shadow-md glass ring-focus"
                    data-testid="link-social-instagram"
                  >
                    <span className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-foreground text-background shadow-sm">
                        <Instagram className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold">Instagram</span>
                        <span className="block text-xs text-muted-foreground">@alexmorgan.design</span>
                      </span>
                    </span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>

                  <a
                    href="#"
                    className="inline-flex items-center justify-between rounded-2xl border bg-card/70 px-4 py-3 shadow-sm transition hover:shadow-md glass ring-focus"
                    data-testid="link-social-upwork"
                  >
                    <span className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-foreground text-background shadow-sm">
                        <Briefcase className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold">Upwork</span>
                        <span className="block text-xs text-muted-foreground">Alex M.</span>
                      </span>
                    </span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>

                  <a
                    href="#"
                    className="inline-flex items-center justify-between rounded-2xl border bg-card/70 px-4 py-3 shadow-sm transition hover:shadow-md glass ring-focus"
                    data-testid="link-social-gumroad"
                  >
                    <span className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-foreground text-background shadow-sm">
                        <Store className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold">Gumroad</span>
                        <span className="block text-xs text-muted-foreground">alexmorgan</span>
                      </span>
                    </span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </div>

              <Card className="surface rounded-3xl border p-6 sm:p-7" data-testid="card-contact-form">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setContactStatus("sent");
                    if (submitTimeout.current) window.clearTimeout(submitTimeout.current);
                    submitTimeout.current = window.setTimeout(() => setContactStatus("idle"), 2500);
                  }}
                  className="grid gap-4"
                  data-testid="form-contact"
                >
                  <div>
                    <label className="text-sm font-semibold" htmlFor="name" data-testid="label-name">
                      Name
                    </label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      className="mt-2 rounded-2xl"
                      data-testid="input-name"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold" htmlFor="email" data-testid="label-email">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      className="mt-2 rounded-2xl"
                      data-testid="input-email"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold" htmlFor="message" data-testid="label-message">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tell me about your project…"
                      className="mt-2 min-h-[140px] rounded-2xl"
                      data-testid="input-message"
                      required
                    />
                  </div>

                  <Button type="submit" className="rounded-2xl" data-testid="button-submit-contact">
                    Send message
                    <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Button>

                  <div
                    className="text-sm text-muted-foreground"
                    aria-live="polite"
                    data-testid="status-contact"
                  >
                    {contactStatus === "sent" ? "Message sent (demo). I’ll get back to you soon." : ""}
                  </div>
                </form>
              </Card>
            </div>
          </div>
        </section>

        <footer className="border-t">
          <div className="container-pro py-10">
            <div className="grid gap-8 md:grid-cols-3">
              <div>
                <div className="text-sm font-semibold" data-testid="text-footer-brand">Alex Morgan</div>
                <p className="mt-2 max-w-xs text-sm text-muted-foreground" data-testid="text-footer-desc">
                  Minimal, elegant, modern UI with a premium feel—crafted for speed and clarity.
                </p>
              </div>

              <div>
                <div className="text-sm font-semibold" data-testid="text-footer-links-title">Quick links</div>
                <div className="mt-3 grid gap-2 text-sm">
                  {[
                    { label: "About", id: "about" },
                    { label: "Projects", id: "projects" },
                    { label: "Services", id: "services" },
                    { label: "Testimonials", id: "testimonials" },
                    { label: "Contact", id: "contact" },
                  ].map((l) => (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => scrollToId(l.id)}
                      className="w-fit text-muted-foreground transition-colors hover:text-foreground ring-focus"
                      data-testid={`button-footer-${l.id}`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="md:justify-self-end">
                <div className="text-sm font-semibold" data-testid="text-footer-cta-title">Let’s talk</div>
                <p className="mt-2 text-sm text-muted-foreground" data-testid="text-footer-cta-desc">
                  Have a project in mind? I’m available for a limited number of clients.
                </p>
                <Button
                  className="mt-4 rounded-2xl"
                  onClick={() => scrollToId("contact")}
                  data-testid="button-footer-contact"
                >
                  Contact me
                  <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </div>

            <Separator className="my-8" />

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-xs text-muted-foreground" data-testid="text-footer-copyright">
                © {new Date().getFullYear()} Alex Morgan. All rights reserved.
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-xl border bg-card/70 px-3 py-2 text-xs shadow-sm transition hover:shadow-md glass ring-focus"
                  data-testid="link-footer-github"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  GitHub
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-xl border bg-card/70 px-3 py-2 text-xs shadow-sm transition hover:shadow-md glass ring-focus"
                  data-testid="link-footer-linkedin"
                >
                  <Linkedin className="h-4 w-4" aria-hidden="true" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
