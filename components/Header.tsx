"use client";

import Image from "next/image";
import { useState } from "react";

type NavItem = {
  label: string;
  href: string;
};

export default function Header({
  navigation,
  logo
}: {
  navigation: NavItem[];
  logo: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <a className="logo-link" href="/#beranda" aria-label="Apam Gula Hangus">
        <Image src={logo} alt="Logo Apam Gula Hangus" width={86} height={57} priority />
      </a>

      <nav className="site-nav" aria-label="Navigasi utama">
        {navigation.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="menu-toggle"
        aria-label={open ? "Tutup menu" : "Buka menu"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>

      {open && (
        <div className="mobile-menu">
          <div className="mobile-menu-top">
            <a
              className="logo-link"
              href="/#beranda"
              onClick={() => setOpen(false)}
            >
              <Image
                src={logo}
                alt="Logo Apam Gula Hangus"
                width={86}
                height={57}
                priority
              />
            </a>
            <button
              type="button"
              className="mobile-menu-close"
              aria-label="Tutup menu"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
          </div>
          <nav className="mobile-nav" aria-label="Navigasi mobile">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

