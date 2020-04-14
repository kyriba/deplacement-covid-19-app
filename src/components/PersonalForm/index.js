import React, { useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { CheckBox, Text as ElementText, Button } from "react-native-elements";
import { useInputField } from "./utils";
import i18n from "i18n-js";

export default function PersonalForm({ navigation }) {
  const [isSelected1, setSelection1] = useState(false);
  const [isSelected2, setSelection2] = useState(false);
  const [isSelected3, setSelection3] = useState(false);
  const [isSelected4, setSelection4] = useState(false);
  const [isSelected5, setSelection5] = useState(false);
  const [isSelected6, setSelection6] = useState(false);
  const [isSelected7, setSelection7] = useState(false);

  var Datastore = require("react-native-local-mongodb"),
    db = new Datastore({ filename: "asyncStorageKey", autoload: true });

  const [firstName, inputfirstName] = useInputField("text");
  const [lastName, inputLastName] = useInputField("text");
  const [bithDate, inputBithDate] = useInputField("date");
  const [birthPlace, inputBirthPlace] = useInputField("text");
  const [address, inputAddress] = useInputField("text");
  const [city, inputCity] = useInputField("text");
  const [postCode, inputpostCode] = useInputField("text");

  const handleGenerate = () => {
    const profile = {
      firstname: firstName,
      lastname: lastName,
      birthday: bithDate,
      lieunaissance: birthPlace,
      address: address,
      zipcode: postCode,
      town: city,
      datesortie: "12-04-2020",
      heuresortie: "13:00",
    };

    const reasons = ["courses"];

    navigation.navigate("CertificateView", {
      profile: profile,
      reasons: reasons,
    });
  };

  return (
    <ScrollView>
      <ElementText style={styles.headerText}>
        {i18n.t("attestation")}:
      </ElementText>
      <ElementText style={styles.textMandatory}>{i18n.t("filds")}.</ElementText>
      {/* {Example()} */}
      {inputfirstName(i18n.t("firstName"), "Jean")}
      {inputLastName(i18n.t("lastName"), "Dupont")}
      {inputBithDate(i18n.t("birthday"), "01/01/1970")}
      {inputBirthPlace(i18n.t("place"), "Lyon")}
      {inputAddress(i18n.t("address"), "999 avenue de france")}
      {inputCity(i18n.t("city"), "Paris")}
      {inputpostCode(i18n.t("postCode"), "75001")}

      <Text style={styles.headerText}>{i18n.t("reason")}.</Text>
      <CheckBox
        checked={isSelected1}
        style={styles.checkbox}
        onPress={() => setSelection1(!isSelected1)}
      />
      <Text style={styles.text}>{i18n.t("reason1")}.</Text>
      <CheckBox
        checked={isSelected2}
        style={styles.checkbox}
        onPress={() => setSelection2(!isSelected2)}
      />
      <Text style={styles.text}>{i18n.t("reason2")}.</Text>
      <CheckBox
        checked={isSelected3}
        style={styles.checkbox}
        onPress={() => setSelection3(!isSelected3)}
      />
      <Text style={styles.text}>{i18n.t("reason3")}.</Text>
      <CheckBox
        checked={isSelected4}
        style={styles.checkbox}
        onPress={() => setSelection4(!isSelected4)}
      />
      <Text style={styles.text}>{i18n.t("reason4")}.</Text>
      <CheckBox
        checked={isSelected5}
        style={styles.checkbox}
        onPress={() => setSelection5(!isSelected5)}
      />
      <Text style={styles.text}>{i18n.t("reason5")}.</Text>
      <CheckBox
        checked={isSelected6}
        style={styles.checkbox}
        onPress={() => setSelection6(!isSelected6)}
      />
      <Text style={styles.text}>{i18n.t("reason6")}.</Text>
      <CheckBox
        checked={isSelected7}
        style={styles.checkbox}
        onPress={() => setSelection7(!isSelected7)}
      />
      <Text style={styles.text}>{i18n.t("reason7")}.</Text>

      <Button
        style={styles.submitButton}
        onPress={() => handleGenerate()}
        title={i18n.t("submit")}
      >
        Generate qrcode
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    marginBottom: 20,
    width: 15,
    height: 15,
    borderColor: "black",
    margin: 15,
  },
  submitButton: {
    backgroundColor: "#241e2f",
    padding: 0,
    margin: 30,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 22,
    width: 500,
    color: "blue",
    paddingTop: 50,
    paddingBottom: 25,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
  },
  textMandatory: {
    fontWeight: "bold",
    fontSize: 20,
    paddingTop: 1,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
    color: "red",
    flexGrow: 1,
    flex: 1,
  },
  text: {
    fontSize: 14,
    paddingTop: 1,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
    flexGrow: 1,
    flex: 1,
  },
});
