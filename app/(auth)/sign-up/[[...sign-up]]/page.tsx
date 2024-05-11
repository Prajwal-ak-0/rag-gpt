import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="md:w-1/2">
      <div className="p-4 border-b-2">
        <h2 className="text-2xl font-semibold text-gray-600">New Here?</h2>
        <p className="text-gray-500">Create an account to join us</p>
      </div>
      <div className="p-5">
        <SignUp path="/sign-up" />
      </div>
    </div>
  );
}