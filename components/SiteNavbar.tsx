"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconBriefcase, IconFileCv, IconHome, IconListCheck, IconMenu2, IconShare2 } from "@tabler/icons-react";

const navItems = [
  { href: "/", label: "Home", icon: IconHome },
  { href: "/projects", label: "Projects", icon: IconBriefcase },
  { href: "/goals", label: "Goals", icon: IconListCheck },
  { href: "/socials", label: "Socials", icon: IconShare2 },
  { href: "/resume", label: "Resume", icon: IconFileCv },
];

export default function SiteNavbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="navbar navbar-expand-md navbar-light bg-white border-bottom">
      <div className="container-xl">
        <Link href="/" className="navbar-brand fw-bold">
          Adrien Bourdeaux
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="portfolio-navbar"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          onClick={() => setIsOpen((value) => !value)}
        >
          <IconMenu2 size={22} stroke={1.75} />
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="portfolio-navbar">
          <ul className="navbar-nav ms-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

              return (
                <li className={`nav-item ${isActive ? "active" : ""}`} key={item.href}>
                  <Link href={item.href} className="nav-link" onClick={() => setIsOpen(false)}>
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                      <Icon size={18} stroke={1.75} />
                    </span>
                    <span className="nav-link-title">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </header>
  );
}
