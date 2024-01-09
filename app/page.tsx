import { auth } from "@/src/auth/auth";
import { Button } from "@/src/components/ui/button";

export default async function Home() {
  const session = await auth();

  return <section>{JSON.stringify(session, null, 2)}</section>;
}
