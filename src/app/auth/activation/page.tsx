import authServices from "@/services/auth.services";
import Activation from "./activ";
import { NextPage } from "next";

// Secara eksplisit mendapatkan query parameter dari URL
type ActivationPageProps = {
  searchParams: { [key: string]: string | undefined };
};

const ActivationPage: NextPage<ActivationPageProps> = async ({
  searchParams,
}) => {
  let status: "success" | "failed" = "failed";

  try {
    // Periksa apakah searchParams ada dan ambil code
    const rawCode = (await searchParams).code;

    if (typeof rawCode === "string") {
      const result = await authServices.activation({ code: rawCode });
      console.log("Activation result:", result.data); // Debugging untuk melihat hasilnya
      if (result.data?.data) {
        status = "success";
      }
    }
  } catch (error) {
    console.error("Activation error:", error);
    status = "failed";
  }

  return <Activation status={status} />;
};

export default ActivationPage;
