import { useQuery } from "@tanstack/react-query";
import { getTestimonials } from "@/actions/testimonial";


export const useGetTestimonials = () => {
    return useQuery({
      queryKey: ["testimonials"],
      queryFn: () => getTestimonials(),
    });
  };
  