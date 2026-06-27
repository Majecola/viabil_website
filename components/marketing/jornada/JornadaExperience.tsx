"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Jornada.module.css";

/* ───────────────────────── stage copy ───────────────────────── */

const STAGES = [
  {
    tag: "Originação e landbank",
    title: "Gestão de Terrenos",
    desc: "A oportunidade entra organizada. Terrenos oferecidos e prospectados chegam com documentos, dados urbanísticos e histórico de negociação centralizados — e mais de 40 filtros combinados encontram o terreno certo antes da concorrência.",
  },
  {
    tag: "Simulação financeira",
    title: "Viabilidade",
    desc: "O motor do Go/No-Go. O estudo projeta fluxo de caixa, VGV, margem, VPL, TIR e exposição de caixa, com cenários de stress nas variáveis críticas. A decisão sai com números, não com intuição.",
  },
  {
    tag: "Execução conectada",
    title: "Acompanhamento",
    desc: "O estudo aprovado vira referência viva. Dados do ERP ou de planilhas entram no VIABIL e a obra passa a ser acompanhada com a mesma linguagem financeira usada na aprovação.",
  },
  {
    tag: "Controle e reação",
    title: "Previsto x Realizado",
    desc: "Planejado, revisado e realizado lado a lado. Alertas apontam divergências no momento em que aparecem e o wizard de reprojeção recalcula o caminho para buscar as metas definidas no estudo.",
  },
  {
    tag: "Visão de portfólio",
    title: "Consolidação de Resultados",
    desc: "Fluxos e indicadores de todos os projetos consolidados em uma única visão executiva: necessidade de aporte no tempo, ranking de oportunidades e a base da próxima decisão de alocação de capital.",
  },
];

/* ───────────────────────── palette ───────────────────────── */

const COL = {
  bg: 0xf2f7f4,
  ground: 0xe9f0ea,
  clay: 0xf4f8f5,
  clayDim: 0xe6eee8,
  green: 0x0a4b35,
  greenMid: 0x13885e,
  greenLight: 0x5fbf9f,
  blue: 0x1e3a8a,
  orange: 0xff7a00,
  trunk: 0xb9c4bd,
  tree: 0x9cccb4,
};

/* ───────────────────────── small helpers ───────────────────────── */

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
/** Ken Perlin's smootherstep — zero 1st & 2nd derivatives at the ends, for silky blends. */
const smootherstep = (t: number) => {
  const x = clamp01(t);
  return x * x * x * (x * (x * 6 - 15) + 10);
};
const easeOutBack = (t: number) => {
  const c1 = 1.4;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

/** Window-grid façade texture for buildings (transparent panes overlaid on clay). */
function facadeTexture() {
  const w = 64;
  const h = 64;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "rgba(36, 64, 53, 0.22)";
  const cols = 4;
  const rows = 4;
  const pad = 7;
  const gap = 5;
  const cw = (w - pad * 2 - gap * (cols - 1)) / cols;
  const ch = (h - pad * 2 - gap * (rows - 1)) / rows;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      ctx.fillRect(pad + i * (cw + gap), pad + j * (ch + gap), cw, ch);
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

/** Glass-clad building material: clay base with a window façade map. */
function facadeMat(tex: THREE.Texture, color: number, repeatX: number, repeatY: number) {
  const map = tex.clone();
  map.needsUpdate = true;
  map.wrapS = map.wrapT = THREE.RepeatWrapping;
  map.repeat.set(repeatX, repeatY);
  return new THREE.MeshStandardMaterial({ color, roughness: 0.86, metalness: 0.04, map });
}

/** A few rooftop props (parapet rim + AC boxes) added on top of a building. */
function addRooftop(g: THREE.Group, x: number, z: number, w: number, d: number, top: number, delay: number) {
  const rim = box(w + 0.2, 0.4, d + 0.2, clay(COL.clayDim), x, z, top, delay);
  rim.castShadow = false;
  g.add(rim);
  const acMat = clay(0xc4cfc8);
  g.add(box(1.1, 0.7, 1.4, acMat, x - w * 0.22, z - d * 0.18, top + 0.4, delay + 0.02));
  g.add(box(0.8, 0.5, 0.8, acMat, x + w * 0.2, z + d * 0.2, top + 0.4, delay + 0.03));
}

type RevealMode = "pop" | "grow";

function clay(color: number, opts: { emissive?: number; emissiveIntensity?: number; opacity?: number } = {}) {
  const mat = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.92,
    metalness: 0,
  });
  if (opts.emissive !== undefined) {
    mat.emissive = new THREE.Color(opts.emissive);
    mat.emissiveIntensity = opts.emissiveIntensity ?? 1;
  }
  if (opts.opacity !== undefined) {
    mat.transparent = true;
    mat.opacity = opts.opacity;
  }
  return mat;
}

function tagReveal(obj: THREE.Object3D, delay: number, mode: RevealMode) {
  obj.userData.rv = { delay, mode, sx: obj.scale.x, sy: obj.scale.y, sz: obj.scale.z };
}

/** Box mesh with its origin at the bottom face (so y-scaling grows upward). */
function box(
  w: number, h: number, d: number,
  mat: THREE.Material,
  x = 0, z = 0, y = 0,
  delay = 0, mode: RevealMode = "pop",
) {
  const geo = new THREE.BoxGeometry(w, h, d);
  geo.translate(0, h / 2, 0);
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  tagReveal(m, delay, mode);
  return m;
}

function applyReveal(group: THREE.Group, t: number) {
  group.visible = t > 0.001;
  if (!group.visible) return;
  group.traverse((o) => {
    const rv = o.userData.rv;
    if (!rv) return;
    const lt = clamp01((t - rv.delay) / Math.max(0.0001, 1 - rv.delay));
    if (rv.mode === "grow") {
      o.scale.set(rv.sx, Math.max(0.0001, rv.sy * easeOutCubic(lt)), rv.sz);
    } else {
      const s = Math.max(0.0001, easeOutBack(lt));
      o.scale.set(rv.sx * s, rv.sy * s, rv.sz * s);
    }
  });
}

function radialGlowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(190,255,228,0.5)");
  g.addColorStop(1, "rgba(150,240,205,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

/** Floor grid tile: faint cell lines with a brighter dot at the intersection.
 *  Repeated across the whole floor as the vectr-style background grid (always visible). */
function gridFloorTexture() {
  const s = 128;
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const ctx = c.getContext("2d")!;
  // cell border lines on the top + left edges so tiling forms a continuous grid
  ctx.strokeStyle = "rgba(70, 112, 94, 0.38)";
  ctx.lineWidth = 2.6;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(s, 0);
  ctx.moveTo(0, 0);
  ctx.lineTo(0, s);
  ctx.stroke();
  // brighter dot at the intersection (matches the hover dot language)
  ctx.fillStyle = "rgba(70, 112, 94, 0.7)";
  ctx.beginPath();
  ctx.arc(0, 0, 4.2, 0, Math.PI * 2);
  ctx.fill();
  return new THREE.CanvasTexture(c);
}

/** Halftone dot field with radial falloff — the glow "stain" under the beam head. */
function dotFieldTexture() {
  const size = 256;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  const n = 13;
  const step = size / n;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const x = (i + 0.5) * step;
      const y = (j + 0.5) * step;
      const d = Math.hypot(x - size / 2, y - size / 2) / (size / 2);
      const fall = Math.max(0, 1 - d);
      if (fall <= 0.02) continue;
      ctx.fillStyle = `rgba(125, 226, 185, ${(fall * fall * 0.9).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(x, y, 2.4 + fall * 3.4, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  return new THREE.CanvasTexture(c);
}

function cylinderBetween(a: THREE.Vector3, b: THREE.Vector3, r: number, mat: THREE.Material) {
  const dir = b.clone().sub(a);
  const len = dir.length();
  const geo = new THREE.CylinderGeometry(r, r, len, 6);
  const m = new THREE.Mesh(geo, mat);
  m.position.copy(a).addScaledVector(dir, 0.5);
  m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
  return m;
}

/* ───────────────────────── district builders ───────────────────────── */

function buildTerrenos() {
  const g = new THREE.Group();
  const plotA = clay(COL.clay);
  const plotB = clay(COL.clayDim);
  const highlights = new Set([6, 12, 17]);
  let idx = 0;
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 4; j++) {
      const x = (i - 2) * 7.6;
      const z = (j - 1.5) * 7.6;
      const plot = box(6.6, 0.5 + ((i * 7 + j * 3) % 4) * 0.1, 6.6, (i + j) % 2 ? plotA : plotB, x, z, 0, (idx % 9) * 0.03, "pop");
      g.add(plot);
      if (highlights.has(idx)) {
        const glow = box(6.6, 0.14, 6.6, clay(COL.greenLight, { emissive: COL.greenLight, emissiveIntensity: 1.5 }), x, z, 0.62, 0.3 + idx * 0.01, "pop");
        glow.castShadow = false;
        g.add(glow);
        const pinMat = clay(COL.greenMid, { emissive: COL.greenMid, emissiveIntensity: 0.5 });
        const cone = new THREE.Mesh(new THREE.ConeGeometry(0.75, 1.7, 12), pinMat);
        cone.rotation.x = Math.PI;
        cone.position.set(x, 3.4, z);
        const ball = new THREE.Mesh(new THREE.SphereGeometry(0.65, 14, 12), pinMat);
        ball.position.set(x, 4.45, z);
        const pin = new THREE.Group();
        pin.add(cone, ball);
        pin.position.set(0, 0, 0);
        tagReveal(pin, 0.45 + (idx % 5) * 0.04, "pop");
        g.add(pin);
      }
      idx++;
    }
  }
  // small sales office at the corner
  g.add(box(4.2, 2.6, 4.2, clay(COL.clay), -19, -16, 0, 0.2));
  g.add(box(2.6, 1.4, 2.6, clay(COL.clayDim), -19, -16, 2.6, 0.3));
  // trees
  const trunkMat = clay(COL.trunk);
  const crownMat = clay(COL.tree);
  const treeSpots: Array<[number, number]> = [[-20, 9], [-15, -12], [19, -14], [21, 4], [14, 8], [-22, -4], [20, 12], [8, -14]];
  treeSpots.forEach(([x, z], i) => {
    const tree = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.24, 1, 6), trunkMat);
    trunk.position.y = 0.5;
    trunk.castShadow = true;
    const crown = new THREE.Mesh(new THREE.IcosahedronGeometry(0.95, 0), crownMat);
    crown.position.y = 1.6;
    crown.castShadow = true;
    tree.add(trunk, crown);
    tree.position.set(x, 0, z);
    tagReveal(tree, 0.25 + i * 0.05, "pop");
    g.add(tree);
  });
  return g;
}

function buildViabilidade() {
  const g = new THREE.Group();
  // the "study": a wireframe ghost of the future tower rises first…
  const ghostGeo = new THREE.BoxGeometry(9.2, 14.6, 9.2);
  ghostGeo.translate(0, 7.3, 0);
  const ghost = new THREE.LineSegments(
    new THREE.EdgesGeometry(ghostGeo),
    new THREE.LineBasicMaterial({ color: COL.greenLight, transparent: true, opacity: 0.6 }),
  );
  tagReveal(ghost, 0.03, "grow");
  g.add(ghost);
  const lot = box(13, 0.3, 13, clay(COL.clayDim), 0, 0, 0, 0.01);
  g.add(lot);
  // …then the simulated floors materialize inside it, bottom-up
  const floorMat = facadeMat(facadeTexture(), COL.clay, 2, 1);
  const bandMat = clay(COL.greenLight, { emissive: COL.greenLight, emissiveIntensity: 0.4 });
  for (let i = 0; i < 7; i++) {
    g.add(box(8.6, 1.7, 8.6, floorMat, 0, 0, 0.3 + i * 2.0, 0.24 + i * 0.08));
    if (i < 6) {
      const band = box(8.75, 0.18, 8.75, bandMat, 0, 0, 0.3 + i * 2.0 + 1.74, 0.26 + i * 0.08);
      band.castShadow = false;
      g.add(band);
    }
  }
  g.add(box(5.2, 1.0, 5.2, clay(COL.clayDim), 0, 0, 14.4, 0.84));
  // KPI chart (VGV, margem, VPL, TIR, ROI) on a podium in front of the tower
  g.add(box(17.8, 0.5, 4.8, clay(COL.clayDim), 0, 10.8, 0, 0.34));
  const heights = [3.4, 5.6, 4.4, 7.2, 6.0];
  heights.forEach((h, i) => {
    const matBar = i % 2
      ? clay(COL.blue, { emissive: COL.blue, emissiveIntensity: 0.35 })
      : clay(COL.greenMid, { emissive: COL.greenMid, emissiveIntensity: 0.45 });
    g.add(box(1.7, h, 1.7, matBar, -6.2 + i * 3.1, 10.8, 0.5, 0.46 + i * 0.07, "grow"));
  });
  return g;
}

function buildAcompanhamento() {
  const g = new THREE.Group();
  // completed lower floors
  const floorMat = facadeMat(facadeTexture(), COL.clay, 2, 1);
  for (let i = 0; i < 3; i++) {
    g.add(box(8.4, 1.7, 8.4, floorMat, 0, 0, i * 2.0, 0.06 + i * 0.08));
  }
  // planned floors: wireframe shells that the obra fills in as the stage advances
  const wireMat = new THREE.LineBasicMaterial({ color: 0x6fae93, transparent: true, opacity: 0.85 });
  const solidFloors: THREE.Mesh[] = [];
  for (let i = 3; i < 7; i++) {
    const geo = new THREE.BoxGeometry(8.4, 1.7, 8.4);
    geo.translate(0, 0.85, 0);
    const wire = new THREE.LineSegments(new THREE.EdgesGeometry(geo), wireMat);
    wire.position.set(0, i * 2.0, 0);
    tagReveal(wire, 0.3 + (i - 3) * 0.07, "pop");
    g.add(wire);
    const solid = box(8.2, 1.62, 8.2, floorMat, 0, 0, i * 2.0 + 0.04);
    delete solid.userData.rv; // driven by construction progress, not by reveal
    solid.scale.y = 0.0001;
    solid.visible = false;
    solidFloors.push(solid);
    g.add(solid);
  }
  g.userData.solidFloors = solidFloors;
  // progress gauge beside the building
  g.add(box(1.2, 9.4, 1.2, clay(COL.clayDim), -7.6, 7.4, 0, 0.4));
  const gaugeFill = box(0.85, 9.0, 0.85, clay(COL.greenMid, { emissive: COL.greenMid, emissiveIntensity: 0.8 }), -7.6, 7.4, 0.2);
  delete gaugeFill.userData.rv;
  gaugeFill.scale.y = 0.0001;
  gaugeFill.visible = false;
  gaugeFill.castShadow = false;
  g.userData.gaugeFill = gaugeFill;
  g.add(gaugeFill);
  // tower crane in brand orange
  const craneMat = clay(COL.orange, { emissive: COL.orange, emissiveIntensity: 0.28 });
  const crane = new THREE.Group();
  crane.add(box(1.6, 1.1, 1.6, craneMat, 0, 0, 0, 0));
  crane.add(box(0.8, 15.5, 0.8, craneMat, 0, 0, 0, 0, "grow"));
  const jib = new THREE.Group();
  const arm = box(11, 0.55, 0.7, craneMat, 4.2, 0, 0, 0);
  const counter = box(3.6, 0.55, 0.7, craneMat, -2.6, 0, 0, 0);
  const cableMat = clay(0x4a4a4a);
  const cable = cylinderBetween(new THREE.Vector3(9, 0, 0), new THREE.Vector3(9, -6.4, 0), 0.06, cableMat);
  const hook = box(0.8, 0.8, 0.8, clay(COL.clayDim), 9, 0, -7.2, 0);
  jib.add(arm, counter, cable, hook);
  jib.position.y = 15.7;
  crane.add(jib);
  crane.position.set(8.4, 0, 6.4);
  tagReveal(crane, 0.5, "pop");
  crane.userData.jib = jib;
  g.add(crane);
  // material stacks
  const stackMat = clay(COL.clayDim);
  [[-9, 8], [-11, 4], [9, -7]].forEach(([x, z], i) => {
    g.add(box(2.4, 1.0, 2.4, stackMat, x, z, 0, 0.55 + i * 0.06));
    g.add(box(1.9, 0.9, 1.9, stackMat, x, z, 1.0, 0.62 + i * 0.06));
  });
  return g;
}

function buildPrevistoRealizado() {
  const g = new THREE.Group();
  g.add(box(30, 0.45, 13, clay(COL.clayDim), 0, 0, 0, 0.02));
  const ghostMat = clay(COL.greenLight, { opacity: 0.52, emissive: COL.greenLight, emissiveIntensity: 0.18 });
  const realMat = clay(COL.greenMid, { emissive: COL.greenMid, emissiveIntensity: 0.5 });
  const alertMat = clay(COL.orange, { emissive: COL.orange, emissiveIntensity: 0.9 });
  // pairs: [previsto, realizado] — pair index 3 diverges (realizado below plan)
  const pairs: Array<[number, number]> = [[4.2, 4.6], [5.4, 5.8], [6.2, 6.2], [7.0, 4.6], [6.6, 7.4], [5.0, 5.6]];
  pairs.forEach(([prev, real], i) => {
    const x = -12.4 + i * 4.9;
    g.add(box(1.8, prev, 1.8, ghostMat, x - 0.5, -1.6, 0.45, 0.1 + i * 0.06));
    const realBar = box(1.8, real, 1.8, real < prev ? alertMat : realMat, x + 1.5, -1.6, 0.45, 0.3 + i * 0.07, "grow");
    g.add(realBar);
    if (real < prev) {
      const alert = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.9),
        clay(COL.orange, { emissive: COL.orange, emissiveIntensity: 1.8 }),
      );
      alert.position.set(x + 1.5, prev + 3.0, -1.6);
      alert.castShadow = false;
      alert.userData.floater = { baseY: prev + 3.0, phase: i };
      tagReveal(alert, 0.72, "pop");
      g.add(alert);
    }
  });
  // meta line behind the bars (the "plano" reference)
  const meta = box(28, 0.1, 0.22, clay(COL.greenLight, { emissive: COL.greenLight, emissiveIntensity: 1.15 }), 0, -6.6, 4.6, 0.6);
  meta.castShadow = false;
  g.add(meta);
  return g;
}

function buildConsolidacao() {
  const g = new THREE.Group();

  // executive platform that holds the whole portfolio view
  g.add(box(46, 0.5, 30, clay(COL.clayDim), 8, 0, 0, 0.02));

  // ── the portfolio: a row of glass project towers of varying heights ──
  const fac = facadeTexture();
  const projects: Array<{ capMat: THREE.MeshStandardMaterial; top: THREE.Vector3 }> = [];
  const resultTiles: Array<{ mat: THREE.MeshStandardMaterial; mesh: THREE.Mesh; value: number }> = [];
  const projZ = 2;
  const projHeights = [5, 6, 7.5, 6.5, 9, 8];
  projHeights.forEach((h, i) => {
    const x = -15 + i * 4.6;
    const bodyMat = facadeMat(fac, COL.clay, 2, Math.max(2, Math.round(h / 2.4)));
    g.add(box(3.2, h, 3.2, bodyMat, x, projZ, 0, 0.06 + i * 0.05));
    addRooftop(g, x, projZ, 3.2, 3.2, h, 0.2 + i * 0.05);
    const capMat = clay(COL.greenMid, { emissive: COL.greenMid, emissiveIntensity: 0 });
    const cap = box(3.4, 0.4, 3.4, capMat, x, projZ, h + 0.4, 0.16 + i * 0.05);
    cap.castShadow = false;
    projects.push({ capMat, top: new THREE.Vector3(x, h + 0.85, projZ) });
    // flat result tile in front of the tower — the dashboard cell read from the top view
    const tileMat = clay(COL.greenLight, { emissive: COL.greenLight, emissiveIntensity: 0, opacity: 0.96 });
    const tile = box(3.8, 0.2, 3.8, tileMat, x, projZ + 6.6, 0.55, 0);
    delete tile.userData.rv;
    tile.castShadow = false;
    tile.visible = false;
    resultTiles.push({ mat: tileMat, mesh: tile, value: (h - 4.5) / 5 });
    g.add(tile);
  });

  // ── the single consolidated pillar (the executive view), at the end of the row ──
  const consX = 22;
  const consZ = projZ;
  g.add(box(9, 1.1, 9, clay(COL.clayDim), consX, consZ, 0, 0.3));
  const consMat = clay(COL.green, { emissive: COL.greenMid, emissiveIntensity: 0.25 });
  const consPillar = box(6, 16, 6, consMat, consX, consZ, 1.1, 0);
  delete consPillar.userData.rv; // driven by consolidation progress, not the reveal
  consPillar.scale.y = 0.0001;
  consPillar.visible = false;
  g.add(consPillar);

  // glowing crown ring on top — the "resultado consolidado" indicator
  const crownMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(COL.greenLight).multiplyScalar(1.4),
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const crown = new THREE.Mesh(new THREE.TorusGeometry(4.2, 0.32, 10, 40), crownMat);
  crown.rotation.x = Math.PI / 2;
  crown.position.set(consX, 17.4, consZ);
  g.add(crown);

  // ── light streams: each project feeds its result into the pillar ──
  const streamTarget = new THREE.Vector3(consX, 13.5, consZ);
  const streams: Array<{ mat: THREE.MeshBasicMaterial }> = [];
  projects.forEach(({ top }) => {
    const streamMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(COL.greenLight).multiplyScalar(1.5),
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    g.add(cylinderBetween(top.clone(), streamTarget.clone(), 0.13, streamMat));
    streams.push({ mat: streamMat });
  });

  // consolidated result tile in front of the pillar (the headline figure, top view)
  const consTileMat = clay(COL.greenMid, { emissive: COL.greenLight, emissiveIntensity: 0, opacity: 0.97 });
  const consTile = box(8.4, 0.22, 5.2, consTileMat, consX, consZ + 6.6, 0.55, 0);
  delete consTile.userData.rv;
  consTile.castShadow = false;
  consTile.visible = false;
  g.add(consTile);

  g.userData.cons = { projects, streams, consPillar, crownMat, crown, resultTiles, consTileMat, consTile };
  return g;
}

/* ───────────────────────── component ───────────────────────── */

export function JornadaExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLOListElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const railRefs = useRef<Array<HTMLElement | null>>([]);
  const [active, setActive] = useState(0);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setFallback(true);
      return;
    }
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    if (!canvas || !section || !viewport) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    } catch {
      setFallback(true);
      return;
    }
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));

    gsap.registerPlugin(ScrollTrigger);

    /* ── scene & lights ── */
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(COL.bg);
    scene.fog = new THREE.Fog(COL.bg, 95, 235);

    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 420);

    const hemi = new THREE.HemisphereLight(0xffffff, 0xd2e2d8, 1.15);
    scene.add(hemi);
    const sun = new THREE.DirectionalLight(0xffffff, 1.6);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.left = -60;
    sun.shadow.camera.right = 60;
    sun.shadow.camera.top = 60;
    sun.shadow.camera.bottom = -60;
    sun.shadow.camera.near = 10;
    sun.shadow.camera.far = 180;
    sun.shadow.bias = -0.0004;
    scene.add(sun, sun.target);

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(1500, 1000),
      new THREE.MeshStandardMaterial({ color: COL.ground, roughness: 1 }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.set(140, -0.05, 0);
    ground.receiveShadow = true;
    scene.add(ground);

    // vectr-style grid across the whole floor (always visible / unlit)
    const gridTex = gridFloorTexture();
    gridTex.wrapS = gridTex.wrapT = THREE.RepeatWrapping;
    gridTex.repeat.set(160, 107); // ~9.4-unit cells over the 1500×1000 floor
    gridTex.anisotropy = renderer.capabilities.getMaxAnisotropy();
    const gridOverlay = new THREE.Mesh(
      new THREE.PlaneGeometry(1500, 1000),
      new THREE.MeshBasicMaterial({ map: gridTex, transparent: true, opacity: 0.85, depthWrite: false }),
    );
    gridOverlay.rotation.x = -Math.PI / 2;
    gridOverlay.position.set(140, 0.02, 0);
    scene.add(gridOverlay);

    // hover glow that follows the pointer across the floor
    const hoverHalo = new THREE.Mesh(
      new THREE.PlaneGeometry(16, 16),
      new THREE.MeshBasicMaterial({
        map: dotFieldTexture(),
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        color: new THREE.Color(0.85, 1.1, 0.98),
      }),
    );
    hoverHalo.rotation.x = -Math.PI / 2;
    hoverHalo.position.y = 0.06;
    scene.add(hoverHalo);

    /* ── districts along the route ── */
    const anchors = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(70, 0, -26),
      new THREE.Vector3(140, 0, 18),
      new THREE.Vector3(210, 0, -22),
      new THREE.Vector3(280, 0, 4),
    ];
    const districts = [
      buildTerrenos(),
      buildViabilidade(),
      buildAcompanhamento(),
      buildPrevistoRealizado(),
      buildConsolidacao(),
    ];
    districts.forEach((d, i) => {
      d.position.copy(anchors[i]);
      scene.add(d);
    });
    const crane = districts[2].children.find((c) => c.userData.jib) as THREE.Group | undefined;
    const consolidacao = districts[4].userData.cons as {
      projects: Array<{ capMat: THREE.MeshStandardMaterial }>;
      streams: Array<{ mat: THREE.MeshBasicMaterial }>;
      consPillar: THREE.Mesh;
      crownMat: THREE.MeshBasicMaterial;
      crown: THREE.Mesh;
      resultTiles: Array<{ mat: THREE.MeshStandardMaterial; mesh: THREE.Mesh; value: number }>;
      consTileMat: THREE.MeshStandardMaterial;
      consTile: THREE.Mesh;
    };
    const floaters: THREE.Object3D[] = [];
    scene.traverse((o) => { if (o.userData.floater) floaters.push(o); });

    /* ── the glowing route — skirts the front of each district, never crossing it ── */
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-42, 6, 8),
      new THREE.Vector3(-20, 2.8, 13),
      new THREE.Vector3(0, 1.5, 16.5),
      new THREE.Vector3(34, 1.5, 6),
      new THREE.Vector3(70, 1.5, -10),
      new THREE.Vector3(104, 1.5, -14),
      new THREE.Vector3(122, 1.5, 6),
      new THREE.Vector3(140, 1.5, 31),
      new THREE.Vector3(162, 1.5, 32),
      new THREE.Vector3(186, 1.5, 8),
      new THREE.Vector3(210, 1.5, -12),
      new THREE.Vector3(240, 1.5, -8),
      new THREE.Vector3(262, 1.4, 14),
      new THREE.Vector3(280, 1.4, 25),
      new THREE.Vector3(294, 1.3, 27),
      new THREE.Vector3(304, 1.3, 29),
    ]);

    // arc-length param of each district anchor (sampled)
    const anchorU = anchors.map((a) => {
      let best = 0;
      let bestD = Infinity;
      for (let i = 0; i <= 800; i++) {
        const u = i / 800;
        const d = curve.getPointAt(u).distanceTo(new THREE.Vector3(a.x, 1.5, a.z));
        if (d < bestD) { bestD = d; best = u; }
      }
      return best;
    });
    const boundaries = [0, ...anchorU.slice(1).map((u, i) => (anchorU[i] + u) / 2), 1];

    const pathUniforms = {
      uProgress: { value: 0 },
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color(COL.orange) },
      uColorB: { value: new THREE.Color(COL.greenLight) },
      uColorC: { value: new THREE.Color(COL.greenMid) },
    };
    const pathVert = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;
    const pathMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: pathUniforms,
      vertexShader: pathVert,
      fragmentShader: `
        uniform float uProgress;
        uniform float uTime;
        uniform vec3 uColorA, uColorB, uColorC;
        varying vec2 vUv;
        void main() {
          if (vUv.x > uProgress) discard;
          float head = smoothstep(uProgress - 0.045, uProgress, vUv.x);
          // flowing energy: bright bands streaming toward the head
          float flow = sin(vUv.x * 58.0 - uTime * 6.5);
          flow = smoothstep(0.5, 1.0, flow) * (0.4 + 0.6 * smoothstep(0.0, uProgress, vUv.x));
          vec3 base = mix(uColorA, uColorB, smoothstep(0.02, 0.16, vUv.x));
          base = mix(base, uColorC, smoothstep(0.45, 0.95, vUv.x));
          vec3 col = base * (1.18 + head * 2.7 + flow * 0.9);
          gl_FragColor = vec4(col, 0.9 + flow * 0.1);
        }
      `,
    });
    const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 760, 0.44, 12, false), pathMat);
    scene.add(tube);

    const haloMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: pathUniforms,
      vertexShader: pathVert,
      fragmentShader: `
        uniform float uProgress;
        uniform vec3 uColorB, uColorC;
        varying vec2 vUv;
        void main() {
          if (vUv.x > uProgress) discard;
          float head = smoothstep(uProgress - 0.05, uProgress, vUv.x);
          vec3 col = mix(uColorB, uColorC, vUv.x) * (0.5 + head * 1.6);
          gl_FragColor = vec4(col, 0.14 + head * 0.2);
        }
      `,
    });
    const halo = new THREE.Mesh(new THREE.TubeGeometry(curve, 700, 1.1, 10, false), haloMat);
    scene.add(halo);

    const pulse = new THREE.Sprite(new THREE.SpriteMaterial({
      map: radialGlowTexture(),
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: new THREE.Color(1.7, 1.95, 1.85),
    }));
    pulse.scale.setScalar(4.2);
    scene.add(pulse);

    const dotHalo = new THREE.Mesh(
      new THREE.PlaneGeometry(22, 22),
      new THREE.MeshBasicMaterial({
        map: dotFieldTexture(),
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        color: new THREE.Color(1.05, 1.05, 1.05),
      }),
    );
    dotHalo.rotation.x = -Math.PI / 2;
    scene.add(dotHalo);

    /* ── consolidation beacon at the end of the route ── */
    const endPt = curve.getPointAt(1);
    const beaconMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(COL.greenLight).multiplyScalar(1.15),
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const beacon = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.85, 13, 14, 1, true), beaconMat);
    beacon.position.set(endPt.x, 8, endPt.z);
    scene.add(beacon);
    const beaconBaseMat = new THREE.MeshBasicMaterial({
      map: radialGlowTexture(),
      color: new THREE.Color(1.05, 1.3, 1.18),
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const beaconBase = new THREE.Mesh(new THREE.PlaneGeometry(9, 9), beaconBaseMat);
    beaconBase.rotation.x = -Math.PI / 2;
    beaconBase.position.set(endPt.x, 0.08, endPt.z);
    scene.add(beaconBase);

    /* ── orthographic camera for the final top-down "results" view ── */
    const orthoCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 600);
    const orthoViewH = 34; // world half-height the ortho frustum frames
    const orthoTarget = new THREE.Vector3(anchors[4].x + 4, 0, anchors[4].z + 3);
    const orthoPos = new THREE.Vector3(anchors[4].x + 4, 96, anchors[4].z + 30); // steep top with slight tilt
    orthoCam.position.copy(orthoPos);
    orthoCam.up.set(0, 1, 0);
    orthoCam.lookAt(orthoTarget);

    /* ── post-processing (selective bloom via HDR threshold) ── */
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);
    const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.55, 0.55, 1.0);
    composer.addPass(bloom);
    composer.addPass(new OutputPass());

    /* ── camera choreography ── */
    const camOffsets = [
      new THREE.Vector3(-26, 26, 34),
      new THREE.Vector3(-30, 22, 29),
      new THREE.Vector3(-24, 31, 39),
      new THREE.Vector3(-28, 20, 30),
      new THREE.Vector3(-34, 38, 60),
    ];
    const stageFOf = (p: number) => {
      if (p <= anchorU[0]) return 0;
      if (p >= anchorU[4]) return 4;
      for (let i = 0; i < 4; i++) {
        if (p <= anchorU[i + 1]) return i + (p - anchorU[i]) / (anchorU[i + 1] - anchorU[i]);
      }
      return 4;
    };

    /* ── scroll + render loop ── */
    // debug: /jornada?p=0.55 freezes the journey at 55% for inspection
    const dbgParam = new URLSearchParams(window.location.search).get("p");
    const dbgP = dbgParam ? THREE.MathUtils.clamp(parseFloat(dbgParam), 0, 1) : null;
    let target = dbgP ?? 0;
    let p = 0;
    let time = 0;
    let lastNow = performance.now();
    let activeIdx = -1;
    const camPos = new THREE.Vector3();
    const lookCur = new THREE.Vector3();
    const tmpOffset = new THREE.Vector3();
    const finalFocus = new THREE.Vector3(anchors[4].x + 4, 8, anchors[4].z);
    let booted = false;

    // pointer → floor raycast for the hover glow
    const raycaster = new THREE.Raycaster();
    const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const pointerNdc = new THREE.Vector2();
    const hoverPt = new THREE.Vector3();
    let pointerActive = false;
    let hoverOp = 0;
    const onPointerMove = (e: PointerEvent) => {
      const r = viewport.getBoundingClientRect();
      pointerNdc.set(
        ((e.clientX - r.left) / r.width) * 2 - 1,
        -((e.clientY - r.top) / r.height) * 2 + 1,
      );
      pointerActive = true;
    };
    const onPointerLeave = () => { pointerActive = false; };
    viewport.addEventListener("pointermove", onPointerMove);
    viewport.addEventListener("pointerleave", onPointerLeave);

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=600%",
      pin: true,
      anticipatePin: 1,
      onUpdate: (self) => { target = dbgP ?? self.progress; },
    });

    const resize = () => {
      const w = viewport.clientWidth;
      const h = viewport.clientHeight;
      const aspect = w / h;
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
      orthoCam.top = orthoViewH;
      orthoCam.bottom = -orthoViewH;
      orthoCam.left = -orthoViewH * aspect;
      orthoCam.right = orthoViewH * aspect;
      orthoCam.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      composer.setSize(w, h);
    };
    resize();
    window.addEventListener("resize", resize);

    const tick = () => {
      const now = performance.now();
      const dt = Math.min(0.05, (now - lastNow) / 1000);
      lastNow = now;
      time += dt;

      p += (target - p) * (1 - Math.exp(-dt * 4.4));
      if (!booted) p = target;
      const u = THREE.MathUtils.clamp(p, 0.0001, 1);

      // beam
      pathUniforms.uProgress.value = u;
      pathUniforms.uTime.value = time;
      const head = curve.getPointAt(u);
      const ahead = curve.getPointAt(Math.min(1, u + 0.05));
      pulse.position.copy(head);
      pulse.scale.setScalar(4.2 + Math.sin(time * 5.2) * 0.5);
      dotHalo.position.set(head.x, 0.07, head.z);
      (dotHalo.material as THREE.MeshBasicMaterial).opacity = 0.42 + Math.sin(time * 3.1) * 0.1;

      // hover glow follows the pointer across the floor
      let hoverTarget = 0;
      if (pointerActive) {
        raycaster.setFromCamera(pointerNdc, renderPass.camera);
        if (raycaster.ray.intersectPlane(floorPlane, hoverPt)) {
          hoverHalo.position.x += (hoverPt.x - hoverHalo.position.x) * (1 - Math.exp(-dt * 11));
          hoverHalo.position.z += (hoverPt.z - hoverHalo.position.z) * (1 - Math.exp(-dt * 11));
          hoverTarget = 0.5;
        }
      }
      hoverOp += (hoverTarget - hoverOp) * (1 - Math.exp(-dt * 6));
      (hoverHalo.material as THREE.MeshBasicMaterial).opacity = hoverOp * (0.85 + Math.sin(time * 2.4) * 0.15);

      // districts reveal as the beam approaches
      districts.forEach((d, i) => {
        const start = i === 0 ? -0.2 : anchorU[i] - 0.085;
        applyReveal(d, clamp01((p - start) / 0.1));
      });

      // stage-specific life
      if (crane) {
        const jib = crane.userData.jib as THREE.Group;
        jib.rotation.y = Math.sin(time * 0.32) * 0.9;
      }
      // a obra avança enquanto o estágio 3 está ativo
      const ct = clamp01((p - anchorU[2] + 0.012) / 0.13);
      const solidFloors = districts[2].userData.solidFloors as THREE.Mesh[];
      solidFloors.forEach((m, k) => {
        const lt = clamp01((ct - 0.16 - k * 0.19) / 0.16);
        m.visible = lt > 0.001;
        m.scale.y = Math.max(0.0001, easeOutCubic(lt));
      });
      const gauge = districts[2].userData.gaugeFill as THREE.Mesh;
      gauge.visible = ct > 0.001;
      gauge.scale.y = Math.max(0.0001, ct);
      floaters.forEach((f) => {
        const fl = f.userData.floater;
        f.position.y = fl.baseY + Math.sin(time * 1.4 + fl.phase) * 0.55;
        f.rotation.y += dt * 0.6;
      });
      // ── Consolidação: executive overview → orthographic results dashboard ──
      // cons spans the whole final tail of the scroll for a richer two-act finale
      const consStart = anchorU[4] - 0.03;
      const cons = clamp01((p - consStart) / (1 - consStart));
      const results = smootherstep(clamp01((cons - 0.5) / 0.42)); // act 2: the top-down results
      // act 1 — project caps light up
      consolidacao.projects.forEach((pr, i) => {
        pr.capMat.emissiveIntensity = clamp01((cons - 0.03 - i * 0.03) / 0.16) * 1.3;
      });
      // act 1 — light streams flow from each project toward the pillar (fade out in act 2)
      consolidacao.streams.forEach((s, i) => {
        s.mat.opacity = clamp01((cons - 0.12 - i * 0.04) / 0.2) * 0.8 * (1 - results);
      });
      // act 1 — the consolidated pillar grows and the crown ignites
      const pillarT = easeOutCubic(clamp01((cons - 0.12) / 0.4));
      consolidacao.consPillar.visible = pillarT > 0.001;
      consolidacao.consPillar.scale.y = Math.max(0.0001, pillarT);
      (consolidacao.consPillar.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.25 + pillarT * 0.55;
      consolidacao.crownMat.opacity = clamp01((cons - 0.42) / 0.2) * 0.9 * (0.4 + 0.6 * (1 - results));
      consolidacao.crown.rotation.z = time * 0.4;
      // act 2 — flat result tiles fade in and light up to each project's value (top view)
      consolidacao.resultTiles.forEach((rt, i) => {
        const lt = smootherstep(clamp01((results - i * 0.05) / 0.32));
        rt.mesh.visible = lt > 0.001;
        rt.mesh.scale.set(Math.max(0.0001, lt), 1, Math.max(0.0001, lt));
        rt.mat.emissiveIntensity = lt * (0.4 + clamp01(rt.value) * 1.1);
      });
      const consTileT = smootherstep(clamp01((results - 0.3) / 0.4));
      consolidacao.consTile.visible = consTileT > 0.001;
      consolidacao.consTile.scale.set(Math.max(0.0001, consTileT), 1, Math.max(0.0001, consTileT));
      consolidacao.consTileMat.emissiveIntensity = consTileT * 1.5;

      // the route plugs into the consolidation beacon (then fades for the top view)
      const endGlow = clamp01((cons - 0.45) / 0.1) * (1 - results);
      beaconMat.opacity = endGlow * 0.45;
      beacon.scale.set(1 + Math.sin(time * 2.2) * 0.08, 1, 1 + Math.sin(time * 2.2) * 0.08);
      beaconBaseMat.opacity = endGlow * (0.55 + Math.sin(time * 2.8) * 0.16);
      (pulse.material as THREE.SpriteMaterial).opacity = 1 - results;

      // camera follows the beam, easing between per-stage offsets (smootherstep)
      const sf = stageFOf(u);
      const i0 = Math.floor(sf);
      const i1 = Math.min(4, i0 + 1);
      tmpOffset.lerpVectors(camOffsets[i0], camOffsets[i1], smootherstep(sf - i0));
      camPos.copy(head).add(tmpOffset);
      // bias the view toward the district side of the route (districts sit at -z)
      const lookTarget = head.clone().lerp(ahead, 0.5).add(new THREE.Vector3(2, 1.5, -7));
      // act 1 — settle the look onto the portfolio centre
      lookTarget.lerp(finalFocus, smootherstep(clamp01(cons / 0.3)) * 0.7);
      // act 2 — glide up into the orthographic top-down vantage
      const toOrtho = smootherstep(clamp01((cons - 0.5) / 0.2));
      camPos.lerp(orthoPos, toOrtho);
      lookTarget.lerp(orthoTarget, toOrtho);
      if (!booted) {
        camera.position.copy(camPos);
        lookCur.copy(lookTarget);
        booted = true;
      } else {
        camera.position.lerp(camPos, 1 - Math.exp(-dt * 3.0));
        lookCur.lerp(lookTarget, 1 - Math.exp(-dt * 3.4));
      }
      camera.lookAt(lookCur);
      // hand off to the true orthographic camera once we're nearly top-down
      renderPass.camera = cons > 0.68 ? orthoCam : camera;

      // sun shadow frustum follows the action
      sun.position.set(head.x + 36, 74, head.z + 24);
      sun.target.position.set(head.x, 0, head.z);
      sun.target.updateMatrixWorld();

      // DOM sync — React owns the active step so it survives re-renders
      let idx = 0;
      for (let i = 0; i < 5; i++) if (p >= boundaries[i]) idx = i;
      if (idx !== activeIdx) {
        activeIdx = idx;
        setActive(idx);
      }
      const localT = clamp01((p - boundaries[idx]) / Math.max(0.0001, boundaries[idx + 1] - boundaries[idx]));
      const rail = railRefs.current[idx];
      if (rail) rail.style.transform = `scaleY(${localT})`;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${p})`;
      // hero fades out as scrolling starts the journey; the stage list fades in
      const heroFade = clamp01(p / 0.05);
      if (heroRef.current) {
        heroRef.current.style.opacity = String(1 - heroFade);
        heroRef.current.style.transform = `translateY(${-heroFade * 36}px)`;
        heroRef.current.style.pointerEvents = heroFade > 0.6 ? "none" : "auto";
      }
      if (overlayRef.current) overlayRef.current.style.opacity = String(clamp01((p - 0.03) / 0.05));
      if (hintRef.current) hintRef.current.style.opacity = target > 0.015 ? "0" : "1";
      if (eyebrowRef.current) {
        const eb = clamp01((p - 0.05) / 0.05) * (1 - clamp01((p - 0.9) / 0.08));
        eyebrowRef.current.style.opacity = String(eb);
      }

      composer.render();
    };
    gsap.ticker.add(tick);
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(tick);
      st.kill();
      window.removeEventListener("resize", resize);
      viewport.removeEventListener("pointermove", onPointerMove);
      viewport.removeEventListener("pointerleave", onPointerLeave);
      scene.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else mat?.dispose();
      });
      composer.dispose();
      renderer.dispose();
    };
  }, []);

  if (fallback) {
    return (
      <section className={styles.section} aria-label="Jornada do empreendimento no VIABIL">
        <div className={styles.fallback}>
          {STAGES.map((s, i) => (
            <article className={styles.fallbackItem} key={s.title}>
              <span className={styles.fallbackNum}>0{i + 1}</span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className={styles.section} aria-label="Jornada do empreendimento no VIABIL">
      <div ref={viewportRef} className={styles.viewport}>
        <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />

        <div ref={heroRef} className={styles.hero}>
          <div className={styles.heroInner}>
            <span className={styles.heroEyebrow}>A jornada do empreendimento</span>
            <h2 className={styles.heroTitle}>
              Do terreno ao resultado,<br />em um só fluxo.
            </h2>
            <p className={styles.heroSub}>
              Percorra o ciclo completo do VIABIL — da gestão de terrenos à
              consolidação executiva dos resultados.
            </p>
            <a className={styles.heroCta} href="/contato">
              Solicitar demonstração
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <span className={styles.heroHint}>
              <span className={styles.hintMouse} aria-hidden="true" />
              Role para começar a jornada
            </span>
          </div>
        </div>

        <div ref={eyebrowRef} className={styles.eyebrow} style={{ opacity: 0 }}>
          A jornada do empreendimento no VIABIL
        </div>
        <ol ref={overlayRef} className={styles.overlay} style={{ opacity: 0 }}>
          {STAGES.map((s, i) => (
            <li
              key={s.title}
              className={i === active ? `${styles.step} ${styles.stepActive}` : styles.step}
              aria-current={i === active ? "step" : undefined}
            >
              <span className={styles.stepNum}>0{i + 1}</span>
              <div>
                <span className={styles.stepTag}>{s.tag}</span>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <div className={styles.stepBody}>
                  <div className={styles.stepBodyInner}>
                    <div className={styles.stepDesc}>
                      <span className={styles.stepRail}>
                        <i
                          ref={(el) => { railRefs.current[i] = el; }}
                          className={styles.stepRailFill}
                        />
                      </span>
                      <p>{s.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
        <div ref={hintRef} className={styles.hint}>
          <span className={styles.hintMouse} aria-hidden="true" />
          <span className={styles.hintLabel}>Role para percorrer o ciclo</span>
        </div>
        <div className={styles.progressTrack} aria-hidden="true">
          <div ref={progressRef} className={styles.progressFill} />
        </div>
      </div>
    </section>
  );
}
