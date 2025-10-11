import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { navigate } from "astro:transitions/client";
import { signOut } from "@/lib/auth-client";
import cloudy from '@/assets/cloudy.png';
import clsx from 'clsx';
import NavLink from '@/components/NavLink';
import NavLinkMobile from '@/components/NavLinkMobile';

export default function Navbar({ email, pathname }) {
  const logout = () => {
    signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate("/login");
        },
      },
    })
  }

  return (
    <Disclosure as="nav" className="relative bg-zinc-800">
      <div className="mx-auto max-w-7xl px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="shrink-0">
              <img
                alt="Sky Brief"
                src={cloudy.src}
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <NavLink text="Dashboard" href="/dashboard" pathname={pathname} />
                <NavLink text="Account" href="/account" pathname={pathname} />
              </div>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:block">
            <div className="flex items-center gap-4">
              <div className="text-zinc-400 text-sm font-medium">
                {email}
              </div>

              <button
                type="button"
                className="cursor-pointer relative rounded-full p-1 text-sm font-medium text-zinc-400 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </div>
          <div className="-mr-2 flex sm:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative cursor-pointer inline-flex items-center justify-center rounded-md p-2 text-zinc-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-blue-500">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          <NavLinkMobile text="Dashboard" href="/dashboard" pathname={pathname} />
          <NavLinkMobile text="Account" href="/account" pathname={pathname} />
        </div>

        <div className="border-t border-white/10 pt-4 pb-3">
          <div className="flex items-center px-5">
            <div className="text-base font-medium text-zinc-400">
              {email}
            </div>
          </div>
          <div className="mt-3 space-y-1 px-2">
            <DisclosureButton
              as="button"
              href="#"
              className="block rounded-md px-3 py-2 text-base font-medium text-zinc-400 hover:bg-white/5 hover:text-white"
              onClick={logout}
            >
              Sign out
            </DisclosureButton>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}