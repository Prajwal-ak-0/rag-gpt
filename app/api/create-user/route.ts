import { NextResponse } from "next/server";
import { currentUser } from '@clerk/nextjs/server';
import client from "@/lib/db";

export async function GET(
  request: Request, 
) {
    try {
        const userClerkData = await currentUser();

        if (!userClerkData?.id) {
            return {
                error: "User ID not found!"
            }
        }

        const hasAccount = await client.user.findUnique({
            where: {
                clerkId: userClerkData.id
            }
        });

        if (hasAccount) {
            return {
                error: "User Exists!"
            }
        }

        const user = await client.user.create({
            data: {
                clerkId: userClerkData?.id,
                username: `${userClerkData?.firstName?.toLowerCase()}-${userClerkData?.lastName?.toLowerCase()}`,
                email: userClerkData?.emailAddresses[0].emailAddress || '',
                provider: userClerkData?.externalAccounts[0].provider,
            }
        });

        return NextResponse.json(user);
    } catch (error) {
        console.log(error);
        return {
            error: "Something went wrong while creating user!"
        }
    }
}