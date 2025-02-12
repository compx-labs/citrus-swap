'use client'

import { ArrowsUpDownIcon } from '@heroicons/react/24/outline'
import { LayoutGroup, motion } from 'framer-motion'
import { useState } from 'react'
import { ALGO_ASSET_ID, ORA_ASSET_ID } from '../constants'
import { SwapButton } from './SwapButton'
import { SwapInput } from './swapInput'

export const Swapper: React.FC = () => {
  const [isSwapped, setIsSwapped] = useState(false)

  const onClickSwitchAssets = () => setIsSwapped((prev) => !prev)

  return (
    <LayoutGroup>
      <div className="mx-3 flex flex-col gap-3">
        {isSwapped ? (
          <>
            {/* ALGO on top when swapped */}
            <motion.div
              layout
              key="asset-2"
              animate={{ scale: [0.9, 1.05, 1] }}
              transition={{ layout: { type: 'spring', stiffness: 700, damping: 30 }, duration: 0.3 }}
            >
              <SwapInput assetId={ALGO_ASSET_ID} />
            </motion.div>

            <motion.button
              layout
              key="arrow"
              onClick={onClickSwitchAssets}
              className="w-full flex mx-auto justify-center"
              transition={{ layout: { type: 'spring', stiffness: 300, damping: 20 }, ease: 'easeInOut' }}
            >
              <ArrowsUpDownIcon className="w-12 h-12 text-lime-300 bg-orange-400 rounded-full border-4 border-lime-300 hover:border-orange-400 hover:text-orange-400 hover:bg-lime-300 hover:scale-150 ease-in-out transition-all" />
            </motion.button>

            <motion.div
              layout
              key="asset-1"
              animate={{ scale: [0.9, 1.03, 1] }}
              transition={{ layout: { type: 'spring', stiffness: 700, damping: 30 }, duration: 0.3 }}
            >
              <SwapInput assetId={ORA_ASSET_ID} />
            </motion.div>
          </>
        ) : (
          <>
            {/* ORA on top when not swapped */}
            <motion.div
              layout
              key="asset-1"
              animate={{ scale: [0.9, 1.05, 1] }}
              transition={{ layout: { type: 'spring', stiffness: 700, damping: 30 }, duration: 0.3 }}
            >
              <SwapInput assetId={ORA_ASSET_ID} />
            </motion.div>

            <motion.button
              layout
              key="arrow"
              onClick={onClickSwitchAssets}
              className="w-full flex mx-auto justify-center"
              transition={{ layout: { type: 'spring', stiffness: 300, damping: 20 }, ease: 'easeInOut' }}
            >
              <ArrowsUpDownIcon className="w-12 h-12 text-lime-300 bg-orange-400 rounded-full border-4 border-lime-300 hover:border-orange-400 hover:text-orange-400 hover:bg-lime-300 hover:scale-150 ease-in-out transition-all" />
            </motion.button>

            <motion.div
              layout
              key="asset-2"
              animate={{ scale: [0.9, 1.05, 1] }}
              transition={{ layout: { type: 'spring', stiffness: 700, damping: 30 }, duration: 0.3 }}
            >
              <SwapInput assetId={ALGO_ASSET_ID} />
            </motion.div>
          </>
        )}

        {/* Swap Button */}
        <div className="flex w-full mx-auto justify-center">
          <SwapButton />
        </div>
      </div>
    </LayoutGroup>
  )
}
