'use client'

import { useEffect, useRef } from 'react'
import createGlobe from 'cobe'
import { useSpring } from 'framer-motion'

// FIFA 2026 Host Cities (Approximate Lat/Long)
const HOST_CITIES = [
  { location: [49.2827, -123.1207], size: 0.05 }, // Vancouver
  { location: [47.6062, -122.3321], size: 0.05 }, // Seattle
  { location: [37.7749, -122.4194], size: 0.05 }, // San Francisco
  { location: [34.0522, -118.2437], size: 0.08 }, // Los Angeles
  { location: [20.6597, -103.3496], size: 0.05 }, // Guadalajara
  { location: [39.0997, -94.5786], size: 0.05 }, // Kansas City
  { location: [32.7767, -96.7970], size: 0.08 }, // Dallas
  { location: [29.7604, -95.3698], size: 0.05 }, // Houston
  { location: [25.6866, -100.3161], size: 0.05 }, // Monterrey
  { location: [19.4326, -99.1332], size: 0.08 }, // Mexico City
  { location: [43.6510, -79.3470], size: 0.05 }, // Toronto
  { location: [42.3601, -71.0589], size: 0.05 }, // Boston
  { location: [40.7128, -74.0060], size: 0.1 }, // New York / NJ
  { location: [39.9526, -75.1652], size: 0.05 }, // Philadelphia
  { location: [33.7490, -84.3880], size: 0.08 }, // Atlanta
  { location: [25.7617, -80.1918], size: 0.08 }, // Miami
]

export function Globe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)
  
  const springConfig = { mass: 1, stiffness: 280, damping: 40, restDelta: 0.001 }
  const r = useSpring(0, springConfig)

  useEffect(() => {
    let phi = 0
    let width = 0
    const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth)
    window.addEventListener('resize', onResize)
    onResize()

    const globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.04, 0.04, 0.04], // Carbon Black matches
      markerColor: [0.957, 0.773, 0.259], // World Cup Gold
      glowColor: [0.231, 0.51, 0.965], // Electric Blue aura
      markers: HOST_CITIES,
      onRender: (state) => {
        if (!pointerInteracting.current) {
          phi += 0.005
        }
        state.phi = phi + r.get()
        state.width = width * 2
        state.height = width * 2
      },
    })

    return () => {
      globe.destroy()
      window.removeEventListener('resize', onResize)
    }
  }, [r])

  return (
    <div className={`relative mx-auto aspect-square w-full max-w-[600px] ${className || ''}`}>
      <canvas
        ref={canvasRef}
        className="h-full w-full opacity-0 transition-opacity duration-1000 ease-in-out"
        style={{
          width: '100%',
          height: '100%',
          cursor: 'grab',
          contain: 'layout paint size',
          opacity: 1,
        }}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX
          canvasRef.current!.style.cursor = 'grabbing'
        }}
        onPointerUp={() => {
          pointerInteracting.current = null
          canvasRef.current!.style.cursor = 'grab'
        }}
        onPointerOut={() => {
          pointerInteracting.current = null
          canvasRef.current!.style.cursor = 'grab'
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current
            pointerInteractionMovement.current = delta
            r.set(r.get() + delta / 200)
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = e.touches[0].clientX - pointerInteracting.current
            pointerInteractionMovement.current = delta
            r.set(r.get() + delta / 100)
          }
        }}
      />
    </div>
  )
}
