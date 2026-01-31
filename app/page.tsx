"use client";
import React, { useRef, useEffect } from "react";
import LaserFlow from "../components/LaserFlow";
import Image from "next/image";
import ScrollFloat from "../components/ScrollFloat";
import Lenis from "lenis";
import { 
  motion, 
  useScroll,
  useTransform
} from "framer-motion";
import { cn } from "@/lib/utils";
import Header from "../components/Header";

const companies = [
  { name: "INDEED", color: "#FFB7C5", logo: "/indeed.svg" },
  { name: "NAUKRI", color: "#FFDDB7", logo: "/naukri-logo-brandlogos.net_tt5sr8eaq.svg" },
  { name: "LINKEDIN", color: "#B1C5FF", logo: "/linkedin-334.svg" },
  { name: "AMAZON", color: "#4FABFF", logo: "/amazon-195.svg" },
  { name: "GOOGLE", color: "#FF6EC7", logo: "/google-440.svg" },
  { name: "MICROSOFT", color: "#CBAACB", logo: "/microsoft-58.svg" },
  { name: "FLIPKART", color: "#76E7CD", logo: "/flipkart-743.svg" },
];

// Theme Configuration
const themeColor = "#A855F7"; // Purple - feel free to change this!

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Scroll Opacity Logic
  const { scrollY } = useScroll();
  const heroTextOpacity = useTransform(scrollY, [0, 100], [1, 0]);
  const laserOpacity = useTransform(scrollY, [0, 100], [1, 0.4]);
  const backgroundOpacity = useTransform(scrollY, [0, 100], [1, 0.5]);
  const logoOpacity = useTransform(scrollY, [0, 100], [1, 0.2]);



  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full min-h-screen overflow-x-hidden bg-gradient-to-br from-[#0a0015] via-[#0d0d1a] to-[#05101a] text-white"
      )}
    >
      <Header />

      {/* ---------------- BACKGROUND LAYERS (Fixed) ---------------- */}
      <motion.div 
        style={{ opacity: backgroundOpacity, willChange: 'opacity' }}
        className="fixed inset-0 z-0 pointer-events-none"
      >
        {/* Base Grid - Faint */}
        <div className="absolute inset-0 opacity-[0.4] text-white/20">
          <GridPattern />
        </div>


        {/* Ambient Blobs - Vibrant */}
        <div className="absolute inset-0 pointer-events-none overflow-visible">
          <div className="absolute bottom-[-15%] left-[-5%] w-[55vw] h-[55vw] rounded-full bg-blue-500/25 blur-[100px]" />
          <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-500/20 blur-[100px]" />
        </div>
    </motion.div>


      {/* ---------------- PERSISTENT HERO CONTENT (Fixed z-10) ---------------- */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        {/* Company Names Bar at Top */}
        <motion.div 
            style={{ opacity: backgroundOpacity, willChange: 'opacity' }}
            className="absolute top-0 left-0 w-full pt-24 px-4 flex flex-wrap justify-center items-center gap-6 md:gap-12 bg-transparent pointer-events-auto opacity-70 "
        >
          {companies.map((company, index) => {
            // Flatten the curve slightly
            let yOffset = 0;
            if (index === 1 || index === 5) yOffset = 15; 
            if (index === 0 || index === 6) yOffset = 30; 

            return (
              <div
                key={company.name}
                className="relative transform hover:scale-185 transition-transform duration-300"
                style={{ transform: `translateY(${yOffset}px)` }}
              >
                <div className="relative w-24 h-12 md:w-32 md:h-16 flex items-center justify-center">
                  <Image
                    src={company.logo}
                    alt={company.name}
                    fill
                    className="object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                  />
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Laser Beam - Calmed down */}
      <motion.div 
        style={{ opacity: laserOpacity, willChange: 'opacity' }}
        className="brightness-70 absolute inset-0 pointer-events-none z-0 mix-blend-screen rotate-180 opacity-60 mt-14"
      >
          <LaserFlow
            horizontalSizing={1.4}
            verticalSizing={0.72}
            color={themeColor} 
            fogIntensity={0.3}
            flowSpeed={-0.2}
            horizontalBeamOffset={0}
            verticalBeamOffset={-0.3}
            wispDensity={0}
            wispSpeed={-0.3}
            falloffStart={2}
            fogFallSpeed={-0.5}
            flowStrength={0.5}
          />
        </motion.div>

        {/* Star Constellation - Left Top (Orion-inspired) */}
        <motion.div 
            style={{ opacity: heroTextOpacity, willChange: 'opacity' }}
            className="hidden md:block absolute top-[12%] left-[1%] w-[15%] h-[40%] z-10 pointer-events-none"
        >
            <svg className="w-full h-full" viewBox="0 0 180 280" fill="none">
                {/* Connection lines */}
                <line x1="50" y1="30" x2="130" y2="50" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
                <line x1="50" y1="30" x2="30" y2="90" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
                <line x1="130" y1="50" x2="150" y2="100" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
                <line x1="30" y1="90" x2="70" y2="140" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
                <line x1="70" y1="140" x2="110" y2="140" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
                <line x1="110" y1="140" x2="150" y2="100" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
                <line x1="70" y1="140" x2="50" y2="200" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
                <line x1="110" y1="140" x2="130" y2="200" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
                
                {/* Stars - static */}
                <circle cx="50" cy="30" r="2.5" fill="white" opacity="0.7" />
                <circle cx="130" cy="50" r="2" fill="white" opacity="0.55" />
                <circle cx="30" cy="90" r="1.8" fill="white" opacity="0.45" />
                <circle cx="150" cy="100" r="1.5" fill="white" opacity="0.4" />
                <circle cx="70" cy="140" r="1.2" fill="white" opacity="0.35" />
                <circle cx="90" cy="138" r="1.2" fill="white" opacity="0.35" />
                <circle cx="110" cy="140" r="1.2" fill="white" opacity="0.35" />
                <circle cx="50" cy="200" r="1.5" fill="white" opacity="0.4" />
                <circle cx="130" cy="200" r="1.5" fill="white" opacity="0.4" />
                
                {/* Background stars */}
                <circle cx="20" cy="60" r="0.6" fill="white" opacity="0.15" />
                <circle cx="160" cy="80" r="0.5" fill="white" opacity="0.12" />
                <circle cx="80" cy="220" r="0.7" fill="white" opacity="0.18" />
            </svg>
        </motion.div>

        {/* Star Constellation - Right Top (Cassiopeia W-shape) */}
        <motion.div 
            style={{ opacity: heroTextOpacity, willChange: 'opacity' }}
            className="hidden md:block absolute top-[15%] right-[1%] w-[15%] h-[35%] z-10 pointer-events-none"
        >
            <svg className="w-full h-full" viewBox="0 0 180 250" fill="none">
                {/* W-shape connection lines */}
                <line x1="20" y1="60" x2="55" y2="110" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
                <line x1="55" y1="110" x2="90" y2="70" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
                <line x1="90" y1="70" x2="125" y2="120" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
                <line x1="125" y1="120" x2="160" y2="55" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
                
                {/* Stars - static */}
                <circle cx="20" cy="60" r="2" fill="white" opacity="0.6" />
                <circle cx="55" cy="110" r="2.5" fill="white" opacity="0.7" />
                <circle cx="90" cy="70" r="1.8" fill="white" opacity="0.5" />
                <circle cx="125" cy="120" r="2.2" fill="white" opacity="0.6" />
                <circle cx="160" cy="55" r="1.8" fill="white" opacity="0.5" />
                
                {/* Background stars */}
                <circle cx="40" cy="40" r="0.5" fill="white" opacity="0.12" />
                <circle cx="140" cy="90" r="0.6" fill="white" opacity="0.15" />
                <circle cx="70" cy="150" r="0.7" fill="white" opacity="0.18" />
                <circle cx="100" cy="180" r="0.5" fill="white" opacity="0.12" />
            </svg>
        </motion.div>

        {/* Star Constellation - Left Bottom (Big Dipper) */}
        <motion.div 
            style={{ opacity: heroTextOpacity, willChange: 'opacity' }}
            className="hidden md:block absolute bottom-[15%] left-[2%] w-[14%] h-[28%] z-10 pointer-events-none"
        >
            <svg className="w-full h-full" viewBox="0 0 160 180" fill="none">
                {/* Dipper bowl */}
                <line x1="20" y1="40" x2="60" y2="35" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
                <line x1="60" y1="35" x2="70" y2="70" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
                <line x1="70" y1="70" x2="30" y2="80" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
                <line x1="30" y1="80" x2="20" y2="40" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
                {/* Handle */}
                <line x1="70" y1="70" x2="100" y2="90" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
                <line x1="100" y1="90" x2="130" y2="100" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
                <line x1="130" y1="100" x2="145" y2="130" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
                
                {/* Stars - static */}
                <circle cx="20" cy="40" r="2" fill="white" opacity="0.55" />
                <circle cx="60" cy="35" r="2.2" fill="white" opacity="0.6" />
                <circle cx="70" cy="70" r="1.8" fill="white" opacity="0.5" />
                <circle cx="30" cy="80" r="1.8" fill="white" opacity="0.5" />
                <circle cx="100" cy="90" r="1.5" fill="white" opacity="0.45" />
                <circle cx="130" cy="100" r="1.5" fill="white" opacity="0.45" />
                <circle cx="145" cy="130" r="2" fill="white" opacity="0.55" />
                
                {/* Background stars */}
                <circle cx="80" cy="50" r="0.5" fill="white" opacity="0.12" />
                <circle cx="50" cy="120" r="0.6" fill="white" opacity="0.15" />
            </svg>
        </motion.div>

        {/* Star Constellation - Right Bottom (Lyra/Triangle) */}
        <motion.div 
            style={{ opacity: heroTextOpacity, willChange: 'opacity' }}
            className="hidden md:block absolute bottom-[18%] right-[2%] w-[12%] h-[22%] z-10 pointer-events-none"
        >
            <svg className="w-full h-full" viewBox="0 0 140 150" fill="none">
                {/* Triangle with tail */}
                <line x1="70" y1="20" x2="30" y2="80" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
                <line x1="70" y1="20" x2="110" y2="80" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
                <line x1="30" y1="80" x2="110" y2="80" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
                <line x1="70" y1="20" x2="70" y2="120" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
                
                {/* Stars - static */}
                <circle cx="70" cy="20" r="2.5" fill="white" opacity="0.7" />
                <circle cx="30" cy="80" r="1.8" fill="white" opacity="0.5" />
                <circle cx="110" cy="80" r="1.8" fill="white" opacity="0.5" />
                <circle cx="70" cy="120" r="1.5" fill="white" opacity="0.4" />
                
                {/* Background stars */}
                <circle cx="50" cy="50" r="0.5" fill="white" opacity="0.12" />
                <circle cx="100" cy="110" r="0.6" fill="white" opacity="0.15" />
            </svg>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 animate-bounce pointer-events-none text-white/50">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
            </svg>
        </div>

        {/* Main Logo at Bottom of Laser */}
        <motion.div
            className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 pointer-events-auto"
        >
            <motion.div 
            className="w-32 h-32 md:w-52 md:h-52 relative flex items-center justify-center p-4"
            style={{
                opacity: logoOpacity,
                willChange: 'opacity, transform, filter',
            }}
            animate={{
                scale: [1.2, 1.3, 1.2],
                filter: [
                "drop-shadow(0 0 10px rgba(168,85,247,0.1))",
                "drop-shadow(0 0 45px rgba(168,85,247,0.8))",
                "drop-shadow(0 0 10px rgba(168,85,247,0.1))"
                ]
            }}
            transition={{
                duration: 5.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay:2
            }}
            >
                <Image
                    src="/logowhite.png"
                    alt="Placify Logo"
                    fill
                    className="object-contain" // removed drop-shadow from image itself to let container handle glow
                />
            </motion.div>
        </motion.div>
      </div>


      {/* ---------------- SCROLLABLE FOREGROUND (z-20) ---------------- */}
      <div className="relative z-20 w-full">
        {/* Transparency Spacer - Allows seeing the fixed hero initially */}
        <section className="h-screen w-full pointer-events-none opacity-0" />

        {/* Text Reveal Section - Scrolled into view over the hero */}
        <section className="min-h-screen flex flex-col items-center justify-center bg-transparent">
          <div className="max-w-6xl w-full text-center">
            <ScrollFloat
              animationDuration={1}
              ease='back.inOut(2)'
              scrollStart='center bottom+=10%'
              scrollEnd='bottom bottom-=30%'
              stagger={0.03}
              containerClassName="inline-block backdrop-blur-md rounded-xl px-6 py-2 border-[2px] border-white/5 brightness-200"
              textClassName="font-bold text-5xl md:text-8xl tracking-tighter text-white/90 drop-shadow-lg"
            >
              All your favorite job
            </ScrollFloat>
            
            <div className="h-8 md:h-16" /> {/* Spacer */}

            <ScrollFloat
              animationDuration={1}
              ease='back.inOut(2)'
              scrollStart='center bottom+=10%' 
              scrollEnd='bottom bottom-=30%'
              stagger={0.03}
              containerClassName="inline-block backdrop-blur-md rounded-xl px-6 py-2 border-[2px] border-white/5 brightness-200"
              textClassName="font-bold text-5xl md:text-8xl tracking-tighter text-sky-400 drop-shadow-lg "
            >
              At One Place
            </ScrollFloat>
          </div>
        </section>
        
        {/* Extra Space */}
        {/* Verified Jobs Section (Covers the Hero) */}
        <section className="relative min-h-screen w-full bg-black flex flex-col items-center justify-center p-10 z-30">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: false, margin: "-20%" }}
              className="max-w-5xl text-center space-y-8"
            >
              <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-white drop-shadow-2xl">
                We protect students from <span className="text-red-500">fake jobs</span>.
              </h2>
              
              <div className="inline-block rounded-full bg-green-500/10 border border-green-500/20 px-6 py-2">
                <p className="text-xl md:text-2xl font-mono text-green-400 tracking-widest uppercase">
                  ✓ Only Showing Verified
                </p>
              </div>
            </motion.div>
        </section> 

        {/* Separation / Transition */}
        <div className="w-full h-40 bg-gradient-to-b from-black to-[#030014] pointer-events-none" />

        {/* Get Started Section */}
        <section className="relative min-h-[80vh] w-full bg-[#030014] flex flex-col items-center justify-center p-10 z-30 pb-32">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: false, margin: "-20%" }}
              className="max-w-6xl w-full text-center space-y-16"
            >
              <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-white drop-shadow-2xl">
                Choose your <span className="text-purple-500">path</span>.
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto">
                {/* For Companies */}
                <div className="group relative overflow-hidden rounded-3xl bg-zinc-900/80 border border-white/10 p-10 hover:bg-zinc-800 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10 text-left">
                    <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-6">
                         <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                    </div>
                    <h3 className="text-4xl font-bold text-white mb-2">For Companies</h3>
                    <p className="text-zinc-400 mb-8 text-lg">Post jobs, verify your company, and find top talent effortlessly.</p>
                    <a href="https://admin.placify.lol" className="flex items-center justify-center w-full py-4 rounded-xl bg-white text-black font-bold text-xl hover:bg-gray-200 transition-colors">
                        Hire Talent
                    </a>
                </div>

                {/* For Students */}
                <div className="group relative overflow-hidden rounded-3xl bg-zinc-900/80 border border-white/10 p-10 hover:bg-zinc-800 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-sky-500/10 text-left">
                     <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-6">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                    </div>
                    <h3 className="text-4xl font-bold text-white mb-2">For Students</h3>
                    <p className="text-zinc-400 mb-8 text-lg">Apply to verified jobs and track your applications.</p>
                    
                    <div className="flex flex-col gap-3">
                        <div className="flex gap-3">
                             {/* Apple */}
                            <a href="#" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-zinc-800 text-white font-semibold hover:bg-zinc-700 transition-colors border border-white/5">
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.21-1.96 1.07-3.11-1.06.05-2.36.71-3.11 1.61-.69.77-1.28 1.95-1.11 3.07 1.18.09 2.38-.75 3.15-1.57"/></svg>
                                <span>App Store</span>
                            </a>
                            {/* Android */}
                            <a href="#" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-zinc-800 text-white font-semibold hover:bg-zinc-700 transition-colors border border-white/5">
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.444 13.8533 8.083 12 8.083c-1.8534 0-3.5912.361-5.1374.9667L4.8413 5.5467a.4161.4161 0 00-.5676-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.344 14.6589.344 18.7174h23.3102c0-4.0585-2.3439-7.5307-5.7726-9.396"/></svg>
                                <span>Play Store</span>
                            </a>
                        </div>
                        <a href="https://student.placify.lol" className="inline-block w-full py-4 rounded-xl border border-white/20 text-white font-bold text-xl hover:bg-white/10 transition-colors text-center">
                            Visit Website
                        </a>
                    </div>
                </div>
              </div>
            </motion.div>
        </section> 
      </div> 
    </div>
  );
}

// Sub-component for the Grid Pattern SVG
const GridPattern = () => {
  return (
    <svg className="w-full h-full">
      <defs>
        <pattern
          id="grid-pattern"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-pattern)" />
    </svg>
  );
};
