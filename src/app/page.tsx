import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center p-24">
      <div className="flex flex-col gap-y-6">
        <p className="text-neutral-200 text-[52px] leading-none font-extrabold text-center">
          Get testimonials from your <br /> customers with ease
        </p>

        <p className="text-neutral-400 text-center text-lg">
          Collecting testimonials is hard, we get it! So we built Testimonial.
          In minutes, you can collect text <br /> and video testimonials from
          your customers with no need for a developer or website hosting.
        </p>

        <div className="text-center space-x-3">
          <Link href={"/signup"}>
            <Button>Try FREE now</Button>
          </Link>
          <Link href={"/signin"}>
            <Button variant={"ghost"} className="text-neutral-200">
              Talk with us
            </Button>
          </Link>

          <div className="flex flex-row items-center justify-center mt-3 gap-x-1 cursor-pointer">
            <span className="text-neutral-400 text-sm underline">
              Get started with free
            </span>
            <span className="underline">
              <ArrowRight size={15} color="#fff" />
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
