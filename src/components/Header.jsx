import { useEffect, useState } from "react";
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import cloudy from '@/assets/cloudy.png';
import clsx from "clsx";

const navigation = [
  { name: 'Home', href: '#' },
  { name: 'Features', href: '#features' },
  { name: 'FAQs', href: '#faqs' },
]

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    // Run once on mount in case page loads scrolled down
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const bgCls = clsx({ 'bg-white': scrolled });
  const pyCls = clsx({ 'py-3': scrolled, 'py-6': !scrolled });

  return (
    <header className={`fixed top-0 left-0 w-full z-10 transition-all ${bgCls}`}>
      <nav aria-label="Global" className={`transition-all mx-auto flex max-w-7xl items-center justify-between gap-x-6 px-6 lg:px-8 ${pyCls}`}>
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5 flex gap-4 text-xl font-semibold items-center">
            <img
              alt=""
              src={cloudy.src}
              className="h-8 w-auto"
            />
            <span>Sky Brief</span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-end gap-x-6">
          <a href="/login" className="text-base/6 font-semibold text-gray-900 lg:block">
            Log in
          </a>
          <a
            href="/register"
            className="rounded-md bg-yellow-400 px-3 py-2 text-base font-semibold text-black hover:bg-yellow-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
          >
            Sign up
          </a>
        </div>
      </nav>
    </header>
  )
}
