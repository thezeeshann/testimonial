"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Flame } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className=" py-6 px-8">
      <nav className="flex flex-row justify-between items-center">
        <Link href="/">
          <div className="flex flex-row gap-x-1 cursor-pointer">
            <p className="font-semibold text-xl text-neutral-200">Testimonial</p>
            <Flame size={28} color="#235BD5" strokeWidth={2.25} />
          </div>
        </Link>
        <div className=" flex flex-row gap-x-3">
          <Link href={"/signin"} >
          <Button className="text-neutral-200" variant="ghost">Sign in</Button>
          </Link>
          <Link href={"/signup"}>
          <Button>Sign up</Button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
