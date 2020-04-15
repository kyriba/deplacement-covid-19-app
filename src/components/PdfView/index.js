import React, { useState, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import PDFReader from "rn-pdf-reader-js";

import getAttestation from "../../lib/CertificateGenerator";

export default function PdfView({ profile, reasons, qrCodeBase64, setPdf }) {
  const [pdfFile, setPdfFile] = useState("");

  useEffect(() => {
    getAttestation(profile, reasons, qrCodeBase64)
      .then((pdfFile) => {
        setPdfFile(pdfFile);
      })
      .catch((err) => {
        console.info(err);
      });
  }, [profile, reasons, qrCodeBase64]);

  const data = "data:application/pdf;base64," + pdfFile;
  setPdf(data);

  if (pdfFile !== "") {
    return <PDFReader source={{ base64: data }} />;
  } else {
    return (
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }
}
