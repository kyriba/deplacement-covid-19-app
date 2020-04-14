import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { Text as ElementText, Button } from "react-native-elements";
import { useInputField, useCheckbox, useAllCheckboxes } from "./utils";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import i18n from "i18n-js";

const Example = () => {
    const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  
    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleConfirm = (date) => {
      console.warn("A date has been picked: ", date);
      hideDatePicker();
    };
  
    return (
      <View>
        <Button title="Show Date Picker" onPress={showDatePicker} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    );
  };
  
export default function PersonalForm({ navigation }) {

  var Datastore = require("react-native-local-mongodb"),
    db = new Datastore({ filename: "asyncStorageKey", autoload: true });

  const [firstName, inputfirstName] = useInputField("text");
  const [lastName, inputLastName] = useInputField("text");
  const [bithDate, inputBithDate] = useInputField("date");
  const [birthPlace, inputBirthPlace] = useInputField("text");
  const [address, inputAddress] = useInputField("text");
  const [city, inputCity] = useInputField("text");
  const [postCode, inputpostCode] = useInputField("text");

  const [allChecked, addCheck, removeCheck] = useAllCheckboxes();

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

    navigation.navigate("CertificateView", {
      profile: profile,
      reasons: allChecked,
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
