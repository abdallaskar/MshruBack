// import React from 'react';
// import { renderToBuffer, Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';

// const MyPDFDocument = ({ formData }) => {
//   const styles = StyleSheet.create({
//     page: { padding: 30, position: 'relative' },
//     title: { fontSize: 20, marginBottom: 10, textAlign: 'center' },
//     text: { fontSize: 12, marginBottom: 5 },
//     backgroundImage: {
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       width: '100%',
//       height: '100%',
//       opacity: 0.15,
//     },
//     logo: {
//       width: 100,
//       height: 100,
//       marginBottom: 20,
//       alignSelf: 'center',
//     },
//   });

//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         <Image
//           src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGYOgzfc1Zgh_smVfBQnl-S2nPquwDlnIOrg&s"
//           style={styles.backgroundImage}
//         />
//         <Image
//           src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png"
//           style={styles.logo}
//         />
//         <Text style={styles.title}>بيانات المشروع</Text>
//         <Text style={styles.text}>اسم المشروع: {formData.projectName}</Text>
//         <Text style={styles.text}>مالك المشروع: {formData.ownerName}</Text>
//         <Text style={styles.text}>البريد الإلكتروني: {formData.email}</Text>
//       </Page>
//     </Document>
//   );
// };

// export const generatePdfBuffer = async (formData) => {
//   const pdfBuffer = await renderToBuffer(<MyPDFDocument formData={formData} />);
//   return pdfBuffer;
// };
