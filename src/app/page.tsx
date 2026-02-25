import { Scene } from '@/components/canvas/Scene'
import { HeroSection } from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { SkillsSection } from '@/components/sections/SkillsSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { Loader } from '@/components/ui/Loader'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { NavigationDots } from '@/components/ui/NavigationDots'

export default function Home() {
  return (
    <main>
      {/* 3D canvas — fixed, sits behind all content */}
      <Scene />

      {/* Full-screen loader — fixed z-50, hides once 3D scene is ready */}
      <Loader />

      {/* Custom cursor — fixed z-40, desktop only */}
      <CustomCursor />

      {/* HTML content — sits above canvas */}
      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <TestimonialsSection />
        <ContactSection />
      </div>

      {/* Section progress indicator — fixed z-30 */}
      <NavigationDots />
    </main>
  )
}
