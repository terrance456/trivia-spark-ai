import { auth } from "@/src/auth/auth";
import Signout from "@/src/components/Signout/signout";

export default async function Home() {
  const session = await auth();

  return (
    <section>
      {JSON.stringify(session, null, 2)} <Signout />
    </section>
  );
}
