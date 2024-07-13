import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import CreateSpace from "@/components/dashboard/create-space";

const dashboard = async () => {
  const session = await auth();
  if (!session) redirect("/signin");

  return <CreateSpace />;
};

export default dashboard;
