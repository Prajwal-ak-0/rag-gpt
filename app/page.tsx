import { getUser } from "../utils/GetUser";

import ApiDialog from "@/components/ApiDialog";
import { createUser } from "@/utils/CreateUser";

export default async function Home({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  const create = await createUser();

  const hasApiKey =
    user && "isApiVerified" in user ? user.isApiVerified : false;

  return (
    <div className="bg-[#0e0e0f]">
      {children}
      <ApiDialog hasApiKey={hasApiKey ?? false} />
    </div>
  );
}

{
  /* <div className={1 ? "280px" : "ml-[70px]"}>
<UserButton afterSignOutUrl="/" /> 
Hello World
</div> */
}
