import { PDFDocumentProxy } from "pdfjs-dist";
const pdfjs = require("pdfjs-dist/build/pdf.mjs");

export const fetchAndExtractPDFContent = async (): Promise<string> => {
  try {
    const response = await fetch(
      "https://utfs.io/f/dc5a4f73-4e49-4b6c-bed6-cbc63ed1726f-2gj.pdf"
    );
    const pdfData = await response.arrayBuffer();

    const pdf = await pdfjs.getDocument(pdfData).promise;

    let content = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      textContent.items.forEach((item: any) => {
        content += item.str + " ";
      });
    }

    console.log("PDF content:", content.trim());

    return content.trim();
  } catch (error) {
    console.error("Error fetching or extracting PDF content:", error);
    throw error;
  }
};
