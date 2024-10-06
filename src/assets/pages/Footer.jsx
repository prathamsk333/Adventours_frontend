import React from 'react'
import logo from '/AdvenTours.png'

export default function Footer() {
  return (
    <footer className="bg-gray-600 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="mb-4 sm:mb-0 overflow-hidden w-[6.5rem] h-[2.27rem">
            <img src={logo} alt="AdvenTours logo"  className="h-[5rem] w-[6.7rem] transform transition-transform duration-300 scale-[1.5] overflow-hidden" />
          </div>
          <nav className="mb-4 sm:mb-0">
            <ul className="flex space-x-4 text-sm">
              <li>
                <a href="/about" className="hover:text-gray-300 text-lg transition-colors duration-200">
                  About
                </a>
              </li>
              <li>
                <a href="/become-a-guide" className="hover:text-gray-300 text-lg transition-colors duration-200">
                  Become a guide
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-gray-300 text-lg transition-colors duration-200">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
          <div className="text-lg">
            &copy; {new Date().getFullYear()} Pratham S Kore
          </div>
        </div>
      </div>
    </footer>
  )
}