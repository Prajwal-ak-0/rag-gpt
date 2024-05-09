import { NextResponse } from "next/server";
import { currentUser } from '@clerk/nextjs/server';
import client from "@/lib/db";
import {readPdfText} from 'pdf-text-reader';

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

        const link = await client.user.findUnique({
            where: {
                clerkId: userClerkData.id
            },
            select: {
                link: true
            }
        })
        
        if (!link) {
            return {
                error: "Link not found!"
            }
        }
        
        console.log(link);

        return NextResponse.json(link);
    } catch (error) {
        console.log(error);
        return {
            error: "Something went wrong while creating user!"
        }
    }
}