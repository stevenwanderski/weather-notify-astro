import clsx from "clsx"

export default function NavLink({ text, href, pathname }) {
  const isActive = pathname === href;

  const classes = clsx({
    'rounded-md px-3 py-2 text-sm font-medium': true,
    'bg-zinc-900 text-white': isActive,
    'text-zinc-300 hover:bg-white/5 hover:text-white': !isActive
  });

  return (
    <a href={href} className={classes}>
      {text}
    </a>
  )
}