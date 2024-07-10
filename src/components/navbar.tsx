import React from "react";
import { Button } from "@/components/ui/button";
import { Flame } from "lucide-react";
import Link from "next/link";
import UserMenu from "./user-menu";
import { auth } from "@/lib/auth";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className=" py-6 px-8">
      <nav className="flex flex-row justify-between items-center">
        <Link href="/">
          <div className="flex flex-row gap-x-1 cursor-pointer">
            <p className="font-semibold text-xl text-neutral-200">
              Testimonial
            </p>
            <Flame size={28} color="#235BD5" strokeWidth={2.25} />
          </div>
        </Link>

        {!session ? (
          <div className=" flex flex-row gap-x-3">
            <Link href={"/signin"}>
              <Button className="text-neutral-200" variant="ghost">
                Sign in
              </Button>
            </Link>
            <Link href={"/signup"}>
              <Button>Sign up</Button>
            </Link>
          </div>
        ) : (
          <UserMenu user={session?.user} expires={session?.expires} />
        )}
      </nav>
    </header>
  );
};

export default Navbar;
