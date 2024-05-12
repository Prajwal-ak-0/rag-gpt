import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import client from "@/lib/db";

export async function GET(request: Request) {
  try {
    const userClerkData = await currentUser();

    if (!userClerkData?.id) {
      return {
        error: "User ID not found!",
      };
    }

    const link = await client.user.findUnique({
      where: {
        clerkId: userClerkData.id,
      },
      select: {
        link: true,
      },
    });

    if (!link) {
      return {
        error: "Link not found!",
      };
    }

    if (!link.link) {
      return {
        error: "Link URL not found!",
      };
    }

    return NextResponse.json(link);
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong while creating user!",
    };
  }
}
