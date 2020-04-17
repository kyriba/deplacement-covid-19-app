import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import i18n from "i18n-js";
import "react-native-gesture-handler";
import CertificateView from "../CertificateView";
import PersonalForm from "../PersonalForm";
import initializeTranslations from "../translation";

const Stack = createStackNavigator();
initializeTranslations();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="PersonalForm"
          component={PersonalForm}
          options={{ title: i18n.t("form"), headerShown: false }}
        />
        <Stack.Screen
          name="CertificateView"
          component={CertificateView}
          options={{ title: i18n.t("certificate") }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
