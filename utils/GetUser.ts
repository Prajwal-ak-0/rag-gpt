import { currentUser } from '@clerk/nextjs/server';
import client from "../lib/db";

export const getUser = async () => {
    try {
        const userClerkData = await currentUser();

        if (!userClerkData?.id) {
            return {
                error: "User ID not found!"
            }
        }

        const user = await client.user.findUnique({
            where: {
                clerkId: userClerkData.id
            }
        });

        if(!user) {
            return {
                error: "User not found!"
            }
        }

        return user;
    } catch (error) {
        console.log(error);
        return {
            error: "Something went wrong while creating user!"
        }
    }
}