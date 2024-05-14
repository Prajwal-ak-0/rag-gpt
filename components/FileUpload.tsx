// "use client";

// import { ourFileRouter } from "@/app/api/uploadthing/core";
// import { UploadButton } from "@/utils/uploadthing";
// import { toast } from "sonner";

// interface FileUploadProps {
//   onChange: (url?: string) => void;
//   endpoint: keyof typeof ourFileRouter;
// }

// export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       <UploadButton
//         endpoint={endpoint}
//         onUploadError={(error: Error) => {
//           toast.error(`${error?.message}`);
//         }}
//         onClientUploadComplete={(res) => {
//           console.log("URL", res?.[0].url);
//           onChange(res?.[0].url);
//         }}
//       />
//     </main>
//   );
// };

// Note: `useUploadThing` is IMPORTED FROM YOUR CODEBASE using the `generateReactHelpers` function
"use client";

import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { useUploadThing } from "@/utils/uploadthing";
import { useCallback, useState } from "react";
import { FaFileUpload } from "react-icons/fa";

export function FileUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { startUpload, permittedFileInfo } = useUploadThing("fileUploader", {
    onClientUploadComplete: () => {
      alert("uploaded successfully!");
    },
    onUploadError: () => {
      alert("error occurred while uploading");
    },
    onUploadBegin: () => {
      alert("upload has begun");
    },
  });

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  return (
    <div className="text-2xl cursor-pointer" {...getRootProps()}>
      <input {...getInputProps()} />
      <div>
        {files.length > 0 && (
          <button onClick={() => startUpload(files)}>
            Upload {files.length} files
          </button>
        )}
      </div>
      <FaFileUpload />
    </div>
  );
}
