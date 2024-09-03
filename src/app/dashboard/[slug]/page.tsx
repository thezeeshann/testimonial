import TestimonialReview from "@/components/dashboard/testimonial-review";

const Reviews = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;

  return <TestimonialReview slug={slug} />;
};

export default Reviews;
