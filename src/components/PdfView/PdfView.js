import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import PDFReader from "rn-pdf-reader-js";
import getAttestation from "../../lib/CertificateGenerator";

const PdfView = ({ profile, reasons, qrCodeBase64, setPdf }) => {
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
  setPdf(pdfFile);

  return pdfFile !== "" ? (
    <PDFReader source={{ base64: data }} />
  ) : (
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
};

export default PdfView;
