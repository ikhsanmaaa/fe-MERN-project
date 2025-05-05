import authServices from "@/services/auth.services";
import Activation from "./activ";

interface PageProps {
  searchParams: { [key: string]: string | undefined };
}
export default async function ActivationPage({ searchParams }: PageProps) {
  let status: "success" | "failed" = "failed";

  try {
    const code = (await searchParams).code;
    if (code) {
      const result = await authServices.activation({ code });
      if (result.data?.data) {
        console.log(result);
        status = "success";
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    status = "failed";
  }
  return <Activation status={status} />;
}
