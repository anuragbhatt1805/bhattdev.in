"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import ModeToggle from "../custom/ThemeToggler";
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react";
import { Button } from "./button";


export const MenuItem = ({
  setActive,
  active,
  item,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative max-md:flex max-md:flex-col">
      <motion.p
        transition={{ duration: 0.3 }}
        className={`cursor-pointer text-black hover:opacity-[0.9] dark:text-white md:px-4 md:rounded-full rounded-md py-2 max-md:py-3 max-md:px-2 md:text-center flex md:justify-center items-center ${
          active === item ? "bg-accent font-bold" : ""
        }`}
      >
        {item}
      </motion.p>
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)} // resets the state
      className="relative rounded-full border dark:bg-black dark:border-white/[0.2] bg-white border-black/[0.2] shadow-input flex justify-between items-center space-x-4 px-3 py-2 w-11/12"
    >
      <Link href={"/"}>
        <Image
          src={`/icons/favicon.png`}
          alt={`BhattDev.in Logo`}
          width={40}
          height={40}
          priority={true}
          className="dark:bg-accent rounded-full"
        />
      </Link>
      <div className="flex md:space-x-4 max-md:hidden">{children}</div>
      <ModeToggle classname="max-md:hidden"/>
      <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-full">
            <MenuIcon className="h-6 w-6 rounded-full" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="grid gap-2 py-6">
            {React.Children.map(children, (child) => (
              <SheetClose asChild>{child}</SheetClose>
            ))}
          </div>
          <ModeToggle />
        </SheetContent>
      </Sheet>
      </div>
    </nav>
  );
};