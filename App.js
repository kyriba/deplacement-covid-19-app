import "react-native-gesture-handler";

import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import {
  CheckBox,
  Input as TextInput,
  Text as ElementText,
  Button,
} from "react-native-elements";
// import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Localization from "expo-localization";
import i18n from "i18n-js";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import PersonalForm from "./src/components/PersonalForm";
import CertificateView from "./src/components/CertificateView";

i18n.translations = {
  en: {
    firstName: "First name",
    lastName: "Last name",
    attestation: "Fill in your digital certificate",
    filds: "All fields are mandatory",
    birthday: "Date of birth (in dd / mm / yyyy format)",
    place: "Place of birth",
    address: "Address",
    city: "City",
    postCode: "Postal code",
    submit: "submit",
    reason: "Choose the exit reason (s)",
    reason1:
      "Travel between the home and the place of exercise of the professional activity, when they are " +
      "essential for the exercise of activities which cannot be organized in the form of telework or professional trips which cannot be deferred.",
    reason2:
      "Travel to purchase supplies necessary for professional activity and purchases of basic necessities in establishments whose activities remain authorized",
    reason3:
      "Consultations and care that cannot be provided remotely and that cannot be deferred; consultations and care of patients with a long-term condition.",
    reason4:
      "Travel for compelling family reasons, for assistance to vulnerable people or childcare.",
    reason5:
      "Brief trips, within the limit of one hour daily and within a maximum radius of one kilometer around the home, " +
      "linked either to the individual physical activity of the people, to the exclusion of any collective sporting " +
      "practice and any proximity to d 'other people, either walking with the only people in the same home, or the needs of pets.",
    reason6: "Judicial or administrative summons.",
    reason7:
      "Participation in missions of general interest at the request of the administrative authority.",
  },
  fr: {
    firstName: "Prénom",
    lastName: "Nom",
    attestation: "Remplissez en ligne votre attestation numérique",
    filds: "Tous les champs sont obligatoires",
    birthday: "Date de naissance (au format jj/mm/aaaa)",
    place: "Lieu de naissance",
    address: "Adresse",
    city: "Ville",
    postCode: "Code Postal",
    submit: "Loin",
    reason: "Choisissez le ou les motif(s) de sortie",
    reason1:
      "Déplacements entre le domicile et le lieu d’exercice de l’activité professionnelle, lorsqu'ils sont " +
      "indispensables à l'exercice d’activités ne pouvant être organisées sous forme de télétravail ou déplacements professionnels ne pouvant être différés.",
    reason2:
      "Déplacements pour effectuer des achats de fournitures nécessaires à l’activité professionnelle et des achats " +
      "de première nécessité dans des établissements dont les activités demeurent autorisées",
    reason3:
      "Consultations et soins ne pouvant être assurés à distance et ne pouvant être différés ; consultations et soins " +
      "des patients atteints d'une affection de longue durée.",
    reason4:
      "Déplacements pour motif familial impérieux, pour l’assistance aux personnes vulnérables ou la garde d’enfants.",
    reason5:
      "Déplacements brefs, dans la limite d'une heure quotidienne et dans un rayon maximal d'un kilomètre autour " +
      "du domicile, liés soit à l'activité physique individuelle des personnes, à l'exclusion de toute pratique sportive " +
      "collective et de toute proximité avec d'autres personnes, soit à la promenade avec les seules personnes " +
      "regroupées dans un même domicile, soit aux besoins des animaux de compagnie.",
    reason6: "Judicial or administrative summons.",
    reason7:
      "Participation à des missions d’intérêt général sur demande de l’autorité administrative.",
  },
};

i18n.locale = Localization.locale;
i18n.fallbacks = true;

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

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="PersonalForm"
          component={PersonalForm}
          options={{ title: "Form" }}
        />
        <Stack.Screen
          name="CertificateView"
          component={CertificateView}
          options={{ title: "Certificate" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
