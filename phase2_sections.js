/**
 * Phase 2 — New homepage sections
 * Inserts 6 new sections into lib/landing-source.ts
 */
const fs = require('fs');
const filePath = './lib/landing-source.ts';
let c = fs.readFileSync(filePath, 'utf8');
let changes = 0;

// Convert normal HTML (real quotes, real newlines) → TS double-quoted string content
function ts(html) {
  return html
    .split('\\').join('\\\\')   // escape backslashes
    .split('"').join('\\"')      // escape double quotes
    .split('\r\n').join('\\r\\n') // normalize CRLF first
    .split('\n').join('\\r\\n'); // then LF → literal \r\n
}

// ─── New CSS to append to landingStyles ──────────────────────────────────────
const newCSS = `
    /* Phase 2 sections */
    .btn-outline { background: transparent; color: var(--green-primary); border: 2px solid var(--green-primary); }
    .btn-outline:hover { background: var(--green-primary); color: var(--white); }
    .btn-sm { min-height: 38px; padding: 0 18px; font-size: 14px; }
    .ph2-section { background: var(--white); }
    .ph2-section:nth-child(odd) { background: var(--off-white); }

    /* O Que É o VIABIL */
    .intro-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
    .intro-text h2 { font-size: clamp(26px, 3.5vw, 36px); font-weight: 800; color: var(--dark); margin-bottom: 16px; letter-spacing: -.4px; line-height: 1.2; }
    .intro-text p { font-size: 16px; color: var(--gray-dark); line-height: 1.75; margin-bottom: 16px; }
    .intro-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; border-radius: 16px; overflow: hidden; border: 1px solid var(--gray-light); }
    .intro-stat { background: var(--white); padding: 28px 20px; }
    .intro-stat-num { display: block; font-size: 34px; font-weight: 900; color: var(--green-primary); line-height: 1; }
    .intro-stat-label { font-size: 12px; color: var(--gray-dark); font-weight: 500; margin-top: 4px; }
    @media (max-width: 768px) { .intro-grid { grid-template-columns: 1fr; gap: 32px; } }

    /* Section header row (title left, CTA right) */
    .sh-row { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; margin-bottom: 40px; flex-wrap: wrap; }
    .sh-row > div h2 { font-size: clamp(24px, 3vw, 32px); font-weight: 800; color: var(--dark); margin-bottom: 8px; letter-spacing: -.3px; }
    .sh-row > div p { font-size: 15px; color: var(--gray-dark); line-height: 1.65; max-width: 480px; }
    .sh-center { text-align: center; margin-bottom: 40px; }
    .sh-center h2 { font-size: clamp(24px, 3vw, 34px); font-weight: 800; color: var(--dark); margin-bottom: 12px; letter-spacing: -.3px; }
    .sh-center p { font-size: 16px; color: var(--gray-dark); line-height: 1.7; max-width: 540px; margin: 0 auto; }

    /* Módulos grid */
    .modulos-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; }
    .modulo-card { background: var(--white); border: 1px solid var(--gray-light); border-radius: 14px; padding: 24px 20px; }
    .ph2-section:nth-child(odd) .modulo-card { background: var(--off-white); }
    .modulo-num { display: inline-block; background: var(--green-primary); color: var(--white); font-weight: 900; font-size: 12px; padding: 2px 10px; border-radius: 6px; margin-bottom: 12px; }
    .modulo-card h3 { font-size: 15px; font-weight: 700; color: var(--dark); margin-bottom: 6px; }
    .modulo-card p { font-size: 13px; color: var(--gray-dark); line-height: 1.6; margin: 0; }

    /* Versões grid */
    .versoes-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; margin-bottom: 24px; }
    .versao-card { background: var(--white); border: 1px solid var(--gray-light); border-radius: 16px; padding: 28px 24px; }
    .versao-card--featured { border: 2px solid var(--green-primary); }
    .versao-badge { display: inline-block; color: var(--white); font-weight: 800; font-size: 11px; padding: 3px 10px; border-radius: 100px; margin-bottom: 14px; }
    .versao-card h3 { font-size: 18px; font-weight: 800; color: var(--dark); margin-bottom: 4px; }
    .versao-tag { font-size: 12px; color: var(--gray-mid); font-weight: 500; margin-bottom: 14px; }
    .versao-card > p { font-size: 14px; color: var(--gray-dark); line-height: 1.65; margin-bottom: 20px; }

    /* Value pillars */
    .pillars-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; }
    .pillar-card { background: var(--white); border-radius: 14px; padding: 28px 24px; border-left: 4px solid var(--green-primary); }
    .pillar-card h3 { font-size: 16px; font-weight: 700; color: var(--green-primary); margin-bottom: 10px; }
    .pillar-card p { font-size: 14px; color: var(--gray-dark); line-height: 1.65; margin: 0; }

    /* Serviços grid */
    .servicos-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; }
    .servico-card { background: var(--white); border: 1px solid var(--gray-light); border-radius: 14px; padding: 24px 20px; }
    .ph2-section:nth-child(odd) .servico-card { background: var(--off-white); }
    .servico-card h3 { font-size: 15px; font-weight: 700; color: var(--dark); margin-bottom: 6px; }
    .servico-card p { font-size: 13px; color: var(--gray-dark); line-height: 1.6; margin: 0; }

    /* Sobre strip */
    .sobre-grid { display: grid; grid-template-columns: 1.2fr 1fr 1fr; gap: 40px; align-items: start; }
    .sobre-manifesto h2 { font-size: clamp(22px, 2.8vw, 30px); font-weight: 800; color: var(--dark); margin-bottom: 14px; letter-spacing: -.3px; line-height: 1.2; }
    .sobre-manifesto p { font-size: 15px; color: var(--gray-dark); line-height: 1.75; margin-bottom: 24px; }
    .eli-card { background: var(--green-primary); color: var(--white); border-radius: 16px; padding: 28px 24px; }
    .eli-label { font-size: 11px; color: rgba(255,255,255,.6); font-weight: 600; margin-bottom: 4px; }
    .eli-name { font-size: 20px; font-weight: 900; margin-bottom: 2px; }
    .eli-role { font-size: 12px; color: rgba(255,255,255,.65); margin-bottom: 20px; }
    .eli-quote { font-size: 14px; color: rgba(255,255,255,.85); line-height: 1.7; font-style: italic; margin: 0; }
    .sobre-valores { display: flex; flex-direction: column; gap: 20px; }
    .sobre-valor strong { display: block; font-size: 14px; color: var(--dark); font-weight: 700; margin-bottom: 4px; }
    .sobre-valor p { font-size: 13px; color: var(--gray-dark); line-height: 1.6; margin: 0; }
    @media (max-width: 900px) { .sobre-grid { grid-template-columns: 1fr; gap: 28px; } }
`;

// Append new CSS before the closing of landingStyles
const cssAnchor = '.whatsapp-fab svg { width: 32px; height: 32px; }';
const cssAnchorIdx = c.indexOf(cssAnchor);
if (cssAnchorIdx < 0) {
  console.log('ERROR: Could not find CSS anchor');
  process.exit(1);
}
c = c.substring(0, cssAnchorIdx + cssAnchor.length) + ts(newCSS) + c.substring(cssAnchorIdx + cssAnchor.length);
changes++;
console.log('OK: CSS added');

// ─── HTML section definitions ─────────────────────────────────────────────────

const S1_O_QUE_E_VIABIL = `
    <section class="section-pad ph2-section" id="o-que-e">
      <div class="container">
        <div class="intro-grid">
          <div class="intro-text">
            <span class="eyebrow reveal">A Plataforma</span>
            <h2 class="reveal stagger-1">O que é o VIABIL?</h2>
            <p class="reveal stagger-2">O VIABIL é o sistema integrado de inteligência financeira para o ciclo completo do empreendimento imobiliário. Da captação do terreno ao acompanhamento da obra — todas as decisões num único ambiente parametrizável.</p>
            <p class="reveal stagger-3">Adotado por 600+ empresas como o padrão de análise de viabilidade do mercado imobiliário brasileiro.</p>
            <a class="btn btn-outline reveal stagger-4" href="/plataforma">Conhecer a plataforma →</a>
          </div>
          <div class="intro-stats reveal stagger-2">
            <div class="intro-stat">
              <span class="intro-stat-num">5</span>
              <span class="intro-stat-label">Módulos integrados</span>
            </div>
            <div class="intro-stat">
              <span class="intro-stat-num">7+</span>
              <span class="intro-stat-label">Segmentos atendidos</span>
            </div>
            <div class="intro-stat">
              <span class="intro-stat-num">3</span>
              <span class="intro-stat-label">Versões disponíveis</span>
            </div>
            <div class="intro-stat">
              <span class="intro-stat-num">25+</span>
              <span class="intro-stat-label">Anos de evolução</span>
            </div>
          </div>
        </div>
      </div>
    </section>
`;

// ── SCROLL STOPPER PLACEHOLDER ────────────────────────────────────────────────
const S1_5_SCROLL_STOPPER_PLACEHOLDER = `
    <!--
      NEW SCROLL STOPPER PLACEHOLDER
      Content: "Da terra ao resultado, cada decisão começa com dados."
      Frame sequence: terrain → financial data overlay → GO decision moment
      Insert scroll-stopper section here once frames are generated.
    -->
`;

const S2_MODULOS_PREVIEW = `
    <section class="section-pad ph2-section" id="modulos-preview">
      <div class="container">
        <div class="sh-row">
          <div>
            <span class="eyebrow reveal">Módulos</span>
            <h2 class="reveal stagger-1">5 módulos para o ciclo completo</h2>
            <p class="reveal stagger-2">Cada módulo cobre uma etapa crítica — do landbank ao previsto × realizado.</p>
          </div>
          <a class="btn btn-outline btn-sm reveal stagger-3" href="/modulos">Ver todos os módulos →</a>
        </div>
        <div class="modulos-grid">
          <div class="modulo-card reveal stagger-1">
            <span class="modulo-num">01</span>
            <h3>Gestão de Terrenos</h3>
            <p>Pipeline de aquisições, potencial construtivo e viabilidade preliminar de cada oportunidade.</p>
          </div>
          <div class="modulo-card reveal stagger-2">
            <span class="modulo-num">02</span>
            <h3>Viabilidade</h3>
            <p>VGV, funding, fluxo de caixa, TIR, VPL e análise de sensibilidade por cenário.</p>
          </div>
          <div class="modulo-card reveal stagger-3">
            <span class="modulo-num">03</span>
            <h3>Acompanhamento</h3>
            <p>Previsto × realizado em tempo real — desvios de obra, vendas e receitas.</p>
          </div>
          <div class="modulo-card reveal stagger-4">
            <span class="modulo-num">04</span>
            <h3>Consolidação</h3>
            <p>Portfólio consolidado: rentabilidade, exposição de caixa e comparativos.</p>
          </div>
          <div class="modulo-card reveal stagger-4">
            <span class="modulo-num">05</span>
            <h3>Workflow de Tarefas</h3>
            <p>Atribuições, aprovações e acompanhamento integrado ao ciclo financeiro.</p>
          </div>
        </div>
      </div>
    </section>
`;

const S3_VERSOES_PREVIEW = `
    <section class="section-pad ph2-section" id="versoes-preview">
      <div class="container">
        <div class="sh-center reveal">
          <span class="eyebrow">Versões</span>
          <h2>Qual versão é certa para você?</h2>
          <p>Do primeiro projeto ao portfólio de grande escala — o VIABIL tem uma versão para cada estágio.</p>
        </div>
        <div class="versoes-grid">
          <div class="versao-card reveal stagger-1">
            <span class="versao-badge" style="background:#E67E22;">Lite</span>
            <h3>VIABIL Lite</h3>
            <p class="versao-tag">Para começar</p>
            <p>A porta de entrada para a cultura VIABIL. Viabilidade completa, sem implantação complexa.</p>
            <a class="btn btn-outline btn-sm" href="/versoes">Saber mais →</a>
          </div>
          <div class="versao-card versao-card--featured reveal stagger-2">
            <span class="versao-badge" style="background:#0A4B35;">Full</span>
            <h3>VIABIL Full</h3>
            <p class="versao-tag">Mais popular</p>
            <p>Todos os 5 módulos integrados. A plataforma completa para equipes em crescimento.</p>
            <a class="btn btn-primary btn-sm" href="/versoes">Saber mais →</a>
          </div>
          <div class="versao-card reveal stagger-3">
            <span class="versao-badge" style="background:#1A2320;">Cloud</span>
            <h3>VIABIL Cloud</h3>
            <p class="versao-tag">Acesso em nuvem</p>
            <p>Modelo por assinatura com acesso remoto, segurança, confidencialidade e auditabilidade.</p>
            <a class="btn btn-outline btn-sm" href="/versoes">Saber mais →</a>
          </div>
        </div>
        <div style="text-align:center;margin-top:24px;">
          <a class="btn btn-outline reveal" href="/versoes">Comparar todas as versões →</a>
        </div>
      </div>
    </section>
`;

const S4_VALUE_PILLARS = `
    <section class="section-pad ph2-section" id="diferenciais" style="background:var(--green-primary);">
      <div class="container">
        <div class="sh-center reveal" style="color:var(--white);">
          <span class="eyebrow" style="background:rgba(255,255,255,.15);color:rgba(255,255,255,.9);">Diferenciais</span>
          <h2 style="color:var(--white);">Os 4 pilares do VIABIL</h2>
        </div>
        <div class="pillars-grid">
          <div class="pillar-card reveal stagger-1" style="background:rgba(255,255,255,.08);border-left-color:rgba(255,255,255,.4);">
            <h3 style="color:rgba(255,255,255,.95);">Valor Agregado</h3>
            <p style="color:rgba(255,255,255,.8);">Decisões mais seguras em todas as etapas do empreendimento, do terreno ao resultado.</p>
          </div>
          <div class="pillar-card reveal stagger-2" style="background:rgba(255,255,255,.08);border-left-color:rgba(255,255,255,.4);">
            <h3 style="color:rgba(255,255,255,.95);">Flexibilidade</h3>
            <p style="color:rgba(255,255,255,.8);">Premissas, indicadores e relatórios parametrizáveis para cada realidade de negócio.</p>
          </div>
          <div class="pillar-card reveal stagger-3" style="background:rgba(255,255,255,.08);border-left-color:rgba(255,255,255,.4);">
            <h3 style="color:rgba(255,255,255,.95);">Parametrização</h3>
            <p style="color:rgba(255,255,255,.8);">Adapte o VIABIL ao seu modelo de trabalho, segmento e equipe — não o contrário.</p>
          </div>
          <div class="pillar-card reveal stagger-4" style="background:rgba(255,255,255,.08);border-left-color:rgba(255,255,255,.4);">
            <h3 style="color:rgba(255,255,255,.95);">Confiança</h3>
            <p style="color:rgba(255,255,255,.8);">Padrão adotado por 600+ empresas. Análises que geram credibilidade com sócios e investidores.</p>
          </div>
        </div>
      </div>
    </section>
`;

const S5_SERVICOS_PREVIEW = `
    <section class="section-pad ph2-section" id="servicos-preview">
      <div class="container">
        <div class="sh-row">
          <div>
            <span class="eyebrow reveal">Serviços</span>
            <h2 class="reveal stagger-1">Mais do que software</h2>
            <p class="reveal stagger-2">Suporte, assessoria e implantação para que sua equipe extraia o máximo do VIABIL.</p>
          </div>
          <a class="btn btn-outline btn-sm reveal stagger-3" href="/servicos">Conhecer serviços →</a>
        </div>
        <div class="servicos-grid">
          <div class="servico-card reveal stagger-1">
            <h3>Suporte ao Usuário</h3>
            <p>Especialistas em mercado imobiliário, não apenas técnicos de TI.</p>
          </div>
          <div class="servico-card reveal stagger-2">
            <h3>Assessoria Operacional</h3>
            <p>Equipe VIABIL ao lado da sua para as análises mais complexas.</p>
          </div>
          <div class="servico-card reveal stagger-3">
            <h3>Implantação</h3>
            <p>Processo estruturado para adoção real — não apenas instalação.</p>
          </div>
          <div class="servico-card reveal stagger-4">
            <h3>Customizações</h3>
            <p>Modelos e relatórios adaptados ao modelo de negócio da sua empresa.</p>
          </div>
          <div class="servico-card reveal stagger-4">
            <h3>Integrações</h3>
            <p>O VIABIL conectado ao seu ERP, CRM e sistemas de gestão de obra.</p>
          </div>
        </div>
      </div>
    </section>
`;

const S6_SOBRE_STRIP = `
    <section class="section-pad ph2-section" id="sobre-strip">
      <div class="container">
        <div class="sobre-grid">
          <div class="sobre-manifesto reveal stagger-1">
            <span class="eyebrow">Sobre a BDK Solutions</span>
            <h2>Nascemos dentro da incorporação imobiliária</h2>
            <p>O VIABIL não foi criado por quem entende de software. Foi criado por quem entende de empreendimentos. 25+ anos construindo a ferramenta que o mercado precisava — e que não existia.</p>
            <a class="btn btn-outline" href="/sobre">Conhecer a empresa →</a>
          </div>
          <div class="eli-card reveal stagger-2">
            <div class="eli-label">Diretor Executivo &amp; Idealizador</div>
            <div class="eli-name">Eli Wolf</div>
            <div class="eli-role">BDK Solutions — desde 1995</div>
            <p class="eli-quote">"O VIABIL é a ferramenta que o mercado imobiliário precisava — e que ninguém tinha construído de dentro para fora."</p>
          </div>
          <div class="sobre-valores reveal stagger-3">
            <div class="sobre-valor">
              <strong>Especialização</strong>
              <p>Construído por e para o mercado imobiliário brasileiro.</p>
            </div>
            <div class="sobre-valor">
              <strong>Confiabilidade</strong>
              <p>600+ empresas confiam o seu capital à análise do VIABIL.</p>
            </div>
            <div class="sobre-valor">
              <strong>Evolução contínua</strong>
              <p>O mercado muda — reforma tributária, novos modelos. O VIABIL acompanha.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
`;

// ─── Insertions ───────────────────────────────────────────────────────────────

function insertBefore(marker, newContent, label) {
  const idx = c.indexOf(marker);
  if (idx < 0) {
    console.log('NOT FOUND marker for:', label, JSON.stringify(marker.substring(0, 50)));
    return;
  }
  c = c.substring(0, idx) + ts(newContent) + c.substring(idx);
  changes++;
  console.log('OK:', label);
}

// 1. Insert "O Que É o VIABIL" + scroll stopper placeholder BEFORE business-types
//    Anchor: the opening of business-types section
insertBefore(
  '<section class=\\"business-types\\"',
  S1_O_QUE_E_VIABIL + S1_5_SCROLL_STOPPER_PLACEHOLDER,
  'O Que É o VIABIL + scroll stopper placeholder'
);

// 2. Insert Módulos Preview BEFORE clients section
insertBefore(
  '<section class=\\"clients section-pad\\"',
  S2_MODULOS_PREVIEW,
  'Módulos Preview'
);

// 3. Insert Versões Preview + Value Pillars BEFORE updates section
insertBefore(
  '<section class=\\"updates section-pad\\"',
  S3_VERSOES_PREVIEW + S4_VALUE_PILLARS,
  'Versões Preview + Value Pillars'
);

// 4. Insert Serviços Preview + Sobre Strip BEFORE final-cta section
insertBefore(
  '<section class=\\"final-cta\\"',
  S5_SERVICOS_PREVIEW + S6_SOBRE_STRIP,
  'Serviços Preview + Sobre Strip'
);

// ─── Write ────────────────────────────────────────────────────────────────────
fs.writeFileSync(filePath, c, 'utf8');
const lines = c.split('\n');
console.log('\nTotal changes:', changes);
console.log('Line count:', lines.length, '(should be ~8)');
if (lines.length > 12) {
  console.log('WARNING: file split into too many lines');
} else {
  console.log('File structure OK');
}
