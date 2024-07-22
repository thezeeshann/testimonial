import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import SingleReview from "@/components/dashboard/product-review";

const ProductReview = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  const session = await auth();
  if (!session) redirect("/signin");

  return <SingleReview slug={slug} />;
};

export default ProductReview;
