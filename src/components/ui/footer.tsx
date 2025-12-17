import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#142d30] text-white py-12">
      <div className="mx-10 md:mx-0">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Emma&apos;s Pilates</h3>
            <p className="text-white/80">
              Transforming bodies and minds through the power of Pilates. Join
              me on a journey to better health and wellbeing.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">Quick Links</h3>
            <nav className="flex flex-col space-y-2 w-fit">
              <Link
                href="/"
                className="text-white/80 hover:text-secondary transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                href="/blog"
                className="text-white/80 hover:text-secondary transition-colors duration-200"
              >
                Emma's blogs
              </Link>
              <Link
                href="/services"
                className="text-white/80 hover:text-secondary transition-colors duration-200"
              >
                Classes
              </Link>
              <Link
                href="/timetable"
                className="text-white/80 hover:text-secondary transition-colors duration-200"
              >
                Class Timetable
              </Link>
              <Link
                href="/#contact"
                className="text-white/80 hover:text-secondary transition-colors duration-200"
              >
                Contact
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">Contact</h3>
            <p className="text-white/80">
              <span className="font-bold">Address:</span> Edinburgh, UK
            </p>
            <p className="text-white/80">
              <span className="font-bold">Email:</span>{" "}
              <Link
                href="mailto:emmaneilsonpilates@pm.me"
                className="text-white/80 hover:text-secondary transition-colors duration-200"
              >
                emmaneilsonpilates@pm.me
              </Link>
            </p>
            <p className="text-white/80">
              <span className="font-bold">Phone:</span> +44 07789993890
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">Connect</h3>
            <div className="flex space-x-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="https://www.facebook.com/emmaneilsonpilates"
                  className="text-white/80 hover:text-secondary transition-colors duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                  <span className="sr-only">Facebook</span>
                </Link>
              </motion.div>{" "}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="https://www.instagram.com/emmaneilsonpilates"
                  className="text-white/80 hover:text-secondary transition-colors duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  <span className="sr-only">Instagram</span>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Emma&apos;s Pilates. All rights
            reserved.
          </p>
        </div>
      </div>
      </div>
    </footer>
  );
}
