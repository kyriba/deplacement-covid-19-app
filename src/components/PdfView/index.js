import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import PDFReader from "rn-pdf-reader-js";
import getAttestation from "../../lib/CertificateGenerator";

export default function PdfView({ profile, reasons, qrCodeBase64, setPdf }) {
  const [pdfFile, setPdfFile] = useState("");

  useEffect(() => {
    getAttestation(profile, reasons, qrCodeBase64)
      .then(pdfFile => {
        setPdfFile(pdfFile);
      })
      .catch(err => {
        console.info(err);
      });
  }, [profile, reasons, qrCodeBase64]);

  const data = "data:application/pdf;base64," + pdfFile;
  console.log('SEtting PDF', data.length);
  
  setPdf(pdfFile);

  if (pdfFile !== "") {
    return <PDFReader source={{ base64: data }} />;
  } else {
    return (
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }
}
