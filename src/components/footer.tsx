import { Flame } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <section className="px-24 py-12">
      <div className="flex flex-row items-end justify-start gap-x-60">
        <div className="">
          <div className="flex flex-row gap-x-1 cursor-pointer">
            <p className="font-semibold text-xl text-neutral-200">
              Testimonial
            </p>
            <Flame size={28} color="#235BD5" strokeWidth={2.25} />
          </div>
          <p className="text-[15px] mt-5 text-neutral-500">
            The easiest solution to getting text <br />
            testimonials from your customers
          </p>
        </div>
        <div className="">
          <p className="font-semibold text-sm text-center text-neutral-500">
            Made by ❤️{" "}
            <span className="hover:underline cursor-pointer">
              <Link target="_blank" href={"https://github.com/thezeeshann"}>@thezeeshann</Link>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
