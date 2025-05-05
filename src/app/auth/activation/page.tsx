import authServices from "@/services/auth.services";
import Activation from "./activ";
export default async function ActivationPage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  let status: "success" | "failed" = "failed";

  try {
    const code = searchParams.code;
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
