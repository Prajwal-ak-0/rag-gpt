import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import client from "@/lib/db";
import { readPdfText } from "pdf-text-reader";
import axios from "axios";

// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
//   "Access-Control-Allow-Headers": "Content-Type, Authorization",
// };

// export async function OPTIONS() {
//   return NextResponse.json({}, { headers: corsHeaders });
// }

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

    // try {
    //   const url =
    //     "https://utfs.io/f/dc5a4f73-4e49-4b6c-bed6-cbc63ed1726f-2gj.pdf";

    //   const res =
    //     axios.get(`http://127.0.0.1:8000/pdf/?link=${encodeURIComponent(url)},{
    //     headers: corsHeaders
    // }`);

    //   console.log("RES", res);
    // } catch (error) {
    //   console.error(error);
    // }

    // console.log("LINK", link);
    // return NextResponse.json(link, {
    //   headers: corsHeaders,
    // });

    return NextResponse.json(link);
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong while creating user!",
    };
  }
}
