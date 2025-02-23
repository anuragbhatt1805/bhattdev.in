"use client";
import React from "react";
import ColourfulText from "@/components/ui/colourful-text";
import { motion } from "motion/react";
import { HeroSectionInterface } from "@/lib/interface";
import { BackgroundLines } from "@/components/ui/background-lines";

export function HeroSection({ title, subtitle }: HeroSectionInterface) {
  const body = subtitle?.split("\n");
  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4 md:space-y-10 space-y-4">
      <h2 className="bg-clip-text text-2xl md:text-5xl lg:text-7xl font-bold text-center text-white relative z-2 font-sans">
        <ColourfulText text={title} />
      </h2>
      {subtitle && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-clip-text text-center text-white text-lg md:text-2xl lg:text-3xl relative z-2 font-sans"
        >
          {body?.map((text, index) => (
            <p className="max-w-xl mx-auto text-md md:text-2xl text-neutral-700 dark:text-neutral-400 text-center" key={index}>
            {text}
          </p>
          ))}
        </motion.div>
      )}
    </BackgroundLines>
  );
}
