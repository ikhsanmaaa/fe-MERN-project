import authServices from "@/services/auth.services";
import Activation from "./activ";

type ActivationPageProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function ActivationPage({
  searchParams,
}: ActivationPageProps) {
  let status: "success" | "failed" = "failed";

  try {
    const rawCode = searchParams?.code;

    if (typeof rawCode === "string") {
      const result = await authServices.activation({ code: rawCode });

      if (result.data?.data) {
        status = "success";
      }
    }
  } catch {
    status = "failed";
  }

  return <Activation status={status} />;
}
