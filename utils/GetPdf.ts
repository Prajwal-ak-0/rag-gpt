"use server";

import { WebPDFLoader } from "langchain/document_loaders/web/pdf";

export const GetPDF = async (url:string) => {
  const response = await fetch(url);
  const blob = await response.blob();
  const loader = new WebPDFLoader(blob);
  const docs = await loader.load();
  let jsonContent = JSON.stringify(docs[0].pageContent);
  console.log(jsonContent);
  return jsonContent;
};
