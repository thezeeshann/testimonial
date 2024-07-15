import SpaceReview from "@/components/dashboard/space-review";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const Reviews = async () => {
  const session = await auth();
  if (!session) redirect("/signin");

  return <SpaceReview />;
};

export default Reviews;
