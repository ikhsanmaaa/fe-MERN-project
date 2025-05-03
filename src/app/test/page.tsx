import endpoint from "@/services/endpoint.constant";

export default function TestPage() {
  console.log("Endpoint:", `${endpoint.AUTH}/register`);
  return <h1>halo</h1>;
}
