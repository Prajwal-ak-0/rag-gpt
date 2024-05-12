"use server";

import axios from 'axios';
import fs from 'fs';
import path from 'path';

export async function DownloadPDF(url: string): Promise<void> {
    try {
        // Make GET request to download the PDF
        const response = await axios.get(url, {
            responseType: 'stream'
        });

        // Extract filename from URL
        const filename = url.substring(url.lastIndexOf('/') + 1);

        // Specify the path to the "pdf" folder in the root directory
        const pdfFolderPath = path.resolve(process.cwd(), 'pdf');
        const filePath = path.join(pdfFolderPath, filename);

        // Create a writable stream to save the PDF
        const fileStream = fs.createWriteStream(filePath);

        // Pipe the response data to the file stream
        response.data.pipe(fileStream);

        // Wait for the stream to finish writing
        await new Promise<void>((resolve, reject) => {
            fileStream.on('finish', resolve);
            fileStream.on('error', reject);
        });

        console.log(`PDF downloaded successfully: ${filePath}`);
    } catch (error) {
        console.error('Error downloading PDF:', error);
    }
}