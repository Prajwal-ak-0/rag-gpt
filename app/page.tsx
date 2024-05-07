import { UserButton } from "@clerk/nextjs";
import { createUser } from "../utils/CreateUser";

import { User } from "@/types/User";
import ApiDialog from "@/components/ApiDialog";

export default async function Home() {
  const user = await createUser();

  const hasApiKey = (user as User)?.isApiVerified || false;

  return (
    <div>
      {hasApiKey ? "Has API Key" : "No API Key"}
      <UserButton afterSignOutUrl="/" />
      <ApiDialog hasApiKey={!hasApiKey} userId={(user as User)?.clerkId} />
    </div>
  );
}
