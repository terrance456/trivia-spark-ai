"use client";
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { ArrowTopLeftIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import SignInButton from "../SignInButton/SignInButton";
import { useTheme } from "next-themes";

const UserProfileDropdown: React.FC = () => {
  const session = useSession();
  const { setTheme, theme } = useTheme();
  const isDarkMode: boolean = theme === "dark";

  const onThemeClick = () => {
    if (isDarkMode) {
      setTheme("light");
      return;
    }
    setTheme("dark");
  };

  return session.data?.user ? (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={session.data.user.image as string} />
          <AvatarFallback>TS</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-6" onCloseAutoFocus={(e) => e.preventDefault()}>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onThemeClick}>
          {isDarkMode ? "Light" : "Dark"}
          <DropdownMenuShortcut>{isDarkMode ? <SunIcon /> : <MoonIcon />}</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut()}>
          Logout
          <DropdownMenuShortcut>
            <ArrowTopLeftIcon />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <SignInButton>Login</SignInButton>
  );
};

export default UserProfileDropdown;
