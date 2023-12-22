import { getApiDocs } from "@/src/swagger";
import ReactSwagger from "./react-swagger";

export default async function IndexPage() {
  const spec = await getApiDocs();
  return (
    <section className="container" style={{ backgroundColor: "white", padding: "50px", minHeight: "100vh" }}>
      <ReactSwagger spec={spec} />
    </section>
  );
}
