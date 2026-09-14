import { useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'

export default function ParticleCanvas({ className = '' }) {
  const canvasRef = useRef(null)
  const { isDark } = useTheme()
  const isDarkRef = useRef(isDark)

  // Keep isDarkRef in sync so animation loop always has latest theme without tearing down canvas
  useEffect(() => {
    isDarkRef.current = isDark
  }, [isDark])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId = null
    let isVisible = true
    let width = 0
    let height = 0
    let particles = []

    // Dark & Light mode color palettes
    const darkColors = ['#818cf8', '#a78bfa', '#38bdf8', '#c084fc']
    const lightColors = ['#6366f1', '#8b5cf6', '#0284c7', '#7c3aed']

    function resize() {
      const parent = canvas.parentElement
      if (!parent) return
      width = parent.clientWidth
      height = parent.clientHeight

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      initParticles()
    }

    function initParticles() {
      // Responsive density: 30-40 particles on mobile, up to 70 on wide desktop
      const count = Math.min(Math.max(Math.floor(width / 22), 32), 70)
      particles = []

      for (let i = 0; i < count; i++) {
        const colors = isDarkRef.current ? darkColors : lightColors
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          // Ultra-slow, hypnotic ambient float: 0.12 - 0.28 px/frame
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: Math.random() * 1.8 + 1.2,
          color: colors[Math.floor(Math.random() * colors.length)],
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.02 + 0.01,
        })
      }
    }

    // Optional mouse repulsion/interaction
    let mouse = { x: null, y: null, maxDist: 120 }
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const handleMouseLeave = () => {
      mouse.x = null
      mouse.y = null
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true })

    // Animation Loop
    function render() {
      if (!isVisible) return

      ctx.clearRect(0, 0, width, height)

      const dark = isDarkRef.current
      const maxDistance = width < 768 ? 90 : 125
      const currentColors = dark ? darkColors : lightColors

      // 1. Update & Draw Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Smooth drift
        p.x += p.vx
        p.y += p.vy

        // Wrap around boundaries gently
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10
        if (p.y < -10) p.y = height + 10
        if (p.y > height + 10) p.y = -10

        // Gentle interactive mouse push
        if (mouse.x !== null && mouse.y !== null) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.hypot(dx, dy)
          if (dist < mouse.maxDist && dist > 0) {
            const force = (1 - dist / mouse.maxDist) * 0.6
            p.x += (dx / dist) * force
            p.y += (dy / dist) * force
          }
        }

        // Ambient breathing pulse
        p.pulse += p.pulseSpeed
        const currentRadius = p.radius + Math.sin(p.pulse) * 0.5

        ctx.beginPath()
        ctx.arc(p.x, p.y, Math.max(0.8, currentRadius), 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = dark ? 0.85 : 0.65
        ctx.shadowColor = p.color
        ctx.shadowBlur = dark ? 6 : 2
        ctx.fill()
        ctx.shadowBlur = 0
      }

      // 2. Draw Constellation Network Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i]
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.hypot(dx, dy)

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * (dark ? 0.22 : 0.14)
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = dark ? '#818cf8' : '#6366f1'
            ctx.globalAlpha = alpha
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      ctx.globalAlpha = 1
      animationFrameId = requestAnimationFrame(render)
    }

    // Battery & CPU Saver: Sleep canvas when user switches tabs or window minimizes
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animationFrameId) cancelAnimationFrame(animationFrameId)
      } else {
        animationFrameId = requestAnimationFrame(render)
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    resize()
    window.addEventListener('resize', resize)
    animationFrameId = requestAnimationFrame(render)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-700 ${className}`}
      aria-hidden="true"
    />
  )
}
