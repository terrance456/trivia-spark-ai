import { auth } from "@/src/auth/auth";
import Signout from "@/src/components/Signout/signout";
import { Button } from "@/src/components/ui/button";
import { ModeToggle } from "@/src/components/ui/mode-toggle";

export default async function Home() {
  const session = await auth();

  return (
    <section>
      {JSON.stringify(session, null, 2)} <Signout />
      <Button variant="destructive">Gege</Button>
      <ModeToggle />
    </section>
  );
}
