import { createUploadthing, type FileRouter } from "uploadthing/next";

import client from "@/lib/db";
import { getUser  } from "@/utils/GetUser";
 
const f = createUploadthing();
 
export const ourFileRouter = {
  fileUploader: f({ 
    "application/pdf": { 
      maxFileSize: "16MB", 
      maxFileCount: 5 
    } 
  })
    .middleware(async () => {
      const self = await getUser();

      return { user: self }
    })
    .onUploadComplete(async ({ metadata, file }) => {
        if ('clerkId' in metadata.user) {
            const user = await client.user.findUnique({
                where: {
                    clerkId: metadata.user.clerkId
                }
            });

            if (user && user.link) {
              await client.user.update({
                where:{
                  clerkId: metadata.user.clerkId
                },
                data:{
                  link: {
                    set: `${user.link},${file.url}`
                  }
                }
              });
            } else {
                await client.user.update({
                    where:{
                        clerkId: metadata.user.clerkId
                    },
                    data:{
                        link: file.url
                    }
                });
            }
        }

        return { fileUrl: file.url };
    })
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;