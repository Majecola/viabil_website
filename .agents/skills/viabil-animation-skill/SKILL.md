---
name: website-animation-director
description: Develops cinematic website animation concepts for scroll-stoppers, hero sections, and lifecycle showcases. Use this skill whenever a user wants to create, plan, or prompt-engineer a website animation, scroll-driven video, hero background loop, or cinematic section for a landing page — even if they only give a vague idea like "something that shows our product" or "a video for the hero". The skill develops the concept, generates image generation prompts for the start and end frames, a transition video prompt, and the HTML overlay text that sits beside the video on the page. Always use this skill when the request involves any combination of: scroll-stopper, hero animation, cinematic video, website motion, brand video, product showcase animation, or lifecycle visualization.
---

# Website Animation Director

This skill takes a brand context and an animation idea — or generates the idea from scratch — and produces a complete creative and technical brief for a cinematic website animation. The output is ready to hand to a motion designer, video director, or AI image/video generation tool.

The user may provide:
- A specific idea ("a map that zooms into a location")
- A vague direction ("something that shows how our product works")
- A stage or section context ("hero background", "scroll-stopper", "lifecycle stage 3")
- Nothing except brand context — in which case you develop the concept entirely

---

## Step 1 — Understand the Context

Before developing anything, establish:

1. **What type of animation is this?**
   - Hero background (seamless loop, lives behind text, must be subtle)
   - Hero section (plays once or loops, is the visual centerpiece)
   - Scroll-stopper (triggered by scroll, mid-page, 7 seconds maximum)
   - Lifecycle showcase (multi-stage scroll-jacked sequence, each stage its own scene)
   - General brand video (standalone, not scroll-driven)

2. **What is the brand?**
   Extract from context or ask: brand colors, personality, industry, target audience, what the product does. If a brand document is in context, read it in full before proceeding.

3. **What should the animation communicate?**
   A benefit, a product feature, a feeling, a transformation, a process. If the user is vague, propose a concept and confirm before developing.

4. **Are there restrictions?**
   - No text or numbers in the video frames (common requirement — always confirm)
   - No UI/dashboard visuals
   - No dark themes
   - Maximum duration
   - Physical/real-world only vs. abstract/data visual

If the user says "develop the idea yourself", skip to Step 2 immediately with a proposed concept. Do not ask unnecessary questions.

---

## Step 2 — Develop the Concept

Write a **Concept Block** before any prompts. This is 3–5 sentences maximum:

- The core visual metaphor and why it fits the brand
- The emotional arc of the animation (what the viewer feels at start vs. end)
- One sentence on why this concept works for this specific audience

Format:
```
## [ANIMATION TYPE] — "[Evocative Title"

**Concept:** [3–5 sentence concept description]

**Why it works:** [One sentence on audience fit]
```

---

## Step 3 — Generate the Four Deliverables

Every animation brief contains exactly four deliverables. Generate all four in sequence, in this order:

---

### DELIVERABLE 1 — Initial Frame Prompt

The image that will be generated as the first frame of the animation. This is a **still image generation prompt** for tools like Midjourney, Adobe Firefly, or DALL-E.

**Rules:**
- Write in descriptive paragraph form, not bullet points
- Begin with camera position and shot type (aerial, close-up, ground-level, etc.)
- Include lighting specification (golden hour, natural daylight, hard directional, etc.)
- Include color palette grounded in the brand colors
- Specify atmosphere and emotional tone
- End with technical specs: aspect ratio (always 16:9 unless specified), style reference (e.g. "architectural photography quality", "editorial photography quality", "drone cinematography quality")
- **Never describe or specify any logo in the prompt.** If the brand logo appears in the frame, write only: "Place the [Brand] logo at [position] — do not generate, use the existing logo asset."
- Never include readable text in the frame unless it is physically engraved or printed on a real object within the scene
- Maximum 200 words

Format:
```
### Initial Frame
[prompt text]
```

---

### DELIVERABLE 2 — End Frame Prompt

The image that will be generated as the final frame of the animation. Same format rules as the Initial Frame.

**Additional rules:**
- The end frame must be the same camera position and lens as the initial frame unless a camera move is the core of the animation
- The end frame represents the completed transformation — the "after" state
- If the animation loops, the end frame must be visually identical or nearly identical to the initial frame (for seamless loop animations, state this explicitly)

Format:
```
### End Frame
[prompt text]
```

---

### DELIVERABLE 3 — Transition Video Prompt

The prompt describing the motion, timing, and sequence of events between the initial and end frames. This is used for AI video generation tools (Runway ML, Kling, Sora) or as a brief for a motion designer.

**Rules:**
- Always state total duration first (maximum 7 seconds for scroll-stoppers, 10–14 seconds for hero sections, 16 seconds for seamless loops)
- Break the animation into timed segments using `0s–Xs:` notation
- Each segment describes only what moves, how it moves, and at what speed — no creative justification
- State easing for all movements: always use `cubic-bezier(0.16, 1, 0.32, 1)` for entrances, `linear` for continuous motion, `ease-in-out` for breathing/pulsing
- State what does NOT move (camera locked, background static, etc.) — this is as important as what moves
- End with technical specs: implementation suggestion (GSAP, CSS, Lottie, Runway, Kling), resolution (16:9, 1080p minimum), fade behavior (always fade to white, never black, unless brand specifies otherwise)
- Maximum 300 words

Format:
```
### Transition Video
[prompt text]
```

---

### DELIVERABLE 4 — Side Text

The HTML overlay copy that appears beside the video on the webpage. This text is NOT inside the video — it sits in the right column (or left column) of the section layout, visible as the user scrolls.

**Rules:**
- Write in the brand's language (Portuguese for Brazilian brands unless specified otherwise)
- Structure: Stage label (if lifecycle) → Headline → Body → Closing line
- Headline: 2–4 lines, premium editorial quality, line breaks intentional
- Body: 3–5 sentences, no bullet points, flowing prose
- Closing line: single sentence or two-line thought, in brand primary color, acts as the emotional landing point
- If this is the final stage in a lifecycle sequence, include a CTA line after the closing
- Never write generic marketing copy — every line must be specific to what the animation shows

**Styling specifications (always include):**
- Stage label: `font-size: 11px`, `letter-spacing: 0.2em`, `color: [brand primary]`, uppercase, `font-weight: 500`
- Headline: `font-size: 42px`, premium serif (specify: Playfair Display or equivalent), `font-weight: 400`, `line-height: 1.15`
- Body: `font-size: 16px`, `font-weight: 300`, `line-height: 1.8`, `color: [brand secondary text]`
- Closing line: same as body but `color: [brand primary]`, `font-weight: 400`, `margin-top: 24px`
- Entrance animation: `opacity: 0→1`, `translateY(24px→0)`, `600ms`, `cubic-bezier(0.16, 1, 0.32, 1)`

Format:
```
### Side Text

[stage label if applicable]

[headline]

[body paragraph]

[closing line]

---
Styling:
[styling specifications]
```

---

## Step 4 — Multi-Stage Lifecycle Sequences

If the animation is a lifecycle showcase (multiple stages, scroll-jacked), apply the above four deliverables **per stage**, with these additional rules:

**Sequence continuity:**
- The end frame of each stage must dissolve naturally into the initial frame of the next
- State the transition type between stages: `Fade to white` / `Hard cut` / `Dissolve` / `Camera move connects`
- Use a hard cut only when it reinforces the emotional logic (e.g. a decision being made → the outcome activated)
- All other transitions: fade to white

**Camera continuity:**
- When stages share a physical space (e.g. same building, same room), maintain the same camera position across those stages and signal the progression through time via light changes (morning → afternoon → golden hour)
- When stages change location entirely, the fade to white is the transition — no camera bridge needed

**Timing rule for lifecycle sequences:**
- Maximum 7 seconds per stage transition video
- The user scrolls approximately one gesture per stage
- After all stages complete, the scroll releases back to normal page flow

**Progress indicator spec (always include for lifecycle):**
```
Progress indicator: [N] dots, far right edge of viewport, vertically centered.
Inactive: 6px circle, #[light color].
Active: 8px circle, #[brand primary], pulse animation on activation.
Spacing: 16px between centers. Position: fixed, right: 32px.
```

---

## Step 5 — Quality Checks

Before delivering, verify:

- [ ] No logo description in any image prompt — only placement instruction
- [ ] No readable text in video frames (unless physically engraved/printed on object in scene)
- [ ] Fade to white (not black) unless brand context specifies otherwise
- [ ] All timing segments add up to the stated total duration
- [ ] End frame camera position matches initial frame (unless camera move is intentional)
- [ ] Side text is in the correct language for the brand
- [ ] Closing line is in brand primary color
- [ ] No UI/dashboard elements in frames (unless explicitly requested)
- [ ] Scroll-stopper duration ≤ 7 seconds
- [ ] Hero loop duration is exactly stated and loop-ready

---

## Tone and Aesthetic Principles

These apply to every concept developed with this skill:

**Always:**
- Cinematic and premium over corporate and safe
- Physical and real-world over abstract and digital
- Slow and deliberate camera movement over fast and dynamic
- Natural light over studio light (golden hour, morning directional, afternoon warm)
- White and brand color backgrounds over dark backgrounds (unless brand is dark)
- One strong visual metaphor over multiple competing ideas per scene
- The simplest version of the idea first — complexity is earned, not assumed

**Never:**
- Neon glows, particle explosions, or futuristic digital aesthetics unless brand-specific
- Text overlays or data labels inside the video frames
- Dark-to-black backgrounds unless the brand color system is dark
- Generic "tech company" visuals (floating holographic interfaces, abstract data spheres)
- More than one major visual event per 7-second scene
- Camera movements that compete with the subject's own movement

**The test:** Cover the brand name. Does this animation feel like it could only belong to this brand? If not, revise the concept.

---

## Output Format

Deliver all four deliverables in a single response, in this structure:

```
## [ANIMATION TYPE] — "[Title]"

**Concept:** ...
**Why it works:** ...

---

### Initial Frame
[prompt]

---

### End Frame
[prompt]

---

### Transition Video
[prompt]

---

### Side Text
[copy]

---
Styling:
[specs]
```

For multi-stage lifecycle sequences, repeat the four deliverables block per stage, with a stage header and inter-stage transition note between each block.
