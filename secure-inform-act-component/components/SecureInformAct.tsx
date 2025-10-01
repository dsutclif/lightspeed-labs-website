'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import IndicatorLine from './IndicatorLine'

type LayerKey = "secure" | "inform" | "act"

type LayerCopy = {
  title: string
  subtitle?: string
  pain: string
  value: string
  capability: string
}

type Props = {
  copy?: Record<LayerKey, LayerCopy>
  className?: string
}

const defaultCopy: Record<LayerKey, LayerCopy> = {
  secure: {
    title: "SECURE",
    subtitle: "[ Encrypted Cloud • SOC 2 • Zero Trust • PII Redaction ]",
    pain: ""We can't adopt AI because security/compliance won't allow it."",
    value: "Enterprise-grade AI workspace — your data stays yours. No training leakage. No legal surprises.",
    capability: "Private GCP tenancy with outbound controls, PII stripping, secrets management, audit trails."
  },
  inform: {
    title: "INFORM",
    subtitle: "[ RAG • Knowledge Fabric • Organizational Memory ]",
    pain: ""Our knowledge is scattered across Drive, Slack, and inboxes — every decision starts from zero."",
    value: "A central nervous system for company knowledge — instantly queryable, continuously up to date.",
    capability: "RAG over Google Drive, Slack, Email, Notion, and PDFs with source citations and freshness."
  },
  act: {
    title: "ACT",
    subtitle: "[ Agents • Workflow Automation ]",
    pain: ""30% of our time is manual ops — memos, recruiting lists, reporting, email triage."",
    value: "AI operators that actually do work — from first drafts to structured handoffs.",
    capability: "Agents to summarize investor updates, pull talent lists, draft reports and communications."
  }
} as const

const layerImages: Record<LayerKey, string> = {
  secure: '/Offerings Secure.png',
  inform: '/Offerings Inform.png',
  act: '/Offerings Act.png'
}

const layers: LayerKey[] = ['secure', 'inform', 'act']

export default function SecureInformAct({
  copy = defaultCopy,
  className = ''
}: Props) {
  const [activeLayer, setActiveLayer] = useState<LayerKey>('secure')

  const handleKeyDown = useCallback((event: React.KeyboardEvent, layer: LayerKey) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setActiveLayer(layer)
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault()
      const currentIndex = layers.indexOf(activeLayer)
      let nextIndex: number

      if (event.key === 'ArrowLeft') {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : layers.length - 1
      } else {
        nextIndex = currentIndex < layers.length - 1 ? currentIndex + 1 : 0
      }

      setActiveLayer(layers[nextIndex])
    }
  }, [activeLayer])

  return (
    <section
      className={`relative w-full min-h-[70vh] overflow-hidden ${className}`}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/Offerings Background.png"
          alt=""
          fill
          priority
          style={{ objectFit: 'cover' }}
          className="z-0"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2 gap-8 px-6 py-16 min-h-[70vh]">

        {/* Artwork Section */}
        <div className="relative aspect-square mx-auto w-full max-w-[560px] flex items-center justify-center">
          {layers.map((layer) => (
            <button
              key={layer}
              aria-label={`Activate ${copy[layer].title} layer`}
              aria-pressed={activeLayer === layer}
              aria-controls="text-panel"
              onMouseEnter={() => setActiveLayer(layer)}
              onFocus={() => setActiveLayer(layer)}
              onKeyDown={(e) => handleKeyDown(e, layer)}
              className="absolute inset-0 transition-all duration-200 focus:outline-none"
              tabIndex={0}
            >
              <motion.div
                animate={
                  activeLayer === layer
                    ? {
                        filter: "grayscale(0) brightness(1)",
                        opacity: 1
                      }
                    : {
                        filter: "grayscale(1) brightness(1.15)",
                        opacity: 0.5
                      }
                }
                transition={{
                  type: "spring",
                  stiffness: 240,
                  damping: 22
                }}
                className="w-full h-full"
              >
                <motion.div
                  animate={
                    activeLayer === layer
                      ? { scale: 1.02 }
                      : { scale: 1.0 }
                  }
                  transition={{
                    type: "spring",
                    stiffness: 240,
                    damping: 22
                  }}
                  className="w-full h-full"
                  style={{ transformOrigin: 'center' }}
                >
                  <Image
                    src={layerImages[layer]}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 560px, 80vw"
                    priority={layer === 'secure'}
                    style={{ objectFit: 'contain' }}
                  />
                </motion.div>
              </motion.div>
            </button>
          ))}
        </div>

        {/* Text Panel */}
        <aside
          id="text-panel"
          aria-live="polite"
          className="font-ocr flex flex-col justify-center space-y-6 text-white"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLayer}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              {/* Title */}
              <motion.h3
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="text-4xl lg:text-5xl font-bold text-white tracking-wider"
              >
                {copy[activeLayer].title}
              </motion.h3>

              {/* Subtitle */}
              {copy[activeLayer].subtitle && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.2 }}
                  className="text-sm lg:text-base text-gray-300 font-normal"
                >
                  {copy[activeLayer].subtitle}
                </motion.p>
              )}

              {/* Indicator Line */}
              <IndicatorLine activeLayer={activeLayer} />

              {/* Content Sections */}
              <motion.div
                className="mt-6 space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.2 }}
                >
                  <strong className="text-blue-400">Pain point:</strong>
                  <p className="mt-1 text-gray-200 leading-relaxed">
                    {copy[activeLayer].pain}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.2 }}
                >
                  <strong className="text-blue-400">Value:</strong>
                  <p className="mt-1 text-gray-200 leading-relaxed">
                    {copy[activeLayer].value}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.2 }}
                >
                  <strong className="text-blue-400">Capability:</strong>
                  <p className="mt-1 text-gray-200 leading-relaxed">
                    {copy[activeLayer].capability}
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </aside>
      </div>
    </section>
  )
}