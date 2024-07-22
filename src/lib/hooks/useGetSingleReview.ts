import { useQuery } from "@tanstack/react-query";
import { getSingleReview } from "@/actions/review";

export const useGetSingleReview = (slug: string) => {
  return useQuery({
    queryKey: ["review"],
    queryFn: () => getSingleReview(slug),
  });
};
