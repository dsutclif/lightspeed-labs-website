'use client'

import { motion } from 'framer-motion'

type LayerKey = "secure" | "inform" | "act"

interface IndicatorLineProps {
  activeLayer: LayerKey
}

export default function IndicatorLine({ activeLayer }: IndicatorLineProps) {
  return (
    <div className="relative w-full h-px my-4">
      <motion.div
        key={activeLayer}
        className="absolute inset-0 bg-gradient-to-r from-blue-400 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          duration: 0.3,
          delay: 0.1,
          ease: "easeOut"
        }}
        style={{ transformOrigin: "left" }}
      />

      {/* Animated dot at the end of the line */}
      <motion.div
        key={`${activeLayer}-dot`}
        className="absolute top-1/2 w-2 h-2 bg-blue-400 rounded-full"
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: 120, opacity: 1 }}
        transition={{
          duration: 0.4,
          delay: 0.15,
          ease: "easeOut"
        }}
        style={{ transform: "translateY(-50%)" }}
      />
    </div>
  )
}