"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const STATS = [
    { value: "7+", label: "Years Experience" },
    { value: "10+", label: "Projects Shipped" },
    { value: "4", label: "Engineers Led" },
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
            // .about-right-item is scoped to this section via gsap.context
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
                        {/* Glow ring */}
                        <div className="absolute inset-0 rounded-full border border-accent shadow-[0_0_60px_rgba(99,102,241,0.25)] z-10" />

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
                    <p className="about-right-item font-mono text-sm text-accent tracking-widest uppercase">
                        About Me
                    </p>

                    {/* Personal headline */}
                    <h2 className="about-right-item font-display text-4xl text-text-primary leading-snug">
                        I turn complex requirements into clean, performant
                        interfaces.
                    </h2>

                    {/* Bio paragraph 1 */}
                    <p className="about-right-item font-sans text-text-secondary leading-relaxed">
                        With over 7 years of experience in frontend engineering,
                        I have worked across startups, enterprises, and global
                        remote teams — building React applications that handle
                        real scale and real users. I currently lead frontend
                        development at Punon Technologies, Mumbai.
                    </p>

                    {/* Bio paragraph 2 */}
                    <p className="about-right-item font-sans text-text-secondary leading-relaxed">
                        I care about the quality of what I ship. Clean
                        architecture, readable code, and interfaces that feel
                        effortless to use — these are not extras for me, they
                        are the baseline. Outside of client work I explore
                        algorithmic trading systems and 3D web experiences.
                    </p>

                    {/* Key stats */}
                    <div className="about-right-item flex gap-10 pt-4 border-t border-muted/40">
                        {STATS.map((stat) => (
                            <div key={stat.label}>
                                <div className="font-mono text-3xl font-bold text-text-primary">
                                    {stat.value}
                                </div>
                                <div className="font-sans text-sm text-text-secondary mt-1">
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
