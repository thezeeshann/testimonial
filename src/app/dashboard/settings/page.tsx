import DashboardSettings from "@/components/dashboard/dashboard-settings";
import React from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const Settigns = async () => {
  const session = await auth();
  if (!session) redirect("/signin");

  return <DashboardSettings user={session?.user} expires={session.expires} />;
};

export default Settigns;
