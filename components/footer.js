"use client"

import Link from "next/link"
import { Mail, Phone, MessageCircle, Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-20 md:pb-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Mayra Collection</h3>
            <p className="text-sm text-gray-400 mb-4">Trendy & Elegant Fashion for everyone</p>
            <div className="flex gap-3">
              <a href="#" className="hover:text-white transition">
                <Facebook size={18} />
              </a>
              <a href="#" className="hover:text-white transition">
                <Instagram size={18} />
              </a>
              <a href="#" className="hover:text-white transition">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop" className="hover:text-white transition">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-white font-semibold mb-4">Policies</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white transition">
                  Returns Policy
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white transition">
                  Shipping Info
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Phone size={16} className="text-teal-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-400">Phone</p>
                  <a href="tel:9636509015" className="text-white hover:text-teal-400 transition font-medium">
                    +91 9636509015
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail size={16} className="text-teal-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-400">Email</p>
                  <a
                    href="mailto:Mayracollection979@gmail.com"
                    className="text-white hover:text-teal-400 transition font-medium break-all"
                  >
                    Mayracollection979@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageCircle size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-400">WhatsApp</p>
                  <a
                    href="https://wa.me/919636509015"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-green-400 transition font-medium"
                  >
                    +91 9636509015
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
          <p>&copy; 2025 Mayra Collection. All rights reserved.</p>
          <p>Made with care for fashion lovers</p>
        </div>
      </div>
    </footer>
  )
}
