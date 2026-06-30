import { useEffect, useRef, useState } from "react";
import {
  Zap,
  Target,
  FileDown,
  PenLine,
  ArrowRight,
  ChevronDown,
  Sparkles,
} from "lucide-react";

/* ─────────────────────────────────────────────
   DESIGN DIRECTION:
   "Terminal Luxe" — engineering-grade precision
   meets premium product design. Every pixel
   earns its place. Monospaced data meets
   editorial type. Dark obsidian base, surgical
   cyan, charged amber accent.
───────────────────────────────────────────── */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');

/* ══ RESET ══════════════════════════════════ */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* ══ TOKENS ══════════════════════════════════ */
:root {
  --bg:         #050810;
  --bg-2:       #080c15;
  --bg-3:       #0b1120;
  --surface:    rgba(255,255,255,0.028);
  --surface-2:  rgba(255,255,255,0.045);
  --border:     rgba(255,255,255,0.06);
  --border-2:   rgba(0,212,255,0.14);

  --cyan:       #00d4ff;
  --cyan-dim:   rgba(0,212,255,0.55);
  --cyan-ghost: rgba(0,212,255,0.08);
  --green:      #00ff88;
  --amber:      #f0a500;
  --violet:     #8b5cf6;

  --text:       #dde5f0;
  --text-2:     rgba(180,200,220,0.55);
  --text-3:     rgba(140,170,190,0.3);
  --text-4:     rgba(100,130,150,0.2);

  --radius-sm:  8px;
  --radius-md:  14px;
  --radius-lg:  20px;
  --radius-xl:  28px;

  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-out:    cubic-bezier(0.22, 1, 0.36, 1);
}

/* ══ BASE ════════════════════════════════════ */
.lp {
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
  font-family: 'DM Sans', sans-serif;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  cursor: none;
}

/* ══ CUSTOM CURSOR ═══════════════════════════ */
.lp-cursor {
  position: fixed;
  width: 10px; height: 10px;
  background: var(--cyan);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition: transform 0.08s, width 0.2s var(--ease-spring), height 0.2s var(--ease-spring), opacity 0.2s;
  mix-blend-mode: screen;
}
.lp-cursor-ring {
  position: fixed;
  width: 36px; height: 36px;
  border: 1px solid rgba(0,212,255,0.35);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  transform: translate(-50%, -50%);
  transition: transform 0.18s var(--ease-out), width 0.25s var(--ease-spring), height 0.25s var(--ease-spring), opacity 0.2s;
}
.lp:hover .lp-cursor { opacity: 1; }

/* ══ NOISE OVERLAY ═══════════════════════════ */
.lp-noise {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  opacity: 0.022;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 128px 128px;
}

/* ══ NAVBAR ══════════════════════════════════ */
.lp-nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  padding: 0 80px;
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background 0.4s, border-color 0.4s;
}
.lp-nav.scrolled {
  background: rgba(5,8,16,0.85);
  backdrop-filter: blur(24px) saturate(160%);
  border-bottom: 1px solid var(--border);
}
@media (max-width: 768px) { .lp-nav { padding: 0 24px; } }

.lp-nav-brand {
  font-family: 'Syne', sans-serif;
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--text);
  text-decoration: none;
  letter-spacing: -0.02em;
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
}
.lp-nav-logo-mark {
  width: 28px; height: 28px;
  background: linear-gradient(135deg, var(--cyan), var(--green));
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 800;
  color: #050810;
  letter-spacing: -0.02em;
  font-family: 'Space Mono', monospace;
  flex-shrink: 0;
}
.lp-nav-accent { color: var(--cyan); }

.lp-nav-center {
  display: flex;
  align-items: center;
  gap: 2px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 100px;
  padding: 5px;
}
@media (max-width: 768px) { .lp-nav-center { display: none; } }

.lp-nav-link {
  font-size: 12.5px;
  font-weight: 400;
  color: var(--text-2);
  text-decoration: none;
  padding: 7px 16px;
  border-radius: 100px;
  transition: color 0.2s, background 0.2s;
  letter-spacing: 0.01em;
}
.lp-nav-link:hover {
  color: var(--text);
  background: var(--surface-2);
}
.lp-nav-link.active {
  color: var(--cyan);
  background: var(--cyan-ghost);
}

.lp-nav-cta {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* ══ SHARED BUTTON SYSTEM ════════════════════ */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border-radius: var(--radius-md);
  font-family: 'Syne', sans-serif;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  border: none;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s var(--ease-spring), box-shadow 0.2s;
  -webkit-user-select: none;
}
.btn::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at var(--bx,50%) var(--by,50%), rgba(255,255,255,0.12), transparent 60%);
  opacity: 0;
  transition: opacity 0.3s;
}
.btn:hover::after { opacity: 1; }
.btn:active { transform: scale(0.97); }

.btn-primary {
  font-size: 13px;
  padding: 14px 28px;
  background: linear-gradient(120deg, var(--cyan) 0%, var(--green) 100%);
  color: #050810;
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0,212,255,0.3), 0 0 0 1px rgba(0,212,255,0.2);
}

.btn-sm { padding: 10px 20px; font-size: 12px; }
.btn-lg { padding: 18px 44px; font-size: 14px; border-radius: var(--radius-lg); }

.btn-ghost {
  font-size: 13px;
  padding: 13px 22px;
  background: transparent;
  border: 1px solid var(--border-2);
  color: var(--text-2);
  font-family: 'DM Sans', sans-serif;
  font-weight: 400;
  text-transform: none;
  letter-spacing: 0.01em;
}
.btn-ghost:hover {
  color: var(--cyan-dim);
  border-color: rgba(0,212,255,0.28);
  background: var(--cyan-ghost);
}

.btn-icon { display: flex; align-items: center; transition: transform 0.2s; }
.btn:hover .btn-icon { transform: translateX(2px); }

/* ══ HERO ════════════════════════════════════ */
.lp-hero {
  position: relative;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 40px;
  padding: 120px 80px 80px;
  overflow: hidden;
}
@media (max-width: 1100px) {
  .lp-hero { grid-template-columns: 1fr; padding: 120px 32px 60px; text-align: center; }
  .lp-hero-visual { display: none; }
  .lp-cta-row { justify-content: center; }
  .lp-stats-row { justify-content: center; }
}

/* Scene layers */
.lp-hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

/* Gradient mesh */
.lp-mesh {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 70% 60% at 20% 30%, rgba(0,212,255,0.055) 0%, transparent 60%),
    radial-gradient(ellipse 50% 50% at 80% 70%, rgba(139,92,246,0.04) 0%, transparent 55%),
    radial-gradient(ellipse 40% 40% at 60% 20%, rgba(0,255,136,0.025) 0%, transparent 50%);
  animation: mesh-breathe 20s ease-in-out infinite;
}
@keyframes mesh-breathe {
  0%, 100% { opacity: 0.8; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.03); }
}

/* Grid */
.lp-hero-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: radial-gradient(ellipse 75% 65% at 50% 50%, black 10%, transparent 75%);
}

/* Particles */
.lp-particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}
.lp-particle {
  position: absolute;
  background: var(--cyan);
  border-radius: 50%;
  animation: particle-rise linear infinite;
}
@keyframes particle-rise {
  0% { transform: translateY(0) scale(1); opacity: inherit; }
  50% { transform: translateY(-50px) scale(1.3); }
  100% { transform: translateY(-120px) scale(0.4); opacity: 0; }
}

/* Scan line */
.lp-scanline {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.4) 50%, transparent 100%);
  animation: scan 8s linear infinite;
  z-index: 2;
  pointer-events: none;
}
@keyframes scan {
  from { top: 0%; }
  to { top: 100%; }
}

/* Hero content */
.lp-hero-content {
  position: relative;
  z-index: 3;
}

/* Status pill */
.lp-status {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 6px 14px 6px 8px;
  background: rgba(0,255,136,0.06);
  border: 1px solid rgba(0,255,136,0.2);
  border-radius: 100px;
  font-size: 11px;
  font-weight: 500;
  color: rgba(0,255,136,0.8);
  letter-spacing: 0.06em;
  margin-bottom: 32px;
  animation: lp-fade-up var(--ease-out) 0.1s both;
  animation-duration: 0.8s;
}
.lp-status-dot {
  width: 8px; height: 8px;
  background: var(--green);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--green);
  animation: status-blink 2.5s ease-in-out infinite;
  flex-shrink: 0;
}
@keyframes status-blink {
  0%, 100% { opacity: 1; box-shadow: 0 0 10px var(--green); }
  50% { opacity: 0.4; box-shadow: 0 0 4px var(--green); }
}
.lp-status-text { letter-spacing: 0.08em; }
.lp-status-sep {
  width: 1px; height: 12px;
  background: rgba(0,255,136,0.2);
}
.lp-status-model {
  font-family: 'Space Mono', monospace;
  font-size: 9px;
  color: rgba(0,255,136,0.5);
  letter-spacing: 0.1em;
}

/* Hero headline */
.lp-headline {
  font-family: 'Syne', sans-serif;
  font-size: clamp(3.4rem, 6.5vw, 6rem);
  font-weight: 800;
  line-height: 0.97;
  letter-spacing: -0.04em;
  color: var(--text);
  margin-bottom: 26px;
}
.lp-hl-line {
  display: block;
  overflow: hidden;
}
.lp-hl-inner {
  display: block;
  animation: line-reveal 0.9s var(--ease-out) both;
}
.lp-hl-1 .lp-hl-inner { animation-delay: 0.05s; }
.lp-hl-2 .lp-hl-inner { animation-delay: 0.18s; }
.lp-hl-3 .lp-hl-inner { animation-delay: 0.31s; }

@keyframes line-reveal {
  from { transform: translateY(110%); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}

.lp-hl-accent {
  background: linear-gradient(100deg, var(--cyan) 0%, var(--green) 55%, var(--cyan) 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: text-shimmer 5s linear infinite;
}
@keyframes text-shimmer {
  from { background-position: 0% center; }
  to   { background-position: 200% center; }
}

/* Subtext */
.lp-sub {
  font-size: 1.05rem;
  font-weight: 300;
  color: var(--text-2);
  line-height: 1.8;
  max-width: 440px;
  margin-bottom: 40px;
  animation: lp-fade-up 0.9s var(--ease-out) 0.35s both;
}
@keyframes lp-fade-up {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* CTA row */
.lp-cta-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 52px;
  animation: lp-fade-up 0.9s var(--ease-out) 0.48s both;
}

/* Stats row */
.lp-stats-row {
  display: flex;
  align-items: center;
  gap: 0;
  animation: lp-fade-up 0.9s var(--ease-out) 0.6s both;
}
.lp-stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 28px;
}
.lp-stat:first-child { padding-left: 0; }
.lp-stat-val {
  font-family: 'Space Mono', monospace;
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--cyan);
  line-height: 1;
  letter-spacing: -0.02em;
}
.lp-stat-key {
  font-size: 9.5px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--text-4);
}
.lp-stat-divider {
  width: 1px;
  height: 38px;
  background: var(--border);
  flex-shrink: 0;
}

/* ══ HERO VISUAL ═════════════════════════════ */
.lp-hero-visual {
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

/* Perspective wrapper */
.lp-visual-scene {
  position: relative;
  transform-style: preserve-3d;
  perspective: 1000px;
}

/* Main card */
.lp-resume-card {
  width: 360px;
  background: var(--bg-3);
  border: 1px solid rgba(0,212,255,0.1);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow:
    0 0 0 1px rgba(0,212,255,0.04),
    0 40px 100px rgba(0,0,0,0.7),
    0 0 80px rgba(0,212,255,0.03);
  animation: card-float 7s ease-in-out infinite;
  position: relative;
}
@keyframes card-float {
  0%, 100% { transform: translateY(0px) rotateX(1deg) rotateY(-1deg); }
  33% { transform: translateY(-12px) rotateX(-0.5deg) rotateY(1.5deg); }
  66% { transform: translateY(-6px) rotateX(1.5deg) rotateY(-0.5deg); }
}

/* Card chrome bar */
.lp-card-chrome {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 12px 16px;
  background: rgba(0,0,0,0.3);
  border-bottom: 1px solid var(--border);
}
.lp-chrome-dot {
  width: 9px; height: 9px;
  border-radius: 50%;
}
.lp-chrome-file {
  margin-left: 10px;
  font-family: 'Space Mono', monospace;
  font-size: 9px;
  color: var(--text-3);
  letter-spacing: 0.08em;
}
.lp-chrome-badge {
  margin-left: auto;
  font-family: 'Space Mono', monospace;
  font-size: 8px;
  color: rgba(0,255,136,0.5);
  letter-spacing: 0.1em;
  padding: 2px 8px;
  background: rgba(0,255,136,0.06);
  border: 1px solid rgba(0,255,136,0.15);
  border-radius: 100px;
}

/* Card body */
.lp-card-body { padding: 24px 22px; }

.lp-card-profile {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 20px;
}
.lp-card-avatar {
  width: 44px; height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(0,212,255,0.3), rgba(0,255,136,0.2));
  border: 1px solid rgba(0,212,255,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  font-size: 15px;
  color: var(--cyan);
  flex-shrink: 0;
}
.lp-card-name {
  font-family: 'Syne', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.01em;
  line-height: 1.2;
}
.lp-card-role {
  font-size: 11px;
  color: var(--cyan-dim);
  margin-top: 2px;
  letter-spacing: 0.04em;
}

.lp-card-divider {
  height: 1px;
  background: var(--border);
  margin-bottom: 16px;
}

.lp-card-section {
  font-family: 'Space Mono', monospace;
  font-size: 8.5px;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: rgba(0,212,255,0.35);
  text-transform: uppercase;
  margin-bottom: 10px;
}

/* Animated bar rows */
.lp-bar-row { display: flex; flex-direction: column; gap: 4px; margin-bottom: 8px; }
.lp-bar {
  height: 5px;
  background: rgba(0,212,255,0.08);
  border-radius: 100px;
  position: relative;
  overflow: hidden;
}
.lp-bar::after {
  content: '';
  position: absolute;
  inset-block: 0;
  left: -100%;
  width: 40%;
  background: linear-gradient(90deg, transparent, rgba(0,212,255,0.3), transparent);
  animation: bar-shimmer 3s ease-in-out infinite;
}
@keyframes bar-shimmer {
  0% { left: -40%; }
  100% { left: 140%; }
}
.lp-bar-xs {
  width: 38%;
  height: 3.5px;
  background: rgba(0,212,255,0.04);
}

.lp-card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 10px;
}
.lp-card-tag {
  font-size: 9.5px;
  padding: 3px 9px;
  background: rgba(0,212,255,0.06);
  border: 1px solid rgba(0,212,255,0.14);
  border-radius: 100px;
  color: var(--cyan-dim);
  font-weight: 500;
  letter-spacing: 0.04em;
}

/* Score badge */
.lp-score-badge {
  margin-top: 18px;
  padding: 10px 14px;
  background: rgba(0,255,136,0.04);
  border: 1px solid rgba(0,255,136,0.14);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.lp-score-label {
  font-family: 'Space Mono', monospace;
  font-size: 8.5px;
  color: rgba(0,255,136,0.5);
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
.lp-score-val {
  font-family: 'Space Mono', monospace;
  font-size: 18px;
  font-weight: 700;
  color: var(--green);
  line-height: 1;
}
.lp-score-bar {
  flex: 1;
  height: 4px;
  background: rgba(0,255,136,0.08);
  border-radius: 100px;
  margin: 0 12px;
  position: relative;
  overflow: hidden;
}
.lp-score-fill {
  position: absolute;
  inset: 0;
  right: 8%;
  background: linear-gradient(90deg, var(--green), var(--cyan));
  border-radius: 100px;
  animation: score-fill 2s var(--ease-out) 0.8s both;
}
@keyframes score-fill {
  from { right: 100%; }
  to   { right: 8%; }
}

/* Floating chips */
.lp-chip {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 9px 14px;
  background: rgba(8,12,21,0.94);
  border: 1px solid rgba(0,212,255,0.18);
  border-radius: 100px;
  font-size: 11px;
  font-weight: 600;
  color: var(--cyan-dim);
  backdrop-filter: blur(20px);
  white-space: nowrap;
  letter-spacing: 0.04em;
}
.lp-chip-icon { display: flex; align-items: center; }
.lp-chip-ai   { top: 5%; right: -30px; animation: chip-float 5s ease-in-out infinite; }
.lp-chip-ats  { bottom: 28%; right: -45px; animation: chip-float 5.5s ease-in-out 1.2s infinite; }
.lp-chip-pdf  { bottom: 6%; left: -28px; animation: chip-float 4.8s ease-in-out 0.6s infinite; }
@keyframes chip-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

/* Ambient orbs */
.lp-orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(70px);
  z-index: 0;
}
.lp-orb-1 {
  width: 300px; height: 300px;
  top: -60px; right: -60px;
  background: radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 70%);
  animation: orb-drift 15s ease-in-out infinite;
}
.lp-orb-2 {
  width: 250px; height: 250px;
  bottom: -40px; left: -40px;
  background: radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%);
  animation: orb-drift 18s ease-in-out infinite reverse;
}
@keyframes orb-drift {
  0%, 100% { transform: translate(0,0); }
  33% { transform: translate(20px, -15px); }
  66% { transform: translate(-10px, 10px); }
}

/* ══ SECTION SHARED ═══════════════════════════ */
.lp-section-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'Space Mono', monospace;
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(0,212,255,0.45);
  margin-bottom: 14px;
}
.lp-section-label::before {
  content: '';
  display: block;
  width: 20px;
  height: 1px;
  background: currentColor;
}

.lp-section-h {
  font-family: 'Syne', sans-serif;
  font-size: clamp(1.8rem, 3.8vw, 2.8rem);
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.025em;
  line-height: 1.08;
}
.lp-section-sub {
  font-size: 1rem;
  font-weight: 300;
  color: var(--text-2);
  line-height: 1.75;
  max-width: 480px;
  margin: 12px auto 0;
}

/* ══ HOW IT WORKS ════════════════════════════ */
.lp-how {
  position: relative;
  padding: 110px 80px;
  background: var(--bg-2);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  overflow: hidden;
}
.lp-how::before {
  content: '';
  position: absolute;
  top: 0; left: 50%;
  transform: translateX(-50%);
  width: 600px; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0,212,255,0.4), transparent);
}
.lp-how::after {
  content: '';
  position: absolute;
  bottom: 0; left: 50%;
  transform: translateX(-50%);
  width: 600px; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0,212,255,0.15), transparent);
}
@media (max-width: 900px) { .lp-how { padding: 80px 32px; } }

.lp-how-inner {
  max-width: 1100px;
  margin: 0 auto;
  text-align: center;
}
.lp-how-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 64px;
  position: relative;
}
@media (max-width: 900px) {
  .lp-how-grid { grid-template-columns: 1fr 1fr; gap: 40px; }
  .lp-step-line { display: none; }
}
@media (max-width: 560px) { .lp-how-grid { grid-template-columns: 1fr; } }

.lp-step {
  position: relative;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.lp-step-circle {
  width: 52px; height: 52px;
  border-radius: 50%;
  border: 1px solid rgba(0,212,255,0.12);
  background: rgba(0,212,255,0.04);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 22px;
  position: relative;
  z-index: 1;
  transition: all 0.3s var(--ease-spring);
}
.lp-step-circle-inner {
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  font-weight: 700;
  color: rgba(0,212,255,0.4);
  letter-spacing: 0.08em;
  transition: color 0.3s;
}
.lp-step:hover .lp-step-circle {
  border-color: rgba(0,212,255,0.4);
  background: rgba(0,212,255,0.08);
  box-shadow: 0 0 30px rgba(0,212,255,0.1), 0 0 0 8px rgba(0,212,255,0.04);
  transform: scale(1.08);
}
.lp-step:hover .lp-step-circle-inner { color: var(--cyan); }

.lp-step-line {
  position: absolute;
  top: 26px;
  left: calc(50% + 26px);
  right: calc(-50% + 26px);
  height: 1px;
  background: linear-gradient(90deg, rgba(0,212,255,0.18) 0%, rgba(0,212,255,0.04) 100%);
  pointer-events: none;
}

.lp-step-h {
  font-family: 'Syne', sans-serif;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 8px;
  letter-spacing: 0.01em;
}
.lp-step-p {
  font-size: 12.5px;
  font-weight: 300;
  color: var(--text-3);
  line-height: 1.65;
  max-width: 170px;
}

/* ══ FEATURES ════════════════════════════════ */
.lp-features {
  padding: 110px 80px;
  position: relative;
}
@media (max-width: 768px) { .lp-features { padding: 80px 24px; } }

.lp-features-inner {
  max-width: 1100px;
  margin: 0 auto;
  text-align: center;
}
.lp-feat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 14px;
  margin-top: 60px;
}

.lp-feat {
  position: relative;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 32px 28px;
  text-align: left;
  overflow: hidden;
  transition: border-color 0.3s, transform 0.3s var(--ease-spring), box-shadow 0.3s;
  cursor: default;
  isolation: isolate;
}

/* Hover spotlight */
.lp-feat::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(0,212,255,0.06) 0%, transparent 60%);
  opacity: 0;
  transition: opacity 0.3s;
}
.lp-feat:hover::before { opacity: 1; }
.lp-feat:hover {
  border-color: rgba(0,212,255,0.2);
  transform: translateY(-5px);
  box-shadow: 0 20px 60px rgba(0,0,0,0.4);
}

/* Corner accent line */
.lp-feat::after {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 0; height: 1px;
  background: linear-gradient(90deg, var(--cyan), transparent);
  transition: width 0.4s var(--ease-out);
}
.lp-feat:hover::after { width: 100%; }

.lp-feat-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 20px;
}
.lp-feat-icon-box {
  width: 50px; height: 50px;
  border-radius: var(--radius-sm);
  background: rgba(0,212,255,0.06);
  border: 1px solid rgba(0,212,255,0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s, box-shadow 0.3s;
}
.lp-feat:hover .lp-feat-icon-box {
  background: rgba(0,212,255,0.1);
  box-shadow: 0 0 24px rgba(0,212,255,0.08);
}
.lp-feat-badge {
  font-family: 'Space Mono', monospace;
  font-size: 8.5px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(0,212,255,0.4);
  background: rgba(0,212,255,0.05);
  border: 1px solid rgba(0,212,255,0.1);
  border-radius: 100px;
  padding: 4px 10px;
}
.lp-feat-title {
  font-family: 'Syne', sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 10px;
  letter-spacing: 0.01em;
}
.lp-feat-desc {
  font-size: 13px;
  font-weight: 300;
  color: var(--text-2);
  line-height: 1.72;
}

/* ══ CTA ══════════════════════════════════════ */
.lp-cta {
  position: relative;
  padding: 130px 80px;
  text-align: center;
  overflow: hidden;
  border-top: 1px solid var(--border);
}
.lp-cta-ambient {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 80% 80% at 50% 50%, rgba(0,212,255,0.04) 0%, transparent 60%),
    radial-gradient(ellipse 40% 40% at 30% 70%, rgba(139,92,246,0.03) 0%, transparent 50%);
  pointer-events: none;
}

/* Grid in CTA */
.lp-cta-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(0,212,255,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,212,255,0.02) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: radial-gradient(ellipse 70% 80% at 50% 50%, black, transparent);
  pointer-events: none;
}

.lp-cta-inner {
  position: relative;
  z-index: 1;
  max-width: 580px;
  margin: 0 auto;
}
.lp-cta-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'Space Mono', monospace;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(0,212,255,0.4);
  margin-bottom: 22px;
}
.lp-cta-h {
  font-family: 'Syne', sans-serif;
  font-size: clamp(2.2rem, 5vw, 3.6rem);
  font-weight: 800;
  color: var(--text);
  letter-spacing: -0.03em;
  line-height: 1.05;
  margin-bottom: 16px;
}
.lp-cta-p {
  font-size: 14px;
  font-weight: 300;
  color: var(--text-3);
  letter-spacing: 0.04em;
  margin-bottom: 42px;
}
.lp-cta-meta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin-top: 28px;
}
.lp-cta-meta-item {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 12px;
  color: var(--text-3);
  font-weight: 400;
  letter-spacing: 0.02em;
}
.lp-cta-meta-dot {
  width: 5px; height: 5px;
  border-radius: 50%;
  background: var(--green);
  box-shadow: 0 0 6px var(--green);
}

/* ══ FOOTER ══════════════════════════════════ */
.lp-footer {
  padding: 22px 80px;
  border-top: 1px solid var(--border);
}
.lp-footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}
.lp-footer-left {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Syne', sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: rgba(0,212,255,0.3);
  letter-spacing: 0.06em;
}
.lp-footer-right {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: var(--text-4);
  letter-spacing: 0.06em;
}
.lp-footer-sep { color: var(--border-2); }

@media (max-width: 768px) {
  .lp-footer { padding: 22px 24px; }
  .lp-footer-inner { justify-content: center; text-align: center; }
}

/* ══ SCROLL REVEAL ═══════════════════════════ */
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.8s var(--ease-out), transform 0.8s var(--ease-out);
}
.reveal.in { opacity: 1; transform: none; }
.reveal-d1 { transition-delay: 0.1s; }
.reveal-d2 { transition-delay: 0.2s; }
.reveal-d3 { transition-delay: 0.3s; }
.reveal-d4 { transition-delay: 0.4s; }
`;

/* ══ DATA ═══════════════════════════════════════ */
const FEATURES = [
  {
    Icon: Zap,
    tag: "Core",
    title: "Intelligent Structuring",
    desc: "GPT-OSS 120B parses plain-text descriptions and generates professionally structured resumes with accurate section mapping.",
    color: "#00d4ff",
  },
  {
    Icon: Target,
    tag: "Optimized",
    title: "ATS-Ready Output",
    desc: "Proper keyword density, clean formatting, and industry-standard structure — every resume is built to clear applicant tracking systems.",
    color: "#00ff88",
  },
  {
    Icon: FileDown,
    tag: "Export",
    title: "Instant PDF Export",
    desc: "Generate a print-ready, pixel-perfect PDF in one click. No third-party tools. No watermarks. Ready to send.",
    color: "#00d4ff",
  },
  {
    Icon: PenLine,
    tag: "Control",
    title: "Full Editorial Control",
    desc: "Every section is editable. Reorder entries, adjust wording, add or remove fields — complete ownership of your final output.",
    color: "#8b5cf6",
  },
];

const STEPS = [
  {
    num: "01",
    label: "Describe your experience",
    desc: "Write about your background, skills, and career history in plain language.",
  },
  {
    num: "02",
    label: "AI structures the resume",
    desc: "GPT-OSS 120B parses your input into a complete, professionally formatted document.",
  },
  {
    num: "03",
    label: "Review and refine",
    desc: "Fine-tune every section, reorder entries, and adjust wording with the built-in editor.",
  },
  {
    num: "04",
    label: "Export as PDF",
    desc: "Download a clean, print-ready PDF optimized for applicant tracking systems.",
  },
];

/* ══ COMPONENT ═══════════════════════════════════ */
export default function LandingPage() {
  const cursorRef = useRef(null);
  const cursorRingRef = useRef(null);
  const heroRef = useRef(null);
  const particlesRef = useRef(null);
  const navRef = useRef(null);
  const [navScrolled, setNavScrolled] = useState(false);

  // inject CSS once
  useEffect(() => {
    const id = "resumint-v2-styles";
    if (!document.getElementById(id)) {
      const s = document.createElement("style");
      s.id = id;
      s.textContent = CSS;
      document.head.appendChild(s);
    }
  }, []);

  // custom cursor
  useEffect(() => {
    const dot = cursorRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;
    let rx = 0,
      ry = 0;
    let raf;
    const move = (e) => {
      dot.style.left = e.clientX + "px";
      dot.style.top = e.clientY + "px";
      const dx = e.clientX - rx,
        dy = e.clientY - ry;
      rx += dx * 0.12;
      ry += dy * 0.12;
    };
    const tick = () => {
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(tick);
    // enlarge on interactive elements
    const on = () => {
      ring.style.width = "56px";
      ring.style.height = "56px";
      ring.style.borderColor = "rgba(0,212,255,0.5)";
    };
    const off = () => {
      ring.style.width = "36px";
      ring.style.height = "36px";
      ring.style.borderColor = "rgba(0,212,255,0.35)";
    };
    document.querySelectorAll("a,button,.lp-feat,.lp-step").forEach((el) => {
      el.addEventListener("mouseenter", on);
      el.addEventListener("mouseleave", off);
    });
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  // navbar scroll
  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // feature card mouse spotlight
  useEffect(() => {
    const cards = document.querySelectorAll(".lp-feat");
    const handle = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      e.currentTarget.style.setProperty(
        "--mx",
        ((e.clientX - rect.left) / rect.width) * 100 + "%",
      );
      e.currentTarget.style.setProperty(
        "--my",
        ((e.clientY - rect.top) / rect.height) * 100 + "%",
      );
    };
    cards.forEach((c) => c.addEventListener("mousemove", handle));
    return () =>
      cards.forEach((c) => c.removeEventListener("mousemove", handle));
  }, []);

  // particles
  useEffect(() => {
    const el = particlesRef.current;
    if (!el || el.children.length > 0) return;
    for (let i = 0; i < 30; i++) {
      const p = document.createElement("span");
      p.className = "lp-particle";
      p.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 100}%;width:${1.5 + Math.random() * 2.5}px;height:${1.5 + Math.random() * 2.5}px;animation-delay:${Math.random() * 10}s;animation-duration:${7 + Math.random() * 12}s;opacity:${0.08 + Math.random() * 0.2};`;
      el.appendChild(p);
    }
  }, []);

  // scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
          }
        }),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // button ripple on hover position
  useEffect(() => {
    const btns = document.querySelectorAll(".btn");
    const h = (e) => {
      const r = e.currentTarget.getBoundingClientRect();
      e.currentTarget.style.setProperty(
        "--bx",
        ((e.clientX - r.left) / r.width) * 100 + "%",
      );
      e.currentTarget.style.setProperty(
        "--by",
        ((e.clientY - r.top) / r.height) * 100 + "%",
      );
    };
    btns.forEach((b) => b.addEventListener("mousemove", h));
    return () => btns.forEach((b) => b.removeEventListener("mousemove", h));
  }, []);

  return (
    <div className="lp">
      {/* Noise texture */}
      <div className="lp-noise" />

      {/* Custom cursor */}
      <div className="lp-cursor" ref={cursorRef} />
      <div className="lp-cursor-ring" ref={cursorRingRef} />

      {/* ── NAVBAR ── */}
      <nav ref={navRef} className={`lp-nav${navScrolled ? " scrolled" : ""}`}>
        <a href="/" className="lp-nav-brand">
          <div className="lp-nav-logo-mark">R</div>
          ResuMint
        </a>

        <div className="lp-nav-center">
          <a href="#how" className="lp-nav-link">
            How it works
          </a>
          <a href="#features" className="lp-nav-link">
            Features
          </a>
        </div>

        <div className="lp-nav-cta">
          <a href="/builder" className="btn btn-primary btn-sm">
            <span>Start building</span>
            <span className="btn-icon">
              <ArrowRight size={13} strokeWidth={2.5} />
            </span>
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="lp-hero" ref={heroRef}>
        <div className="lp-hero-bg">
          <div className="lp-mesh" />
          <div className="lp-hero-grid" />
          <div className="lp-scanline" />
        </div>
        <div className="lp-particles" ref={particlesRef} />

        {/* Left: copy */}
        <div className="lp-hero-content">
          <div className="lp-status">
            <span className="lp-status-dot" />
            <span className="lp-status-text">Online</span>
            <span className="lp-status-sep" />
            <span className="lp-status-model">GPT-OSS · 120B · Groq</span>
          </div>

          <h1 className="lp-headline">
            <span className="lp-hl-line lp-hl-1">
              <span className="lp-hl-inner">Resumes that</span>
            </span>
            <span className="lp-hl-line lp-hl-2">
              <span className="lp-hl-inner lp-hl-accent">land interviews.</span>
            </span>
          </h1>

          <p className="lp-sub">
            Plain text in. A polished, recruiter-ready resume out —
            <br />
            structured, scored, and ready in under a minute.
          </p>

          <div className="lp-cta-row">
            <a href="/builder" className="btn btn-primary">
              <span>Create your resume</span>
              <span className="btn-icon">
                <ArrowRight size={15} strokeWidth={2} />
              </span>
            </a>
            <a href="#how" className="btn btn-ghost">
              See how it works
              <ChevronDown size={14} strokeWidth={1.5} />
            </a>
          </div>

          <div className="lp-stats-row">
            {[
              { val: "<10s", key: "Generation time" },
              { val: "Structured", key: "Output format" },
              { val: "Free", key: "No account required" },
            ].map((s, i) => (
              <>
                {i > 0 && <div className="lp-stat-divider" key={`sep-${i}`} />}
                <div className="lp-stat" key={s.val}>
                  <span className="lp-stat-val">{s.val}</span>
                  <span className="lp-stat-key">{s.key}</span>
                </div>
              </>
            ))}
          </div>
        </div>

        {/* Right: visual */}
        <div className="lp-hero-visual">
          <div className="lp-orb lp-orb-1" />
          <div className="lp-orb lp-orb-2" />

          <div className="lp-visual-scene">
            <div className="lp-resume-card">
              <div className="lp-card-chrome">
                <div
                  className="lp-chrome-dot"
                  style={{ background: "#ff5f57" }}
                />
                <div
                  className="lp-chrome-dot"
                  style={{ background: "#febc2e" }}
                />
                <div
                  className="lp-chrome-dot"
                  style={{ background: "#28c840" }}
                />
                <span className="lp-chrome-file">resume.json → PDF</span>
                <span className="lp-chrome-badge">● LIVE</span>
              </div>
              <div className="lp-card-body">
                <div className="lp-card-profile">
                  <div className="lp-card-avatar">RC</div>
                  <div>
                    <div className="lp-card-name">Rushikesh Chavan</div>
                    <div className="lp-card-role">Senior Frontend Engineer</div>
                  </div>
                </div>
                <div className="lp-card-divider" />
                <div className="lp-card-section">EXPERIENCE</div>
                {[
                  ["Google · 2021–Present", 76],
                  ["Stripe · 2019–2021", 64],
                  ["Vercel · 2017–2019", 82],
                ].map(([label, w]) => (
                  <div className="lp-bar-row" key={label}>
                    <div className="lp-bar" style={{ width: `${w}%` }} />
                    <div className="lp-bar lp-bar-xs" />
                  </div>
                ))}
                <div className="lp-card-section" style={{ marginTop: 14 }}>
                  SKILLS
                </div>
                <div className="lp-card-tags">
                  {["React", "TypeScript", "Node.js", "GraphQL", "AWS"].map(
                    (s) => (
                      <span className="lp-card-tag" key={s}>
                        {s}
                      </span>
                    ),
                  )}
                </div>
                <div className="lp-score-badge">
                  <span className="lp-score-label">ATS Score</span>
                  <div className="lp-score-bar">
                    <div className="lp-score-fill" />
                  </div>
                  <span className="lp-score-val">92</span>
                </div>
              </div>
            </div>

            {/* Floating chips */}
            {/* <div className="lp-chip lp-chip-ai">
              <span className="lp-chip-icon">
                <Sparkles size={12} strokeWidth={1.5} color="#00d4ff" />
              </span>
              AI Generated
            </div>
            <div className="lp-chip lp-chip-ats">
              <span className="lp-chip-icon">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M2 6.5l2.5 2.5 5.5-6"
                    stroke="#00ff88"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span style={{ color: "rgba(0,255,136,0.8)" }}>ATS Ready</span>
            </div>
            <div className="lp-chip lp-chip-pdf">
              <span className="lp-chip-icon">
                <FileDown size={12} strokeWidth={1.5} color="#00d4ff" />
              </span>
              PDF Export
            </div> */}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="lp-how" id="how">
        <div className="lp-how-inner">
          <p className="lp-section-label reveal">How it works</p>
          <h2 className="lp-section-h reveal reveal-d1">
            From description to PDF in four steps
          </h2>
          <p className="lp-section-sub reveal reveal-d2">
            No learning curve. No template frustration. Describe your experience
            and let the AI handle structure, formatting, and optimization.
          </p>
          <div className="lp-how-grid">
            {STEPS.map((s, i) => (
              <div
                className="lp-step reveal"
                style={{ transitionDelay: `${0.1 + i * 0.08}s` }}
                key={s.num}
              >
                <div className="lp-step-circle">
                  <span className="lp-step-circle-inner">{s.num}</span>
                </div>
                {i < STEPS.length - 1 && <div className="lp-step-line" />}
                <div className="lp-step-h">{s.label}</div>
                <p className="lp-step-p">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="lp-features" id="features">
        <div className="lp-features-inner">
          <p className="lp-section-label reveal">Features</p>
          <h2 className="lp-section-h reveal reveal-d1">
            Everything you need.
            <br />
            Nothing in the way.
          </h2>
          <p className="lp-section-sub reveal reveal-d2">
            A focused toolkit for professionals who value clarity over
            complexity.
          </p>
          <div className="lp-feat-grid">
            {FEATURES.map(({ Icon, tag, title, desc, color }, i) => (
              <div className={`lp-feat reveal reveal-d${i + 1}`} key={title}>
                <div className="lp-feat-head">
                  <div className="lp-feat-icon-box">
                    <Icon size={22} strokeWidth={1.5} color={color} />
                  </div>
                  <span className="lp-feat-badge">{tag}</span>
                </div>
                <h3 className="lp-feat-title">{title}</h3>
                <p className="lp-feat-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="lp-cta">
        <div className="lp-cta-ambient" />
        <div className="lp-cta-grid" />
        <div className="lp-cta-inner">
          <div className="lp-cta-eyebrow reveal">
            <span>Get started</span>
          </div>
          <h2 className="lp-cta-h reveal reveal-d1">
            Your next opportunity is
            <br />
            one resume away.
          </h2>
          <p className="lp-cta-p reveal reveal-d2">
            No account required. No credit card. Start building immediately.
          </p>
          <a
            href="/builder"
            className="btn btn-primary btn-lg reveal reveal-d3"
          >
            <span>Create your resume</span>
            <span className="btn-icon">
              <ArrowRight size={16} strokeWidth={2} />
            </span>
          </a>
          <div className="lp-cta-meta reveal reveal-d4">
            {["Free to use", "No account required", "ATS-optimized output"].map(
              (t) => (
                <div className="lp-cta-meta-item" key={t}>
                  <div className="lp-cta-meta-dot" />
                  {t}
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="lp-footer">
        <div className="lp-footer-inner">
          <div className="lp-footer-left">
            <div
              className="lp-nav-logo-mark"
              style={{ width: 22, height: 22, fontSize: 11, borderRadius: 5 }}
            >
              R
            </div>
            ResuMint
          </div>
          <div className="lp-footer-right">
            <span>Powered by Spring AI · React · Groq</span>
            <span className="lp-footer-sep">·</span>
            <span>Open source</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
