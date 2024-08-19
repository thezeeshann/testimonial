import { useQuery } from "@tanstack/react-query";
import { getSpace } from "@/actions/review";

export const useGetSpace = (id:string) => {
  return useQuery({
    queryKey: ["space"],
    queryFn: () => getSpace(id),
  });
};
