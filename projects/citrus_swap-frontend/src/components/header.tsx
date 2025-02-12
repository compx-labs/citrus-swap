'use client'

import { Dialog } from '@headlessui/react'
import { useWallet } from '@txnlab/use-wallet'
import { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import ConnectWallet from './ConnectWallet'

// Navigation links
const navigation = [
  { name: 'Docs', href: '#' },
  { name: 'Liquidity', href: '#' },
  { name: 'Social', href: '#' },
]

export function Header() {
  // State for managing wallet modal visibility
  const [openWalletModal, setOpenWalletModal] = useState(false)

  // State for managing mobile menu visibility
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Wallet information
  const { activeAddress } = useWallet()

  // Toggle functions
  const toggleWalletModal = () => setOpenWalletModal(!openWalletModal)
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)

  return (
    <header className="bg-white">
      {/* Desktop and Mobile Navigation */}
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-4">
        {/* Logo */}
        <a href="#" className="">
          <span className="sr-only">Citrus Swap</span>
          <img src="/Citrus Swap.svg" alt="Citrus Swap Logo" width={300} height={100} />
        </a>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button type="button" onClick={toggleMobileMenu} className="inline-flex items-center justify-center text-gray-700">
            <span className="sr-only">Open main menu</span>
            <FaBars className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex lg:gap-x-12 items-center">
          {navigation.map((item) => (
            <a key={item.name} href={item.href} className="text-lg font-Bari text-orange-400 hover:text-orange-600">
              {item.name}
            </a>
          ))}
          {/* Connect Wallet Button */}
          <button
            data-test-id="connect-wallet"
            className="bg-orange-400 rounded-full text-lime-300 px-6 py-2 text-2xl font-semibold shadow-lg hover:bg-orange-500"
            onClick={toggleWalletModal}
          >
            {activeAddress ? 'Connected' : 'Connect Wallet'}
          </button>
          {/* Wallet Modal */}
          <ConnectWallet openModal={openWalletModal} closeModal={toggleWalletModal} />
        </div>
      </nav>

      {/* Mobile Menu */}
      <Dialog open={mobileMenuOpen} onClose={toggleMobileMenu} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <div className="fixed inset-y-0 right-0 z-20 w-full overflow-y-auto bg-white px-3 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          {/* Header of Mobile Menu */}
          <div className="flex items-center justify-between p-4">
            <a href="#">
              <span className="sr-only">Citrus Swap</span>
              <img src="/Citrus Swap.svg" alt="Citrus Swap Logo" width={300} height={100} />
            </a>
            <button type="button" onClick={toggleMobileMenu} className="text-gray-700">
              <span className="sr-only">Close menu</span>
              <FaTimes className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              {/* Navigation Links */}
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              {/* Wallet Button */}
              <div className="py-6">
                <button
                  onClick={toggleWalletModal}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50"
                >
                  {activeAddress ? 'Connected' : 'Connect Wallet'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </header>
  )
}
