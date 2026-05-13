# Sizzle - Build Guide

## Mission

**Help people wean themselves off Factor by building a cooking habit.**

Sizzle is not a recipe app. It's a **habit-building tool** that uses recipes as the vehicle.

Target: Factor customers who want to cook more but get decision fatigue and lack confidence.

---

## The Problem We're Solving

- Factor customers pay $12-15/meal = $400-450/month
- They want to cook but don't know what to make
- They get overwhelmed by choice
- They need structure and confidence
- They fall back to Factor because it's easier

**Sizzle solves:** Remove decision fatigue. Provide beautiful, foolproof recipes. One per week. Build the habit.

---

## Product Vision

**The Streak is Everything**

The core product is a GitHub-style habit tracker. One week = one cell. Cook once that week = green cell.

Everything else (recipes, shopping, videos) supports the streak.

---

## MVP Scope (Frontend Only - Tonight)

**Goal:** Validate the core idea with your girlfriend in 2-3 hours.

### Features:
1. **Hero/Onboarding** (30 seconds)
   - "Cook Factor meals yourself. Save money. Build the habit."
   - Equipment selection: stove, oven, air fryer, etc.

2. **Recipe of the Week** (main feature)
   - Beautiful card with one Factor recipe
   - Ingredients list
   - Step-by-step instructions (beginner-friendly)
   - Food photo (beautiful, appetizing)

3. **Streak Tracker** (habit engine)
   - GitHub-style calendar grid (weeks as cells)
   - Green = cooked that week, empty = didn't
   - Simple streak counter ("4 week streak")
   - Celebration animation when they mark a week

4. **"Did you cook it?" Button**
   - Marks the week as complete
   - Updates streak instantly
   - Shows celebration (confetti? glow effect?)

### No Auth, No Backend, No Database
- All data in localStorage
- Hardcoded 5 recipes (you'll add them)
- Just proof of concept

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **UI Library:** React 18
- **Components:** shadcn/ui
- **Styling:** Tailwind CSS
- **Hosting:** Can test locally, deploy to Vercel free tier

---

## Performance-First Architecture

**Performance is the #1 constraint.** Mobile web must feel native.

### Critical Metrics:
- **FCP (First Contentful Paint):** <1.5s
- **LCP (Largest Contentful Paint):** <2.5s
- **CLS (Cumulative Layout Shift):** <0.1
- **INP (Interaction to Next Paint):** <100ms

### Implementation:
1. **Images**
   - Use `next/image` for all photos
   - Auto-optimize for mobile
   - Lazy load below fold
   - Serve correct sizes

2. **Code Splitting**
   - React.memo for expensive components
   - Lazy load recipe details
   - Code split modals/secondary pages

3. **CSS & Motion**
   - CSS animations only (GPU accelerated)
   - No JS layout shifts
   - Smooth 60fps scrolling
   - Touch interactions instant

4. **Bundle Size**
   - Keep it under 50KB gzipped
   - Tree-shake unused code
   - No heavy dependencies

5. **Local-First**
   - localStorage for all data (instant reload)
   - No network requests for core experience
   - Streak data persists offline

---

## Design Aesthetic

**Tone:** Warm, approachable, celebratory. Like cooking with someone who believes in you.

**Not:** Corporate, cold, minimalist
**Not:** Overly designed, cluttered
**Yes:** Inviting kitchen vibes

### Color Palette (High Contrast, Luxury Minimalism):
- **Primary:** Pure black (#000000)
- **Secondary:** Creamy white (closer to white than beige) (#F8F8F6 or #FAFAF8)
- **Accent:** Warm gold or burnt orange (small touches only)
- **Neutral:** Black and cream only

**Rationale:** High contrast = fast readability on mobile. Luxury minimalism = feels premium, not budget. Black + cream = sophisticated, not boring.

### Typography:
- Display: Distinctive, warm font (not Inter/Roboto)
- Body: Clean, readable, friendly

### Motion:
- Streak cell fill: Satisfying animation (like watching progress)
- Success moment: Subtle celebration (glow, confetti optional)
- Scrolling: Buttery smooth

---

## Data Structure (localStorage)

```javascript
{
  user: {
    equipment: ["stove", "oven", "air_fryer"],
    createdAt: "2026-05-12"
  },
  streak: {
    weeks: [
      { week: 1, cooked: true, date: "2026-05-12" },
      { week: 2, cooked: false, date: "2026-05-19" },
      // ...
    ],
    currentStreak: 1
  },
  recipes: [
    {
      id: 1,
      name: "Pan-Seared Chicken with Garlic Green Beans",
      equipment: ["stove"],
      ingredients: [...],
      instructions: [...],
      image: "...",
      cook_time: 18
    },
    // ... 4 more
  ]
}
```

---

## Recipe Format

Each recipe needs:
- **Name** (appealing, clear)
- **Equipment required** (stove, oven, air fryer, etc.)
- **Ingredients** (4-6 max, with quantities)
- **Instructions** (3-5 steps, brutally simple)
- **Cook time** (15-20 mins max)
- **Food photo** (beautiful, appetizing)
- **Tips** (what could go wrong? how to fix it?)

Example:
```javascript
{
  name: "Pan-Seared Chicken with Garlic Green Beans",
  equipment: ["stove"],
  ingredients: [
    "2 chicken breasts",
    "1 lb fresh green beans",
    "4 cloves garlic",
    "2 tbsp olive oil",
    "Salt and pepper"
  ],
  instructions: [
    "Heat olive oil in large pan over medium-high heat",
    "Season chicken with salt and pepper. Cook 6-7 mins each side until golden",
    "Remove chicken, add green beans and garlic to same pan",
    "Cook 5-6 mins until beans are tender and garlic is fragrant",
    "Plate and serve"
  ],
  cookTime: 18,
  tips: "Don't move the chicken around—let it sear! If it's sticking, it's not ready to flip."
}
```

---

## Agent System

When building Sizzle, you're not alone. Deploy these agents to handle different constraints and catch problems early.

### Agent 1: Design Lead (Design & UX Expert)
**Role:** Everything looks beautiful. Everything feels intentional. No generic AI aesthetics.

**Responsibilities:**
- Black + cream palette execution (high contrast, luxury feel)
- Typography choices (distinctive, not Inter/Roboto)
- Component design (buttons, cards, modals)
- Motion and micro-interactions (satisfying, not distracting)
- Mobile responsiveness (not just scaling, thoughtful adaptation)
- Food photography framing (hero images, ingredient photos)

**Constraints:**
- Every pixel serves a purpose
- No design debt ("we'll fix it later" = don't do it)
- Accessibility first (contrast, touch targets, keyboard nav)
- Minimalism beats complexity (remove before adding)

**Questions Design Lead asks:**
- "Does this feel premium or cheap?"
- "Would a food blogger be proud to share this recipe card?"
- "Is there a simpler way to show this?"

---

### Agent 2: Tech Lead (Performance & Architecture)
**Role:** Nothing ships slow. Every decision is a tradeoff.

**Responsibilities:**
- Performance budgets (FCP <1.5s, LCP <2.5s, CLS <0.1, INP <100ms)
- Bundle size monitoring (keep under 50KB gzipped)
- Dependency selection (every npm package justified)
- Code splitting strategy (what loads when, why)
- Mobile web vs native tradeoffs
- Image optimization (format, size, lazy loading)
- localStorage vs API calls (when to sync, when to local-first)

**Constraints:**
- Measure before optimizing (Lighthouse, DevTools)
- No premature optimization (but do it right first time)
- Document tradeoffs (speed vs feature, complexity vs perf)
- Test on real phones (not just Devtools)

**Questions Tech Lead asks:**
- "Is this the fastest way to do this?"
- "What breaks if the user is on 4G?"
- "Can we do this without shipping JavaScript?"

---

### Agent 3: Co-PM (Roadmapping & Strategic Thinking)
**Role:** What matters. What doesn't. What's next. Keep eyes on the real goal.

**Responsibilities:**
- MVP scope (what makes the cut, what waits)
- Success metrics (how do we know this works?)
- Future roadmap (what's phase 2, 3, 4?)
- Feature prioritization (habit streak > everything else)
- Market positioning (Factor replacement, not generic recipe app)
- Monetization strategy (validate before building)
- User feedback loops (what to listen to, what to ignore)

**Constraints:**
- Ship > Perfect (get feedback from real users)
- One goal per sprint (don't split focus)
- Data beats intuition (measure, don't assume)
- Customer obsession (why would someone actually use this?)

**Questions Co-PM asks:**
- "Does this get us closer to the goal?"
- "Will someone pay for this?"
- "What do we need to learn next?"

---

### Agent 4: Customer/Critic (Impatient User Who Wants to Cook)
**Role:** The user who wants to cook but doesn't have time. Impatient. Will leave immediately if it's confusing or slow.

**Persona:**
- Guy in his 20s
- Works full-time (boring SWE job)
- Wants to cook with girlfriend
- Gets decision fatigue easily
- Falls back to Factor because it's easier
- Will abandon app if:
  - Takes >3 seconds to load
  - Can't understand the idea in 10 seconds
  - Recipe seems intimidating
  - Streak gets broken (loses motivation)
  - Has to think too much

**Responsibilities:**
- Brutal honesty (design good? no, it's clunky)
- Speed testing (can I use this on my commute?)
- Simplicity audits (is this confusing to a tired person?)
- Motivation tracking (does the streak feel real or fake?)
- Dropout risk (would I quit using this?)

**Constraints:**
- No excuses (if it's slow, it's slow)
- Impatience is a feature (if the user is bored, we failed)
- Time is precious (every second counts)
- Habits are fragile (one bad experience breaks the streak mentally)

**Questions Customer/Critic asks:**
- "Can I understand this in 10 seconds?"
- "Does this recipe actually look like something I'd cook?"
- "Would I really do this every week?"
- "Am I going to abandon this after week 2?"

---

## Using the Agents

When you're building, invoke the right agent:

- **Building a component?** → Design Lead reviews it
- **Shipping code?** → Tech Lead runs performance audit
- **Planning next sprint?** → Co-PM decides what matters
- **Testing with girlfriend?** → Customer/Critic evaluates ruthlessly

**Example workflow:**
1. You build a recipe card
2. Design Lead: "The food photo needs better framing"
3. Tech Lead: "Image is 2MB, needs to be <200KB"
4. Customer/Critic: "This recipe looks hard, I'd skip it"
5. Co-PM: "Fix the image size and difficulty first, beauty second"

---

## MVP Build Checklist

- [ ] Next.js project initialized
- [ ] shadcn/ui set up
- [ ] Home page with hero + CTA
- [ ] Equipment selection onboarding (localStorage)
- [ ] Recipe card component (beautiful, responsive)
- [ ] Step-by-step instruction display
- [ ] Streak tracker (calendar grid)
- [ ] "Did you cook it?" button
- [ ] localStorage persistence
- [ ] Mobile responsive (test on actual phone)
- [ ] Performance audit (Lighthouse >90)
- [ ] Demo with girlfriend

---

## Success Criteria (MVP Validation)

After building tonight, test with your girlfriend:

1. **Can she understand the concept in 10 seconds?** (If not, messaging is wrong)
2. **Does the recipe look appetizing?** (If not, photo/design is wrong)
3. **Can she see herself cooking it?** (If not, instructions aren't simple enough)
4. **Does the streak feel satisfying?** (If not, celebration animation needs work)
5. **Would she actually use this weekly?** (Most important)

If she says "yes" to #5, you keep building.

---

## Next Steps (Post-MVP Validation)

If girlfriend is on board:

1. **Find 4 more recipes** (same quality as the first)
2. **Add backend** (Node + Express + TypeScript)
3. **Add database** (Supabase PostgreSQL)
4. **Add Walmart API integration**
5. **Add user auth** (Google OAuth via NextAuth)
6. **Launch to Factor subreddits**

---

## Remember

- **Ship > Perfect.** Get it working, iterate based on feedback.
- **Performance matters.** Every millisecond counts on mobile.
- **The streak is sacred.** All UX decisions filter through: "Does this make the streak more satisfying?"
- **You're building for yourself first.** If you wouldn't use it, others won't either.
- **Consistency beats features.** One beautiful recipe > ten mediocre ones.

---

## Brand Voice

When writing copy, use warm, encouraging language:
- "You've got this"
- "One meal at a time"
- "Building your cooking habit"
- "Save $300/month while learning"
- Avoid: corporate, cold, salesy language

---

## Let's Go

Clock starts now. Build it. Test with your girlfriend. Let's see if this is real.
