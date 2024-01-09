import React from "react";
import UserProfileDropdown from "../UserProfileDropdown/UserProfileDropdown";
import AppLogo from "../AppLogo/AppLogo";
import Link from "next/link";

const Nav: React.FC = () => {
  return (
    <nav>
      <div className="px-6 py-3 flex justify-between items-center">
        <Link href="/">
          <AppLogo />
        </Link>
        <div className="flex items-center">
          <UserProfileDropdown />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
