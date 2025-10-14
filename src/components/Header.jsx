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
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a key={item.name} href={item.href} className="text-base/6 font-semibold text-gray-900">
              {item.name}
            </a>
          ))}
        </div>
        <div className="flex flex-1 items-center justify-end gap-x-6">
          <a href="/login" className="hidden text-base/6 font-semibold text-gray-900 lg:block">
            Log in
          </a>
          <a
            href="/register"
            className="rounded-md bg-yellow-400 px-3 py-2 text-base font-semibold text-black shadow-xs hover:bg-yellow-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
          >
            Sign up
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className={`fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 ${pyCls}`}>
          <div className="flex items-center gap-x-6">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src={cloudy.src}
                className="h-8 w-auto"
              />
            </a>
            <a
              href="/register"
              className="ml-auto rounded-md bg-yellow-400 px-3 py-2 text-base font-semibold text-black shadow-xs hover:bg-yellow-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
            >
              Sign up
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <a
                  href="/login"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
