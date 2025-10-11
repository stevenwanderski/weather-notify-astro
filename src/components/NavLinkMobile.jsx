import clsx from "clsx"

export default function NavLinkMobile({ text, href, pathname }) {
  const isActive = pathname === href;

  const classes = clsx({
    'block rounded-md px-3 py-2 text-base font-medium': true,
    'bg-zinc-900 text-white': isActive,
    'text-zinc-300 hover:bg-white/5 hover:text-white': !isActive
  });

  return (
    <a href={href} className={classes}>
      {text}
    </a>
  )
}