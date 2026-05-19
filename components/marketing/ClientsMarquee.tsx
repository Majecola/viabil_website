"use client";

import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import Image from "next/image";

type Logo = { src: string; alt: string };

const row1: Logo[] = [
  { src: "/assets/client-logos/cyrela.png",           alt: "Cyrela" },
  { src: "/assets/client-logos/btgpactual.png",        alt: "BTG Pactual" },
  { src: "/assets/client-logos/tecnisa.png",           alt: "Tecnisa" },
  { src: "/assets/client-logos/helbor.png",            alt: "Helbor" },
  { src: "/assets/client-logos/multiplan.png",         alt: "Multiplan" },
  { src: "/assets/client-logos/brookfield.png",        alt: "Brookfield" },
  { src: "/assets/client-logos/moura-dubeux.png",      alt: "Moura Dubeux" },
  { src: "/assets/client-logos/goldsztein.png",        alt: "Goldsztein" },
  { src: "/assets/client-logos/rodobens.png",          alt: "Rodobens" },
  { src: "/assets/client-logos/queiroz-galvao.png",    alt: "Queiroz Galvão" },
  { src: "/assets/client-logos/setin.png",             alt: "Setin" },
  { src: "/assets/client-logos/cbre.png",              alt: "CBRE" },
  { src: "/assets/client-logos/trisul.png",            alt: "Trisul" },
  { src: "/assets/client-logos/odebrecht.png",         alt: "Odebrecht" },
];

const row2: Logo[] = [
  { src: "/assets/client-logos/schahin.png",           alt: "Schahin" },
  { src: "/assets/client-logos/kinea.png",             alt: "Kinea" },
  { src: "/assets/client-logos/masb.png",              alt: "MASB" },
  { src: "/assets/client-logos/cury.png",              alt: "Cury" },
  { src: "/assets/client-logos/mac.png",               alt: "MAC" },
  { src: "/assets/client-logos/carvalho-hosken.png",   alt: "Carvalho Hosken" },
  { src: "/assets/client-logos/esser.png",             alt: "Esser" },
  { src: "/assets/client-logos/banco-safra.png",       alt: "Banco Safra" },
  { src: "/assets/client-logos/diagonal.png",          alt: "Diagonal" },
  { src: "/assets/client-logos/marquise.png",          alt: "Marquise" },
  { src: "/assets/client-logos/patrimar.png",          alt: "Patrimar" },
  { src: "/assets/client-logos/oas.png",               alt: "OAS" },
  { src: "/assets/client-logos/lucio.png",             alt: "Lucio Incorporações" },
  { src: "/assets/client-logos/andrade-gutierrez.png", alt: "Andrade Gutierrez" },
];

function MarqueeRow({
  logos,
  reverse = false,
  speed = 1,
}: {
  logos: Logo[];
  reverse?: boolean;
  speed?: number;
}) {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, dragFree: true, watchDrag: false },
    [AutoScroll({ speed, direction: reverse ? "backward" : "forward", stopOnInteraction: false })],
  );

  return (
    <div
      ref={emblaRef}
      className="overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <div className="flex">
        {logos.map((logo, i) => (
          <div
            key={i}
            style={{
              flex: "0 0 auto",
              minWidth: 0,
              padding: "0 8px",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#fff",
                border: "1px solid rgba(10,75,53,.10)",
                borderRadius: "10px",
                padding: "10px 14px",
                height: "110px",
                boxShadow: "0 2px 8px rgba(10,75,53,.05)",
              }}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={270}
                height={90}
                style={{
                  height: "90px",
                  width: "auto",
                  maxWidth: "270px",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ClientsMarquee() {
  return (
    <div style={{ marginTop: "40px", display: "flex", flexDirection: "column", gap: "16px" }}>
      <MarqueeRow logos={row1} speed={1.2} />
      <MarqueeRow logos={row2} reverse speed={1.0} />
    </div>
  );
}
