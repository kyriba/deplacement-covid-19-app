import React, { useState } from "react";
import { Button, Icon } from "react-native-elements";
import { Platform } from "react-native";

import QRCodeInvisible from "../QRCodeInvisible";
import PdfView from "../PdfView";

import RNShareFile from "react-native-share-pdf";

import { getQrCodeData } from "../../lib/CertificateGenerator";

export default function CertificateView({ route, navigation }) {
  const { profile, reasons } = route.params;

  const qrCodeData = getQrCodeData(profile, reasons);
  const [qrCodeBase64, setQrCodeBase64] = useState("");

  const [pdf, setPdf] = useState("");

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          type="clear"
          style={{ paddingRight: 10 }}
          icon={
            <Icon
              name={Platform.OS === "ios" ? "share-apple" : "share-google"}
              type="evilicon"
              size={35}
              color="#2089dc"
            />
          }
          onPress={async () => await RNShareFile.sharePDF(pdf, "test")}
        />
      ),
    });
  }, [pdf, navigation]);

  return (
    <>
      {qrCodeBase64 === "" && (
        <QRCodeInvisible
          qrCodeData={qrCodeData}
          setQrCodeBase64={setQrCodeBase64}
        />
      )}
      <PdfView
        profile={profile}
        reasons={reasons}
        qrCodeBase64={qrCodeBase64}
        setPdf={setPdf}
      />
    </>
  );
}
