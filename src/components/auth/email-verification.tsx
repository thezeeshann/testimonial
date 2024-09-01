"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCallback, useEffect } from "react";
import { toast } from "sonner";
import { verifiyEmailToken } from "@/actions/token";

const EmailVerification = () => {
  const token = useSearchParams().get("token");
  const router = useRouter();

  const handleVerification = useCallback(() => {
    if (!token) {
      toast.error("No token found");
    }
    verifiyEmailToken(token!).then((data) => {
      if (data!.error) {
        toast.error(data!.error);
      }
      if (data!.success) {
        toast.success(data!.success);
        router.push("/signin");
      }
    });
  }, []);

  useEffect(() => {
    handleVerification();
  }, []);

  return (
    <section className="flex flex-col items-center p-20 gap-y-5 h-screen">
      <p className="text-neutral-200 font-bold text-4xl">
        Verify you account 📧
      </p>
      <p className="text-neutral-200">{token ? "Verifying email..." : null} </p>
      <p className="text-blue-500 cursor-pointer hover:text-neutral-200 text-sm">
        <Link href={"/signin"}>Back to login</Link>
      </p>
    </section>
  );
};

export default EmailVerification;
