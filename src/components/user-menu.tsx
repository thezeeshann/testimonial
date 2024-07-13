"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const UserMenu = ({ user }: Session) => {
  const router = useRouter();

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            {user.image && (
              <Image
                src={user.image}
                alt={user.name!}
                fill={true}
                height={55}
                width={55}
              />
            )}
            {!user.image && (
              <AvatarFallback className="bg-primary/25">
                <div className="font-bold text-neutral-200">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              </AvatarFallback>
            )}
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-[#25282C] border-[#25282C] text-neutral-200 hover:bg-neutral-800"
        >
          <DropdownMenuItem
            onClick={() => router.push("/dashboard")}
            className="group py-2 font-medium focus:bg-neutral-700 focus:text-neutral-200 cursor-pointer "
          >
            Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem  onClick={() => router.push("/dashboard/settings")} className="group py-2 font-medium focus:bg-neutral-700 focus:text-neutral-200 cursor-pointer">
            Setting
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="group py-2 font-medium focus:bg-neutral-700 focus:text-neutral-200 cursor-pointer"
            onClick={() => signOut()}
          >
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
};

export default UserMenu;
