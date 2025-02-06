// components/Swapper.tsx
'use client';
import { useState } from 'react';
import { motion, LayoutGroup } from 'framer-motion';
import { ArrowsUpDownIcon } from '@heroicons/react/24/outline';
import { SwapInput } from './swapInput';
import { ALGO_ASSET_ID, ORA_ASSET_ID } from '../constants';
import { SwapButton } from './swapButton';

// Replace these with your actual asset IDs

export const Swapper: React.FC = () => {
    // When isSwapped is false:
    //   Top = ORA_ASSET_ID, Bottom = ALGO_ASSET_ID.
    // When true, we swap the order.
    const [isSwapped, setIsSwapped] = useState(false);

    const onClickSwitchAssets = () => {
        setIsSwapped((prev) => !prev);
    };

    return (
        <LayoutGroup>
            <div className="mx-3 flex flex-col gap-3">
                {isSwapped ? (
                    // When swapped, render the ALGO token on top and the ORA token on bottom.
                    <>
                        {/* Use a key that reflects its new position */}
                        <motion.div
                            layout
                            key="asset-2"
                            animate={{ scale: [0.9, 1.05, 1] }}
                            transition={{
                                layout: { type: 'spring', stiffness: 700, damping: 30 },
                                duration: 0.3,
                            }}
                        >
                            <SwapInput assetId={ALGO_ASSET_ID} />
                        </motion.div>



                        <motion.button
                            layout
                            key="arrow"
                            onClick={onClickSwitchAssets}
                            className="w-full flex mx-auto justify-center"
                            transition={{ layout: { type: 'spring', stiffness: 300, damping: 20  }, ease: "easeInOut" }}
                        >
                            <ArrowsUpDownIcon className="w-12 h-12 text-lime-300 bg-orange-400 rounded-full border-4 border-lime-300 hover:border-orange-400 hover:text-orange-400 hover:bg-lime-300 hover:scale-150 ease-in-out transition-all" />
                        </motion.button>

                        <motion.div
                            layout
                            key="asset-1"
                            // Animate scale through keyframes
                            animate={{ scale: [0.9, 1.03, 1] }}
                            transition={{
                                layout: { type: 'spring', stiffness: 700, damping: 30 },
                                duration: 0.3,
                            }}
                        >
                            <SwapInput assetId={ORA_ASSET_ID} />
                        </motion.div>


                    </>
                ) : (
                    // When not swapped, render the ORA token on top and the ALGO token on bottom.
                    <>
                        <motion.div
                            layout
                            key="asset-1"
                            // Animate scale through keyframes
                            animate={{ scale: [0.9, 1.05, 1] }}
                            transition={{
                                layout: { type: 'spring', stiffness: 700, damping: 30 },
                                duration: 0.3,
                            }}
                        >
                            <SwapInput assetId={ORA_ASSET_ID} />
                        </motion.div>



                        <motion.button
                            layout
                            key="arrow"
                            onClick={onClickSwitchAssets}
                            className="w-full flex mx-auto justify-center"
                            transition={{ layout: { type: 'spring', stiffness: 300, damping: 20  }, ease: "easeInOut" }}
                        >
                            <ArrowsUpDownIcon className="w-12 h-12 text-lime-300 bg-orange-400 rounded-full border-4 border-lime-300 hover:border-orange-400 hover:text-orange-400 hover:bg-lime-300 hover:scale-150 ease-in-out transition-all" />
                        </motion.button>

                        <motion.div
                            layout
                            key="asset-2"
                            animate={{ scale: [0.9, 1.05, 1] }}
                            transition={{
                                layout: { type: 'spring', stiffness: 700, damping: 30 },
                                duration: 0.3,
                            }}
                        >
                            <SwapInput assetId={ALGO_ASSET_ID} />
                        </motion.div>


                    </>
                )}

                <div className="flex w-full mx-auto justify-center">
                    <SwapButton />
                </div>
            </div>
        </LayoutGroup>
    );
};
