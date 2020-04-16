import i18n from "i18n-js";
import React from "react";
import { StyleSheet, Text, StatusBar, View } from "react-native";
import { Button, Text as ElementText } from "react-native-elements";
import { useAllCheckboxes, useCheckbox, useInputsFabric } from "./utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const HeaderText = ({ text, style }) => {
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
      <ElementText style={style}>{text}</ElementText>
    </View>
  );
};

export default function PersonalForm({ navigation }) {
  const useInputField = useInputsFabric();

  const [firstName, inputfirstName] = useInputField(i18n.t("lastName"));
  const [lastName, inputLastName] = useInputField(i18n.t("birthday"));
  const [bithDate, inputBithDate] = useInputField(i18n.t("place"), "datetime");
  const [birthPlace, inputBirthPlace] = useInputField(i18n.t("address"));
  const [address, inputAddress] = useInputField(i18n.t("city"));
  const [city, inputCity] = useInputField(i18n.t("postCode"));
  const [postCode, inputpostCode] = useInputField(
    i18n.t("postCode"),
    "postalcode"
  );

  const [allChecked, addCheck, removeCheck] = useAllCheckboxes();

  const handleGenerate = () => {
    function pad(str) {
      return String(str).padStart(2, "0");
    }

    const date = new Date();
    const profile = {
      firstname: firstName,
      lastname: lastName,
      birthday: bithDate,
      lieunaissance: birthPlace,
      address: address,
      zipcode: postCode,
      town: city,
      datesortie: `${pad(date.getDate())}/${pad(
        date.getMonth() + 1
      )}/${date.getFullYear()}`,
      heuresortie: `${pad(date.getHours())}:${pad(date.getMinutes())}`,
    };

    navigation.navigate("CertificateView", {
      profile: profile,
      reasons: allChecked,
    });
  };

  return (
    <KeyboardAwareScrollView
      enableResetScrollToCoords={false}
      enableOnAndroid={true}
    >
      <StatusBar barStyle="dark-content" />
      <HeaderText text={i18n.t("attestation") + ":"} style={styles.headerText} />
      {inputfirstName(i18n.t("firstName"), "Jean")}
      {inputLastName(i18n.t("lastName"), "Dupont")}
      {inputBithDate(i18n.t("birthday"), "01/01/1970")}
      {inputBirthPlace(i18n.t("place"), "Lyon")}
      {inputAddress(i18n.t("address"), "999 avenue de france")}
      {inputCity(i18n.t("city"), "Paris")}
      {inputpostCode(i18n.t("postCode"), "75001")}

      <HeaderText text={i18n.t("reason") + ':'} style={styles.selectReasonText}/>

      {[
        "travail",
        "courses",
        "sante",
        "famille",
        "sport",
        "judiciaire",
        "missions",
      ].map((label) => {
        return useCheckbox(label, addCheck, removeCheck);
      })}

      <Button
        style={styles.submitButton}
        disabled={
          !firstName ||
          !lastName ||
          !bithDate ||
          !birthPlace ||
          !address ||
          !city ||
          !postCode ||
          !allChecked.length
        }
        onPress={() => handleGenerate()}
        title={i18n.t("submit")}
      >
        Generate qrcode
      </Button>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: "#241e2f",
    padding: 0,
    margin: 30,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "black",
    paddingTop: 50,
    paddingBottom: 25,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
    flexShrink: 1,
  },
  selectReasonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "black",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
    flexShrink: 1,
  },
});
