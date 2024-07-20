import { useQuery } from "@tanstack/react-query";
import { getReviews } from "@/actions/review";

export const useGetReview = () => {
  return useQuery({
    queryKey: ["review"],
    queryFn: () => getReviews(),
  });
};
