"use client"

import Link from "next/link";
import { usePathname } from 'next/navigation'

const navItems = {
  "/": {
    name: "about me",
  },
  "/profile": {
    name: "profile",
  },
  "/blog": {
    name: "blog",
  },
  "/music": {
    name: "playlists",
  },
  "/game-review": {
    name: "game-reviews",
  },
};

export function Navbar() {
  const currentPath = usePathname();
  const pathSegments = currentPath.split('/').filter(segment => segment !== '');
  // Get the first segment, or an empty string if there are no segments
  const firstPathName = pathSegments.length > 0 ? pathSegments[0] : '';

  return (
      <aside className="-ml-[8px] mb-10 tracking-tight">
        <div className="lg:sticky lg:top-20">
          <nav
              className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
              id="nav"
          >
            <div className="flex flex-row space-x-0 pr-10">
              {Object.entries(navItems).map(([path, { name }]) => {
                console.log(firstPathName)
                console.log(path)
                return (
                    <Link
                        key={path}
                        href={path}
                        className={
                          `transition-all flex align-middle relative py-1 px-2 ${"/" + firstPathName === path ? 'text-cyan-200' : ''}`
                        }
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
