export const SITE_NAME = 'Rashmin Bhanderi'
export const SITE_TITLE = 'Rashmin Bhanderi — Tech Lead & Full Stack Developer'
export const SITE_DESCRIPTION = 'Lead Frontend Developer with 7+ years of experience building React applications that scale. Based in Mumbai.'
export const SITE_URL = 'https://rashmin.vercel.app'

export const NAV_SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact', label: 'Schedule' },
] as const

export const SCROLL_DURATION = 1.2 // seconds for programmatic scroll
export const ANIMATION_EASE = 'power3.out'

// ─── Candlestick Chart Layout ─────────────────────────────────────────────
export const CHART_TOTAL_CANDLES = 65
export const CHART_MA_PERIOD = 12
export const CHART_CANDLE_WIDTH = 0.38
export const CHART_CANDLE_GAP = 0.12
export const CHART_CANDLE_STEP = 0.50        // width + gap
export const CHART_ORIGIN_X = -14.0          // world x of leftmost candle center
export const CHART_Y_MIN = -2.5              // bottom of price chart in world units
export const CHART_Y_MAX = 2.5              // top of price chart in world units
export const CHART_VOL_Y_BASE = -4.2         // bottom of volume area
export const CHART_VOL_Y_MAX = -3.5          // top of volume area
