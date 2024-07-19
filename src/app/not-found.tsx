import React from "react";
import Link from "next/link";

const NotFound = () => {
  return (
    <p className="text-center text-neutral-200 font-semibold min-h-screen flex justify-center gap-x-2 items-center">
      The page you are looking for doesn&apos;t exist {" "}
      <Link href={"/"}>
        <span className="underline cursor-pointer text-neutral-400 hover:text-neutral-200 text-sm"> Go back home</span>
      </Link>
    </p>
  );
};

export default NotFound;
