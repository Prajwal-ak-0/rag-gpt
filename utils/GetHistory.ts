"use server"

import client from "@/lib/db";
import { currentUser } from '@clerk/nextjs/server';

export const GetHistory = async () => {
    try {

        const userClerkData = await currentUser();

        if (!userClerkData?.id) {
            return {
                error: "User ID not found!"
            }
        }
        
        const history = await client.chatHistory.findMany({
            where: {
                clerkId: userClerkData?.id
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        return history;
    } catch (error) {
        console.log(error);
        return {
            error: "Something went wrong while fetching history!"
        }
    }
}