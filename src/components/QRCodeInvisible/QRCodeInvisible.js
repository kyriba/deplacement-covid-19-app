import React from "react";
import QRCode from "react-native-qrcode-svg";
import { View, StyleSheet } from "react-native";

const QRCodeInvisible = () => {
  return (
    <View
      style={styles.invisible}
      onLayout={() =>
        this.svg.toDataURL(base64 => {
          const normalizedBase64 = base64.replace(/[^A-Za-z0-9\+\/\=]/g, ""); // has some spaces
          this.props.setQrCodeBase64(normalizedBase64);
        })
      }
    >
      <QRCode
        value={this.props.qrCodeData}
        getRef={code => (this.svg = code)}
      />
    </View>
  );
};

export default QRCodeInvisible;

const styles = StyleSheet.create({
  invisible: {
    left: -200,
  },
});
