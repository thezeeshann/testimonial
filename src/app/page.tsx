import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="flex  flex-col items-center justify-between p-24 ">
      <div className="flex flex-col gap-y-5">
        <p className="text-neutral-200 text-5xl font-extrabold text-center">
          Get testimonials from your <br /> customers with ease
        </p>

        <p className="text-neutral-400 text-center text-lg">
          Collecting testimonials is hard, we get it! So we built Testimonial.
          In minutes, you can collect text <br /> and video testimonials from
          your customers with no need for a developer or website hosting.
        </p>

        <div className="text-center space-x-3">
          <Button>Try FREE now</Button>
          <Button variant={"ghost"} className="text-neutral-200">
            Talk with us
          </Button>

          <div className="flex flex-row items-center justify-center mt-3 gap-x-1">
            <p className="text-neutral-400 text-sm ">
              Get started with free credits on us.
            </p>
            <div className="flex flex-row items-center">
              <p className="underline text-xs text-neutral-400 font-medium cursor-pointer">
                See our pricing
              </p>
              <span className="underline">
                <ArrowRight size={15} color="#fff" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
