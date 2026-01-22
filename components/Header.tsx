"use client";

import React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Header() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [1, 0]);

  return (
    
    <motion.header 
      style={{ opacity, willChange: 'opacity' }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between mx-22 px-6 py-4 mb-5 mt-4 rounded-full backdrop-blur-md bg-black/20 border-2 border-white/10"
    >
        {/* Logo Area */}
        <div className="flex items-center gap-2">
            <Image src="/logowhite.png" alt="Placify" width={100} height={32} className="object-contain" />
        </div>

        {/* Navigation / Actions */}
        <div className="flex items-center gap-4">
            <button className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                Login
            </button>
            <button className="px-4 py-2 rounded-full bg-white text-black text-sm font-bold hover:bg-gray-200 transition-colors">
                Sign Up
            </button>
        </div>
    </motion.header>
  );
}
