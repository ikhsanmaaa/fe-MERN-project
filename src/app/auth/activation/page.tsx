import authServices from "@/services/auth.services";
import Activation from "./activ";

export default async function ActivationPages({
  searchParams,
}: {
  searchParams: Promise<{ code: string }>;
}) {
  let status: "success" | "failed" = "failed";

  const { code } = await searchParams;
  try {
    if (typeof code === "string") {
      const result = await authServices.activation({ code });
      if (result.data?.data) {
        status = "success";
      }
    }
  } catch (error) {
    console.error("Activation error:", error);
    status = "failed";
  }

  return <Activation status={status} />;
}
