"use client";
import React, { useState } from "react";

interface Testimonial {
  text: string;
  name: string;
  messgae:string;
  role: string;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const duration = props.duration || 10;

  return (
    <div 
      className={`${props.className} overflow-hidden`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="flex flex-col gap-6 pb-6 bg-background animate-testimonial-scroll"
        style={{ 
          animationDuration: `${duration}s`,
          animationPlayState: isPaused ? 'paused' : 'running',
          transition: 'all 0.3s ease-out'
        }}
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text,  name, role }, i) => (
                <div
                  key={i}
                  className="p-10 rounded-3xl border shadow-lg shadow-primary/10 max-w-xs w-full"
                >
                  <div>{text}</div>
                  <div className="flex items-center gap-2 mt-5">
                    <div className="flex flex-col">
                      <div className="font-medium tracking-tight leading-5">{name}</div>
                      <div className="font-medium tracking-tight leading-5">{message}</div>
                      <div className="leading-5 opacity-60 tracking-tight">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </div>
    </div>
  );
};
