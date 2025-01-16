// import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist/legacy/build/pdf';
// import pdfWorker from 'pdfjs-dist/legacy/build/pdf.worker.entry';

// // Указываем локальный воркер
// GlobalWorkerOptions.workerSrc = pdfWorker;

// export const extractTextFromPDF = async (file: File): Promise<string> => {
//     const pdfData = await file.arrayBuffer();
//     const pdf = await getDocument({ data: pdfData }).promise;
//     let textContent = "";

//     for (let i = 1; i <= pdf.numPages; i++) {
//         const page = await pdf.getPage(i);
//         const text = await page.getTextContent();
//         textContent += text.items.map((item: any) => item.str).join(" ") + " ";
//     }

//     return textContent;
// };
