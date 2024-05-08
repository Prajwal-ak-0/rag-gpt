import { currentUser } from "@clerk/nextjs/server";
import client from "../lib/db";

export const createUser = async () => {
  try {
    const userClerkData = await currentUser();

    if (!userClerkData?.id) {
      return {
        error: "User ID not found!",
      };
    }

    const existingUser = await client.user.findUnique({
      where: { clerkId: userClerkData.id },
    });

    if (existingUser) {
      return {
        error: "User with this Clerk ID already exists!",
      };
    }

    const user = await client.user.create({
      data: {
        clerkId: userClerkData?.id,
        username: `${userClerkData?.firstName
          ?.toLowerCase()
          .replace(/\s+/g, "")}-${userClerkData?.lastName
          ?.toLowerCase()
          .replace(/\s+/g, "")}`,
        email: userClerkData?.emailAddresses[0].emailAddress || "",
        provider: userClerkData?.externalAccounts[0].provider,
      },
    });

    return user;
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong while creating user!",
    };
  }
};
