import { currentUser } from '@clerk/nextjs/server';
import client from "../lib/db";

export const createUser = async () => {
    try {
        const userClerkData = await currentUser();

        if (!userClerkData?.id) {
            return {
                error: "User ID not found!"
            }
        }

        const hasAccount = await userExists(userClerkData.id);

        if (hasAccount) {
            return {
                error: "User Exists!"
            }
        }

        const user = await client.user.create({
            data: {
                clerkId: userClerkData?.id,
                username: `${userClerkData?.firstName?.toLowerCase()}-${userClerkData?.lastName?.toLowerCase()}`,
                email: userClerkData?.emailAddresses[0].emailAddress || '', // Ensure email is not null
                provider: userClerkData?.externalAccounts[0].provider,
            }
        });

        return user;
    } catch (error) {
        console.log(error);
        return {
            error: "Something went wrong while creating user!"
        }
    }
}

export const addApiKey = async (userId: string, apiKey: string) => {
    try {

        const hasAccount = await userExists(userId);

        if (!hasAccount) {
            return {
                error: "User not found!"
            }
        }

        const isValidApiKey = (apiKey: string) => {
            const pattern = /^sk-([a-zA-Z0-9-]+)$/;
            return pattern.test(apiKey);
        };

        if (!isValidApiKey(apiKey)) {
            return {
                error: "Invalid API Key!"
            }
        }

        const user = await client.user.update({
            where: {
                clerkId: userId
            },
            data: {
                apiKey: apiKey,
                isApiVerified: true
            }
        });

        return {
            message : "API Key added successfully!",
            user
        }

    } catch (error) {
        console.log(error);
        return {
            error: "Something went wrong while adding API Key!"
        }
    }
}

export const userExists = async (userId: string) => {
    try {
        const user = await client.user.findFirst({
            where: {
                clerkId: userId
            }
        });

        if (!user) {
            return false;
        }

        return true;
    } catch (error) {
        console.log(error);
        return {
            error: "Something went wrong while checking user!"
        }
    }
}