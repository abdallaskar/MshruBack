// import express from 'express';
// import { generatePdfBuffer } from '../utils/pdfGenerator.js';

// const pdfRouter = express.Router();

// pdfRouter.post('/generate', async (req, res, next) => {
//     try {
//         const formData = req.body;

//         const pdfBuffer = await generatePdfBuffer(formData);

//         res.set({
//             'Content-Type': 'application/pdf',
//             'Content-Disposition': 'attachment; filename="report.pdf"',
//         });

//         res.send(pdfBuffer);
//     } catch (error) {
//         console.error(error);
//         next(error);
//     }
// });

// export default pdfRouter;
