import { UserButton } from "@clerk/nextjs";
import { getUser } from "../utils/GetUser";

import { User } from "@/types/User";
import ApiDialog from "@/components/ApiDialog";
import { createUser } from "@/utils/CreateUser";

export default async function Home() {
  const user = await getUser();
  const create = await createUser();

  const hasApiKey = (user && 'isApiVerified' in user) ? user.isApiVerified : false;

  return (
    <div>
      {hasApiKey ? "Has API Key" : "No API Key"}
      <UserButton afterSignOutUrl="/" />
      <ApiDialog hasApiKey={!hasApiKey} />
    </div>
  );
}
