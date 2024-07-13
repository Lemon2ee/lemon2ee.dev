"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavItem {
  name: string;
}

interface NavbarProps {
  navItems: Record<string, NavItem>;
  className?: string;
}

export function Navbar({ navItems, className }: NavbarProps) {
  const currentPath = usePathname();

  return (
    <aside className={`${className}`}>
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex flex-row space-x-0 pr-10">
            {Object.entries(navItems).map(([path, { name }]) => {
              const isActive =
                path === "/"
                  ? currentPath === path
                  : currentPath.startsWith(path);
              return (
                <Link
                  key={path}
                  href={path}
                  className={`transition-all flex align-middle relative py-1 px-2 ${
                    isActive ? "text-violet-600 dark:text-cyan-200" : ""
                  }`}
                >
                  {name}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
}
