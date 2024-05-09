// import { NextResponse } from "next/server";
// import { currentUser } from '@clerk/nextjs/server';
// import client from "@/lib/db";

// export async function POST(
//   request: Request, 
// ) {
//     try {
//         const userClerkData = await currentUser();

//         if (!userClerkData?.id) {
//             return {
//                 error: "User ID not found!"
//             }
//         }

//         const hasAccount = await client.user.findUnique({
//             where: {
//                 clerkId: userClerkData.id
//             }
//         });

//         if (!hasAccount) {
//             return {
//                 error: "User Does Not Exists!"
//             }
//         }

//         const body = await request.json();

//         const { url } = body;

//         if (!url) {
//             return {
//                 error: "URL is required!"
//             }
//         }



//     } catch (error) {
//         console.log(error);
//         return {
//             error: "Something went wrong while creating user!"
//         }
//     }
// }