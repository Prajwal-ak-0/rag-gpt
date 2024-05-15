"use server";

import client from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export const GetUploadedFiles = async () => {
  try {
    const userClerkData = await currentUser();

    if (!userClerkData?.id) {
      return {
        error: "User ID not found!",
      };
    }

    let uploadedFiles = await client.document.findMany({
      where: {
        clerkId: userClerkData?.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!Array.isArray(uploadedFiles)) {
      uploadedFiles = Array.from(uploadedFiles);
    }
    return uploadedFiles;
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong while fetching Uploaded Files!",
    };
  }
};
