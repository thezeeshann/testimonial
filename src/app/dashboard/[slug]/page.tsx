import SpaceReview from "@/components/dashboard/space-review";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const Reviews = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  const session = await auth();
  if (!session) redirect("/signin");

  return <SpaceReview slug={slug} />;
};

export default Reviews;
