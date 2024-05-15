import { createUploadthing, type FileRouter } from "uploadthing/next";

import client from "@/lib/db";
import { getUser  } from "@/utils/GetUser";
import { UploadPDFContentToVectorDB } from "@/utils/Rag";
 
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

            if (!user) {
                throw new Error("User not found");
            }

            const updatedLinks = [...user.links, file.url]; // replace newLink with your actual link

            const link = await client.user.update({
              where:{
                clerkId:metadata.user.clerkId
              },
              data:{
                links:updatedLinks
              }
            })

            const uploadFiles = await UploadPDFContentToVectorDB(file.url);

            if(uploadFiles.success){
              console.log("Upload Success");
            }
            
            console.log("Link", link);
        }

        return { fileUrl: file.url };
    })
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;