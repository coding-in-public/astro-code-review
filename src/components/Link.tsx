const Link = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <a
      href={href}
      className="relative max-w-fit rounded-md border border-transparent font-bold text-astro-800 bg-gradient-to-r from-astro-accent-red to-astro-accent-pink hover:to-astro-accent-dark-pink focus:outline-none focus-visible:ring-2 ring-black hover:transition-all px-4 py-3 leading-none shadow-sm [text-shadow:none]  flex items-center justify-center gap-2 fade-in shift-up"
    >
      {children}
    </a>
  );
};
export default Link;
