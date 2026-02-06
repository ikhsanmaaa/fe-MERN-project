import authServices from "@/services/auth.services";
import { useQuery } from "@tanstack/react-query";

const useLandingPageLayoutNavbar = () => {
  const getProfile = async () => {
    const { data } = await authServices.getProfile();
    return data.data;
  };

  const { data: dataProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  return {
    dataProfile,
  };
};

export default useLandingPageLayoutNavbar;
