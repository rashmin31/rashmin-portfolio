"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

const STATS = [
    { key: "EXP_YRS", value: "7+", label: "Years Exp." },
    { key: "PROJ_SHIPPED", value: "10+", label: "Projects" },
    { key: "TEAM_LED", value: "4", label: "Engineers" },
];

export function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const leftColRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Floating animation — runs immediately, independent of scroll
            gsap.fromTo(
                imageRef.current,
                { y: -10 },
                {
                    y: 10,
                    yoyo: true,
                    repeat: -1,
                    duration: 3,
                    ease: "sine.inOut",
                },
            );

            // Left column: slide in from left on scroll entry
            gsap.from(leftColRef.current, {
                x: -60,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            });

            // Right column items: staggered fade up on scroll entry
            gsap.from(".about-right-item", {
                y: 30,
                opacity: 0,
                duration: 0.7,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="about"
            className="min-h-screen flex items-center py-24"
        >
            <div className="max-w-6xl mx-auto px-6 w-full flex flex-col md:flex-row gap-16 items-center">
                {/* ── Left column: profile photo ── */}
                <div
                    ref={leftColRef}
                    className="md:w-2/5 flex justify-center flex-shrink-0"
                >
                    <div ref={imageRef} className="relative">
                        {/* Terminal frame */}
                        <div className="absolute inset-0 rounded-full border-2 border-[#26a69a]/60 shadow-[0_0_60px_rgba(38,166,154,0.2)] z-10" />

                        <Image
                            src="/images/profile.png"
                            alt="Rashmin Bhanderi"
                            width={300}
                            height={300}
                            className="rounded-full object-cover"
                            priority
                        />
                    </div>
                </div>

                {/* ── Right column: bio content ── */}
                <div className="md:w-3/5 flex flex-col gap-6">
                    {/* Section label */}
                    <p className="about-right-item font-mono text-xs text-accent tracking-widest uppercase">
                        COMPANY PROFILE / FUNDAMENTAL ANALYSIS
                    </p>

                    {/* Personal headline */}
                    <h2 className="about-right-item font-display text-4xl text-text-primary leading-snug">
                        I turn complex requirements into clean, performant
                        interfaces.
                    </h2>

                    {/* Bio paragraph 1 */}
                    <div className="about-right-item flex flex-col gap-1">
                        <span className="font-mono text-xs text-muted tracking-widest">{'// OVERVIEW'}</span>
                        <p className="font-sans text-text-secondary leading-relaxed">
                            With over 7 years of experience in frontend engineering,
                            I have worked across startups, enterprises, and global
                            remote teams — building React applications that handle
                            real scale and real users. I currently lead frontend
                            development at Punon Technologies, Mumbai.
                        </p>
                    </div>

                    {/* Bio paragraph 2 */}
                    <div className="about-right-item flex flex-col gap-1">
                        <span className="font-mono text-xs text-muted tracking-widest">{'// INVESTMENT_THESIS'}</span>
                        <p className="font-sans text-text-secondary leading-relaxed">
                            I care about the quality of what I ship. Clean
                            architecture, readable code, and interfaces that feel
                            effortless to use — these are not extras for me, they
                            are the baseline. Outside of client work I explore
                            algorithmic trading systems and 3D web experiences.
                        </p>
                    </div>

                    {/* Key stats — terminal readouts */}
                    <div className="about-right-item flex gap-8 pt-4 border-t border-muted/40">
                        {STATS.map((stat) => (
                            <div key={stat.key} className="flex flex-col gap-1">
                                <div className="font-mono text-xs text-muted tracking-widest">
                                    {stat.key}
                                </div>
                                <div className="font-mono text-2xl font-bold text-[#26a69a]">
                                    ▲ {stat.value}
                                </div>
                                <div className="font-mono text-xs text-text-secondary">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
