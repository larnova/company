import React from "react";
import Link from "next/link";

const Button = ({
  link,
  newTab,
  buttonText,
}: {
  link?: string;
  newTab?: boolean;
  buttonText: string;
}) => {
  return (
    <Link href={link ? link : "#"} target={newTab ? "_blank" : ""}>
      <button className="block bg-[url('/text-bg-v2.png')] bg-cover bg-top text-white text-base w-fit lg:text-lg w-full py-2 mx-auto rounded-sm font-bold hover:text-white/60 cursor-pointer transition-all">
        {buttonText}
      </button>
    </Link>
  );
};

export default Button;
