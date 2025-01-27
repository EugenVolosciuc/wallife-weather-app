import Link from "next/link";

import { APP_NAME } from "@/lib/constants";

const Header = () => {
  return (
    <header className="sticky top-0 border-b shadow px-2 md:px-0 h-16 flex items-center bg-background z-20">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/">
          <p className="font-bold text-xl gradient-text">{APP_NAME}</p>
        </Link>
      </div>
    </header>
  );
};

export default Header;
