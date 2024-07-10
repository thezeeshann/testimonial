"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

const UserMenu = ({ user }: Session) => {
  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            {user.image && (
              <Image src={user.image} alt={user.name!} fill={true} />
            )}
            {!user.image && (
              <AvatarFallback className="bg-primary/25">
                <div className="font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              </AvatarFallback>
            )}
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
};

export default UserMenu;
