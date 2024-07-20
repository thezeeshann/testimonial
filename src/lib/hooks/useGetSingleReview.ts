import { useQuery } from "@tanstack/react-query";
import { getSingleReview } from "@/actions/review";

export const useGetReview = (slug: string) => {
  return useQuery({
    queryKey: ["review"],
    queryFn: () => getSingleReview(slug),
  });
};
