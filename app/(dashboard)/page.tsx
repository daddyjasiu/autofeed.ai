import { getUser } from "@/lib/db/queries";
import { GuestHome } from "@/app/(dashboard)/guest-home";
import { UserHome } from "@/app/(dashboard)/user-home";

export default async function HomePage() {
  const user = await getUser();

  if (!user) {
    return <GuestHome />;
  } else {
    return <UserHome />;
  }
}
