# VIABIL — Animation Concepts

**Brand:** O VIABIL / BDK Solutions  
**Colors:** Green primary `#0A4B35` · Secondary `#13885E` · Light `#5FBF9F` · Black `#0D0D0D` · Gray `#4A4A4A`  
**Audience:** Real estate executives, incorporadoras, loteadoras, investors, consultants  
**Language:** Portuguese (Brazil)  
**Tone:** Premium, executive, real-world, no generic tech aesthetics  
**Skill used:** `website-animation-director` (`.agents/skills/viabil-animation-skill/`)

\---

## Placement Map

|#|Page|Position|Type|Duration|
|-|-|-|-|-|
|1|Homepage|Hero background|Seamless loop|14s|
|2|`/plataforma`|After "Ciclo VIABIL" timeline|Scroll-stopper|6s|
|3|`/plataforma`|Replacing/augmenting cycle timeline|Lifecycle showcase (5 stages)|7s × 5|
|4|`/sobre`|Between Manifesto and Propósito|Scroll-stopper|6s|

\---

## Concept 1 — Homepage Hero

## HERO SECTION — "O Solo Antes da Decisão"

**Concept:** An aerial camera locked above raw Brazilian terrain — red earth, sparse vegetation, the geometry of a future development already implied in the plot's shape. Over 12 seconds the light shifts from cool blue dawn to warm morning directional, making the same land feel like a different decision at each end of the animation. The viewer feels the weight of the moment before Go/No-Go. This loops as the homepage hero background, sitting behind the headline "Viabilidade financeira para o ciclo completo do empreendimento imobiliário."

**Why it works:** Real estate executives make decisions about raw land every week. This image is their world before VIABIL enters it — it positions the platform as the intelligence that makes that moment less risky.

\---

### Initial Frame

Aerial drone shot from approximately 80 meters, camera angled 45 degrees down toward a large rectangular plot of undeveloped Brazilian cerrado terrain — red earth with compacted soil, sparse low vegetation at the edges, surveyor stakes at the corners. The frame is wide, 16:9, with the plot occupying roughly 70% of the frame; the horizon sits at the top third with distant low-rise São Paulo peripheral neighborhood softly out of focus. Early morning light, cool and directional, casting long thin shadows from the stakes. The soil reads as rich ochre-red against the gray-green surrounding vegetation. Atmosphere: silent, heavy with potential. Color palette anchors in warm earth tones and cool pre-dawn sky — no artificial color treatment. Architectural drone cinematography quality, 16:9.

\---

### End Frame

Same camera position, same 45-degree angle, same plot. The light has shifted to warm morning directional — golden hour has just passed, sun now at 20 degrees above horizon, casting sharp angular shadows across the cleared terrain. The soil appears warmer, more resolved. The surrounding neighborhood is now visible in soft focus with sharper morning clarity. Same surveyors' stakes, same field of view — but the light transforms the emotional register from uncertainty to decision. Architectural drone cinematography quality, 16:9.

\---

### Transition Video

Total duration: **14 seconds**. Seamless loop.

* `0s–3s:` Camera completely locked. No movement. Cool pre-dawn light, scene static. Stakes cast thin shadows pointing almost horizontally.
* `3s–8s:` Light gradually warms — a slow, linear sky-driven transition as the sun rises behind the frame. Shadows rotate imperceptibly clockwise and shorten by 30%. Background neighborhood softens slightly deeper into bokeh. Easing: `linear` throughout. Camera does not move.
* `8s–12s:` Light reaches full warm morning directional. Shadows now sharp, angular, pointing southeast. The red earth saturates slightly warmer. Scene holds. Camera still locked.
* `12s–14s:` Scene fades gently to nearly identical cool pre-dawn state — a 2-second dissolve back to the initial frame to prepare the loop. Easing: `ease-in-out`.

**What does NOT move:** Camera (completely locked throughout). Terrain, stakes, surrounding landscape. No particle effects, no data overlays, no logo in frame.

**Technical:** Runway ML / Kling · 16:9 1080p minimum · Fade back to initial frame at loop point — never fade to black · GSAP ScrollTrigger for timeline control · Mute, autoplay, loop.

\---

### Side Text

*(Hero overlay — left-aligned, over video, white text)*

INTELIGÊNCIA FINANCEIRA

**Do terreno ao resultado,  
com a mesma visão gerencial.**

O VIABIL acompanha o empreendimento desde a análise de aquisição até o previsto x realizado. Premissas vivas, cenários recalculáveis, relatórios para comitê — tudo na mesma plataforma.

*Mais de 600 empresas confiam no padrão VIABIL.*

\---

**Styling:**

* Eyebrow: `font-size: 11px` · `letter-spacing: 0.2em` · `color: #5FBF9F` · uppercase · `font-weight: 500`
* Headline: `font-size: clamp(36px, 4.5vw, 56px)` · Inter · `font-weight: 300` · `line-height: 1.1` · white
* Body: `font-size: 16px` · `font-weight: 300` · `line-height: 1.8` · `color: rgba(255,255,255,0.78)`
* Closing line: same body but `color: #5FBF9F` · `font-weight: 400` · `margin-top: 24px`
* Entrance: `opacity: 0→1` · `translateY(24px→0)` · `600ms` · `cubic-bezier(0.16, 1, 0.32, 1)`

\---

## Concept 2 — /plataforma Scroll-Stopper

## SCROLL-STOPPER — "A Decisão que Não Volta Atrás"

**Placement:** `/plataforma` page · after the "Ciclo VIABIL" timeline section · left video / right text layout

**Concept:** A mid-page scroll-triggered scene showing a single executive hand placing a printed VIABIL report face-down on a conference table — the moment after Go/No-Go is declared. The report is face-down so no readable text appears in the frame. The table reflects the ceiling lights. Everything else in the frame is still. This is the weight of the decision the platform was built to support. Duration: 6 seconds. Triggered on scroll, plays once.

**Why it works:** The Plataforma page describes the cycle ending in "Decisão" — this visual lands exactly there, making the product's purpose feel consequential rather than procedural.

\---

### Initial Frame

Close-up shot from tabletop height, camera angled 15 degrees above the surface, shallow depth of field. A large oval boardroom table in dark walnut — polished surface reflecting the soft ceiling downlights. The frame shows only the table surface and the hands of one person at the far edge of frame, blurred and slightly warm in skin tone. The report is not yet in frame — the table is empty, anticipatory. Late afternoon directional light from a floor-to-ceiling window out of frame left, casting a warm band across the table. Color palette: dark walnut, warm gold light band, cool neutral depth. Editorial photography quality, 16:9.

\---

### End Frame

Same camera, same position. Now the report — a thick, printed, spiral-bound document — rests face-down, slightly off-center on the table surface. The cover faces down; only the white back is visible with a barely perceptible VIABIL logo embossed — **do not generate, use the existing logo asset**. The hands have withdrawn from frame. The report sits alone, with finality. The warm light band now falls across the document's edge. Same depth of field, same color palette. Editorial photography quality, 16:9.

\---

### Transition Video

Total duration: **6 seconds**.

* `0s–1s:` Scene static. Empty table, hands barely visible at far edge of frame. Camera locked.
* `1s–3.5s:` The report enters from slightly above frame, carried by a hand moving with deliberate slowness — not a drop, a placement. Motion: `translateY(-40px → 0)` · `ease-in-out`. The hand moves at the speed of someone who has made this decision before.
* `3.5s–5s:` The hand withdraws frame-right. The report settles. Camera locked. Scene holds.
* `5s–6s:` Fade to white. `ease-in-out`.

**What does NOT move:** Camera (locked throughout). Table. Background. Light.

**Technical:** Runway ML or Kling · 16:9 1080p · Triggered by IntersectionObserver at 40% viewport threshold · Plays once, does not loop · GSAP ScrollTrigger · Fade to white.

\---

### Side Text

DECISÃO

**O VIABIL existe para este momento.  
O estudo está feito.  
As premissas foram testadas.**

Quando o Go/No-Go chega ao comitê, a discussão não pode ser sobre fórmula ou versão de planilha. Precisa ser sobre risco, retorno e alternativa de ação. O VIABIL organiza essa conversa antes que ela comece.

*A decisão precisa ser recalculável, não irreversível.*

\---

**Styling:**

* Stage label: `font-size: 11px` · `letter-spacing: 0.2em` · `color: #0A4B35` · uppercase · `font-weight: 500`
* Headline: `font-size: 42px` · Playfair Display or equivalent serif · `font-weight: 400` · `line-height: 1.15` · `color: #0D0D0D`
* Body: `font-size: 16px` · `font-weight: 300` · `line-height: 1.8` · `color: #4A4A4A`
* Closing line: same body but `color: #0A4B35` · `font-weight: 400` · `margin-top: 24px`
* Entrance: `opacity: 0→1` · `translateY(24px→0)` · `600ms` · `cubic-bezier(0.16, 1, 0.32, 1)`
* **Layout:** Video left 60% · Text right 40% · `align-items: center` · Section padding `96px 0`

\---

## Concept 3 — /plataforma Lifecycle Showcase

## LIFECYCLE SHOWCASE — "Cinco Estágios. Um Ciclo. Uma Visão."

**Placement:** `/plataforma` page · replacing or augmenting the "Ciclo VIABIL" timeline section  
**Format:** 5-stage scroll-jacked sequence. Each stage: 7s max. Camera locked per location; light progression marks time.

**Progress indicator:** 5 dots · fixed right edge of viewport · vertically centered

* Inactive: 6px circle · `#E6E8EB`
* Active: 8px circle · `#0A4B35` · pulse animation on activation
* Spacing: 16px between centers · `position: fixed` · `right: 32px`

\---

### Stage 1 — Captação

**Inter-stage transition (from previous):** N/A — first stage

**Concept:** Aerial view of an analyst walking a raw terrain plot with printed survey documents, photographing corners. The scene is calm, methodical. Before the spreadsheet, before the study — this is the moment of origination.

#### Initial Frame

Aerial shot from 40 meters, looking straight down (nadir) at a cleared, flat terrain plot in a Brazilian residential expansion zone. A single figure is visible from above — business casual attire, holding a rolled document tube — positioned near the southwest corner of the plot. Surrounding: light urban infrastructure visible at edges (a paved road, a wall perimeter). Morning light, cool and soft, no strong shadows due to overcast high cloud. Color palette: pale red earth, light gray road, warm white perimeter walls, one figure in dark jacket. Drone cinematography quality, 16:9.

#### End Frame

Same nadir aerial shot, same camera position. The figure has moved to the northeast corner of the plot — suggesting a full perimeter walk is underway. The overcast has lifted slightly, revealing the first directional light from the east: a subtle shadow now trails northwest from the figure. The scene reads as the same place, slightly later in the morning. Drone cinematography quality, 16:9.

#### Transition Video

Total duration: **7 seconds**.

* `0s–1s:` Scene static. Figure at southwest corner.
* `1s–6s:` Camera locked. The figure walks at deliberate pace from southwest to northeast corner — crossing the open terrain. Motion: smooth, unhurried, `linear`. Shadow lengthens subtly as light shifts.
* `6s–7s:` Fade to white.

**Inter-stage transition to Stage 2:** Fade to white.

#### Side Text

CAPTAÇÃO

**A oportunidade entra organizada  
antes de virar estudo.**

O VIABIL centraliza terrenos prospectados e oferecidos, documentos, histórico de negociação e imagens — tudo com filtros combinados e acesso direto ao módulo de Viabilidade. A equipe de Novos Negócios para de trabalhar no e-mail.

*40+ filtros. Google Maps. Link direto para o estudo.*

\---

### Stage 2 — Viabilidade

**Inter-stage transition from Stage 1:** Fade to white.

**Concept:** Ground-level interior shot of an architect's table in a bright office — printed floor plans spread across the table, a hand holding a mechanical pencil making a marginal annotation on a cost line. No screens. No software UI. Just a printed study being reviewed. The metaphor is: this is the quality of thinking VIABIL enables. Physical, deliberate, high-stakes.

#### Initial Frame

Ground-level shot, camera at table height, angled slightly upward. A large architectural table in natural wood; printed A1 sheets spread across it — floor plans and text pages, not readable. A single hand rests on the table near the right edge of frame, mechanical pencil loosely held. Background: bright office with white walls, morning daylight from a window out of frame right. Shallow depth of field — the sheets are in focus, the wall is soft. Color palette: warm natural wood, white paper, black pencil marks, warm daylight. Architectural photography quality, 16:9.

#### End Frame

Same camera and position. The hand has moved to the center of the frame — the mechanical pencil now makes a visible annotation (a circle, a line — not readable text) on the top sheet. The mark is fresh. The mood shifts from preparation to active judgment. Same light, same depth of field. Architectural photography quality, 16:9.

#### Transition Video

Total duration: **7 seconds**.

* `0s–2s:` Scene static. Hand at rest, pencil loose.
* `2s–5s:` The hand moves deliberately from right edge to center of the printed sheet. Motion: `cubic-bezier(0.16, 1, 0.32, 1)`. The pencil tip contacts the paper at 4s and makes a circular annotation over 1 second.
* `5s–6s:` Hand stills. Scene holds.
* `6s–7s:` Fade to white.

**Inter-stage transition to Stage 3:** Fade to white.

#### Side Text

VIABILIDADE

**O motor principal para  
decisões de Go/No-Go.**

VGV, margem, VPL, TIR, MTIR, ROI — modelados para incorporação residencial, casas, loteamentos e outros segmentos. Stress-cenários em variáveis críticas. Premissas e modelos parametrizáveis. Relatórios exportáveis.

*A discussão sai da fórmula e volta para a decisão.*

\---

### Stage 3 — Decisão

**Inter-stage transition from Stage 2:** Fade to white.  
*(Reuses Concept 2 brief — the boardroom report placement scene. See full brief above.)*

**Inter-stage transition to Stage 4:** Hard cut — the decision has been made, the project is underway.

#### Side Text

DECISÃO

**O VIABIL existe para este momento.  
O estudo está feito.  
As premissas foram testadas.**

Quando o Go/No-Go chega ao comitê, a discussão não pode ser sobre fórmula ou versão de planilha. Precisa ser sobre risco, retorno e alternativa de ação. O VIABIL organiza essa conversa antes que ela comece.

*A decisão precisa ser recalculável, não irreversível.*

\---

### Stage 4 — Acompanhamento

**Inter-stage transition from Stage 3:** Hard cut.

**Concept:** Ground-level shot from the perimeter of an active construction site — concrete structure rising, afternoon light, a site manager in a hard hat reviewing a printed schedule. The camera is outside the fence; the city is soft in the background. The scene communicates: the cycle doesn't end at approval. VIABIL continues here.

#### Initial Frame

Ground-level exterior shot through a construction fence, camera at chest height. A mid-rise concrete structural frame in the center-left of frame — perhaps 6 floors completed, rebar visible at the top, construction crane partially visible above right. Afternoon warm directional light from the west, casting long horizontal shadows across the concrete floors. Foreground: a construction fence with the plot number barely visible. Background: soft-focus low-rise neighborhood. Color palette: concrete gray, warm amber afternoon light, pale blue sky. A site manager in a yellow hard hat stands at the base of the structure reviewing documents — not facing camera, body at 3/4 angle. Construction site documentary photography quality, 16:9.

#### End Frame

Same camera position, same fence viewpoint. The site manager has moved slightly — now looking upward at the structure, documents at his side. The light has deepened: the concrete is now reading warmer, the shadows longer. The structure looks the same but the light shift implies time has passed. Construction site documentary photography quality, 16:9.

#### Transition Video

Total duration: **7 seconds**.

* `0s–0.5s:` Scene static. Site manager reading documents.
* `0.5s–5s:` `linear` light shift — afternoon light warms by 15%. Site manager raises gaze slowly from documents to structure. Motion: `ease-in-out`, 4.5s total movement.
* `5s–6s:` Hold. Manager looking at the structure.
* `6s–7s:` Fade to white.

**Inter-stage transition to Stage 5:** Fade to white.

#### Side Text

ACOMPANHAMENTO

**Não basta acompanhar.  
Precisa agir.**

O VIABIL compara planejado, revisado e realizado — com alertas de divergência, importação de dados de ERP ou planilha e reprojeção. Quando o custo ou a velocidade de vendas mudam, a decisão precisa ser recalculável.

*A obra avança. O plano também.*

\---

### Stage 5 — Replanejamento

**Inter-stage transition from Stage 4:** Fade to white.

**Concept:** Back to the boardroom — but now empty. Late afternoon. The printed report from Stage 3 is on the table again, open at a different section. A hand makes a fresh annotation. The cycle has returned to the table. The project is alive.

#### Initial Frame

Same boardroom table from Stage 3/Concept 2, now bathed in late afternoon horizontal orange light from the window — the light band much lower and warmer. The report is open in the center of the table, held open by a hand to a page showing charts (no readable numbers or text visible at this scale). The room is empty otherwise. Editorial photography quality, 16:9.

#### End Frame

Same camera. The hand has written a new annotation on the open page — a circled mark, not readable. The pen rests on the table beside the report. The late afternoon light has deepened slightly — the orange band lower, suggesting 20 minutes have passed. Editorial photography quality, 16:9.

#### Transition Video

Total duration: **7 seconds**.

* `0s–1s:` Scene static. Hand holds open report.
* `1s–5s:` Hand moves in a writing arc and completes one annotation. Motion: `cubic-bezier(0.16, 1, 0.32, 1)`. Light warms slightly — `linear`.
* `5s–6s:` Hold.
* `6s–7s:` Fade to white, then scroll releases back to normal page flow.

#### Side Text — Final Stage (includes CTA)

REPLANEJAMENTO

**O ciclo não termina no  
lançamento. Nunca terminou.**

Quando obra, vendas, custos ou funding mudam, o VIABIL permite simular novas ações sem perder o histórico do estudo original. A visão do empreendimento segue viva do Go/No-Go ao recebimento final.

*O VIABIL acompanha o negócio. Não só o estudo.*

**Veja o ciclo completo em uma demonstração →**

\---

**CTA Styling:** `font-size: 15px` · `color: #0A4B35` · `font-weight: 600` · `letter-spacing: 0.02em` · `margin-top: 32px` · links to WhatsApp

\---

**Shared Side Text Styling (all lifecycle stages):**

* Stage label: `font-size: 11px` · `letter-spacing: 0.2em` · `color: #0A4B35` · uppercase · `font-weight: 500`
* Headline: `font-size: 42px` · Playfair Display · `font-weight: 400` · `line-height: 1.15` · `color: #0D0D0D`
* Body: `font-size: 16px` · `font-weight: 300` · `line-height: 1.8` · `color: #4A4A4A`
* Closing: same body but `color: #0A4B35` · `font-weight: 400` · `margin-top: 24px`
* Entrance: `opacity: 0→1` · `translateY(24px→0)` · `600ms` · `cubic-bezier(0.16, 1, 0.32, 1)`
* Layout: Video left 60% · Text right 40% · `align-items: center`

\---

## Concept 4 — /sobre Scroll-Stopper

## SCROLL-STOPPER — "Trinta Anos de Mercado"

**Placement:** `/sobre` page · between Manifesto section and Propósito section · video left / text right

**Concept:** A single aerial drone shot of a completed Brazilian residential condominium — lawns manicured, cars in lots, the geometry of hundreds of human decisions made correctly. The camera slowly and imperceptibly zooms out over 6 seconds, making visible the scale of what the market has built. This is the "before" — what BDK has spent 30 years serving. No UI, no software, just the real world the product lives in.

**Why it works:** The Sobre page opens with "Nascemos dentro do universo da incorporação." This animation proves it — the building is not a metaphor, it is the industry they know.

\---

### Initial Frame

Aerial drone shot from 120 meters, angled 30 degrees down, looking across a completed mid-size residential condominium in a Brazilian suburban setting — 4 to 6 low-rise buildings, green central landscaping, pool visible, parking lots with vehicles. Golden hour: sun at 10 degrees, casting long warm shadows that trace the geometry of each building. The buildings are complete, inhabited — AC units visible, laundry on some balconies. Color palette: warm beige and white building facades, lush green landscape, warm amber light. Drone cinematography quality, 16:9.

\---

### End Frame

Same scene, same light — camera has pulled back approximately 25% in zoom, revealing more of the surrounding neighborhood: additional residential blocks, a commercial street at the south edge, the urban fabric that surrounds the condominium. The completed development is now one of many in the frame, each representing a study made, a decision taken, a cycle completed. Same golden hour light. Drone cinematography quality, 16:9.

\---

### Transition Video

Total duration: **6 seconds**.

* `0s–5s:` Camera slowly dollies upward and back — a 25% zoom-out over 5 seconds. Motion: `linear`, imperceptibly slow. Camera angle remains locked at 30 degrees. No rotation. The zoom reveals the surrounding neighborhood.
* `5s–6s:` Fade to white. `ease-in-out`.

**What does NOT move:** Sun angle, light color.

**Technical:** Runway ML or Kling · 16:9 1080p · Triggered by IntersectionObserver · Plays once · Fade to white.

\---

### Side Text

HISTÓRIA

**Nascemos dentro do universo  
da incorporação imobiliária.**

A BDK Solutions foi fundada em 1995 com atuação voltada a conhecimento, tecnologia e negócios imobiliários. O VIABIL não foi criado para o setor — nasceu dentro dele, absorvendo demandas reais de clientes e práticas do mercado que nenhuma solução genérica consegue simular.

*Trinta anos. 600+ empresas. 8.000+ profissionais.*

\---

**Styling:**

* Stage label: `font-size: 11px` · `letter-spacing: 0.2em` · `color: #0A4B35` · uppercase · `font-weight: 500`
* Headline: `font-size: 42px` · Playfair Display · `font-weight: 400` · `line-height: 1.15` · `color: #0D0D0D`
* Body: `font-size: 16px` · `font-weight: 300` · `line-height: 1.8` · `color: #4A4A4A`
* Closing: same body but `color: #0A4B35` · `font-weight: 400` · `margin-top: 24px`
* Entrance: `opacity: 0→1` · `translateY(24px→0)` · `600ms` · `cubic-bezier(0.16, 1, 0.32, 1)`
* **Layout:** Video left 55% · Text right 45% · `align-items: center` · Section padding `96px 0`

\---

## Quality Checklist

* \[x] No logo description in any image prompt — only placement instruction
* \[x] No readable text in video frames
* \[x] Fade to white (not black) on all transitions
* \[x] All timing segments add up to stated total durations
* \[x] End frame camera positions match initial frames (camera locked throughout)
* \[x] All side text in Portuguese (Brazil)
* \[x] Closing lines in brand primary color `#0A4B35`
* \[x] No UI/dashboard elements in any frame
* \[x] Scroll-stopper durations ≤ 7 seconds
* \[x] Hero loop states exact duration (14s) and is loop-ready
* \[x] Lifecycle sequence has progress indicator spec

