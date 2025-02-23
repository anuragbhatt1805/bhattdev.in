"use client";
import React, { useState } from "react";
import { Menu, MenuItem } from "../ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

const menu: {name: string, link: string}[] = [
    {name: "Home", link: "/"},
    {name: "Project", link: "/project"},
    {name: "Service", link: "/service"},
    {name: "Gallery", link: "/gallery"},
    {name: "Blog", link: "/blog"},
    {name: "Connect", link: "/connect"},
]

export default function NavbarMenu({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-5 inset-x-0 flex justify-center max-w-11/12 z-50", className)}
    >
        <Menu setActive={setActive}>
        {
            menu.map((item, index) => (
                <Link  href={item.link} key={index}>
                    <MenuItem setActive={setActive} active={active} item={item.name}></MenuItem>
                </Link>
            ))
        }
        </Menu>
    </div>
  );
}
