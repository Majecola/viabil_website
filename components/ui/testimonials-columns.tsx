"use client";
import React from "react";
import { motion } from "motion/react";

export type Testimonial = {
  text: string;
  name: string;
  role: string;
  initials: string;
};

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={`overflow-hidden ${props.className ?? ""}`}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration: props.duration ?? 15,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-[18px] pb-[18px]"
      >
        {[...new Array(2).fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, name, role, initials }, i) => (
              <div
                key={i}
                style={{
                  border: "1px solid rgba(10,75,53,.16)",
                  borderLeft: "4px solid #0A4B35",
                  borderRadius: "12px",
                  background: "linear-gradient(180deg, rgba(10,75,53,.035), #fff 42%)",
                  padding: "24px 24px 22px",
                  boxShadow: "0 18px 46px rgba(10,75,53,.08)",
                  width: "100%",
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontSize: "42px",
                    color: "#0A4B35",
                    lineHeight: 0.8,
                    fontWeight: 700,
                    height: "28px",
                    marginBottom: "14px",
                  }}
                >
                  "
                </span>
                <p
                  style={{
                    fontSize: "15px",
                    lineHeight: 1.72,
                    color: "#111",
                    margin: 0,
                  }}
                >
                  {text}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginTop: "20px",
                    paddingTop: "16px",
                    borderTop: "1px solid rgba(10,75,53,.12)",
                  }}
                >
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "50%",
                      background: "#0A4B35",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "13px",
                      flexShrink: 0,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {initials}
                  </div>
                  <div style={{ display: "grid", gap: "3px" }}>
                    <strong
                      style={{
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "#0A4B35",
                        lineHeight: 1.3,
                      }}
                    >
                      {name}
                    </strong>
                    <span
                      style={{
                        display: "block",
                        fontSize: "12px",
                        color: "#555",
                        lineHeight: 1.35,
                        marginTop: "2px",
                      }}
                    >
                      {role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))]}
      </motion.div>
    </div>
  );
};
