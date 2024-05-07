import { NextResponse } from "next/server";
import { currentUser } from '@clerk/nextjs/server';
import client from "@/lib/db";
import bcrypt from "bcrypt"

export async function POST(
  request: Request, 
) {
    try {
        const userClerkData = await currentUser();

        if (!userClerkData?.id) {
            return {
                error: "User ID not found!"
            }
        }

        const body = await request.json();

        const {  apiKey } = body;

        const isValidApiKey = (apiKey:string) => {
            const pattern = /^sk-([a-zA-Z0-9-]+)$/;
            return pattern.test(apiKey);
        }

        if (!isValidApiKey(apiKey)) {
            return {
                error: "Invalid API Key!"
            }
        }

        const hashedApiKey = await bcrypt.hash(apiKey, 10);

        const setApiKey = await client.user.update({
            where: {
                clerkId: userClerkData.id
            },
            data: {
                apiKey: hashedApiKey,
                isApiVerified: true
            }
        });

        return NextResponse.json(setApiKey);
    } catch (error) {
        console.log(error);
        return {
            error: "Something went wrong while creating user!"
        }
    }
}