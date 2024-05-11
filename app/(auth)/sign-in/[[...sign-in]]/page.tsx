import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="md:w-1/2">
      <div className="p-4 border-b-2">
        <h2 className="text-2xl font-semibold text-gray-600">Welcome Back!</h2>
        <p className="text-gray-500">Please sign in to continue</p>
      </div>
      <div className="p-5">
        <SignIn path="/sign-in" />
      </div>
    </div>
  );
}
