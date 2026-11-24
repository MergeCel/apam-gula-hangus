type IconProps = {
  name: string;
  className?: string;
};

export function LineIcon({ name, className = "" }: IconProps) {
  const icons: Record<string, React.ReactNode> = {
    aroma: (
      <>
        <path d="M9.5 13.5c-2.4 0-4 1.3-4 3.4 0 2 1.6 3.1 4 3.1h5c2.4 0 4-1.1 4-3.1 0-2.1-1.6-3.4-4-3.4" />
        <path d="M8 10.5c-1.2-1.1-1.2-2.3 0-3.4M12 10.5c-1.2-1.3-1.2-2.8 0-4.2M16 10.5c-1.2-1.1-1.2-2.3 0-3.4" />
      </>
    ),
    tekstur: (
      <>
        <path d="M4.5 15.5c1.6-5 4.2-8.2 7.5-10.5 3.3 2.3 5.9 5.5 7.5 10.5" />
        <path d="M6.5 13c3.4 2.2 7.6 2.2 11 0" />
        <path d="M9 9.5c2 1.1 4 1.1 6 0" />
      </>
    ),
    inspirasi: (
      <>
        <path d="M4.5 13.5h15l-2.2 5.5H6.7Z" />
        <path d="M8 13.5c0-4.1 1.6-7 4-9 2.4 2 4 4.9 4 9" />
        <path d="M3.5 13.5h17M12 4.5v-2" />
      </>
    ),
    whatsapp: (
      <>
        <path d="M20 11.6a8 8 0 0 1-11.7 7.2L4 20l1.3-4.2A8 8 0 1 1 20 11.6Z" />
        <path d="M9 8.2c.6 3 2.5 4.9 5.6 5.7" />
      </>
    ),
    instagram: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="5" />
        <circle cx="12" cy="12" r="3.6" />
        <path d="M17.4 6.7h.01" />
      </>
    ),
    tiktok: (
      <>
        <path d="M14 4v10.2a3.8 3.8 0 1 1-3.2-3.7" />
        <path d="M14 4c.4 2.6 1.9 4.1 4.5 4.4" />
      </>
    ),
    pin: (
      <>
        <path d="M12 21s6-5.3 6-11a6 6 0 1 0-12 0c0 5.7 6 11 6 11Z" />
        <circle cx="12" cy="10" r="2.2" />
      </>
    ),
    external: (
      <>
        <path d="M14 4h6v6" />
        <path d="M20 4 11 13" />
        <path d="M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" />
      </>
    ),
    "arrow-left": (
      <>
        <path d="M19 12H5" />
        <path d="m12 19-7-7 7-7" />
      </>
    ),
    "chevron-left": <path d="m14.5 5-7 7 7 7" />,
    "chevron-right": <path d="m9.5 5 7 7-7 7" />
  };

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  );
}
