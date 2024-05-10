import { getUser } from "../utils/GetUser";

import ApiDialog from "@/components/ApiDialog";
import { createUser } from "@/utils/CreateUser";
import { exec, spawn, fork } from "child_process";

export default async function Home({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  exec("echo Hello", (err, stdout, stderr) => {
    if (err) {
      console.error(`exec error: ${err}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });

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
