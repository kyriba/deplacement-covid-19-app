import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Localization from "expo-localization";
import i18n from "i18n-js";
import "react-native-gesture-handler";
import CertificateView from "./src/components/CertificateView";
import PersonalForm from "./src/components/PersonalForm";

const Stack = createStackNavigator();

i18n.translations = {
  zh: {
  firstName: "名",
  lastName: "姓",
  attestation: "请填写您的数字证书(digital certificate)",
  filds: "所有字段为必填",
  birthday: "出生年月日 (按照 dd / mm / yyyy 格式)",
  place: "出生地",
  address: "地址",
  city: "城市",
  postCode: "邮编",
  submit: "提交",
  reason: "请选择出行原因",
  travail: "在家和工作地之间的通勤，或无法推迟的商务出差，并且所从事的工作无法以远程工作的方式进行。" ,
  courses: "外出至得到授权的场所，购买与工作活动或生活相关的必需品。",
  sante: "无法远程进行或无法推迟的医疗护理和问诊；对需要长期进行护理或问诊的病人所进行的医疗活动。",
  famille: "出于不可抗拒的家庭原因，出行援助弱势人群或照管儿童。",
  sport: "每天不超过一小时，离家不超过一公里范围内的活动。活动仅限于不与他人近距离接触或非群体聚集的个人体育运动；亦或是与唯一的同居者散步，或遛狗等满足宠物需求的活动",
  judiciaire: "司法或行政传唤.",
  missions: "应行政当局要求参与与公众利益相关的任务.",
  certificate: "证书",
  form: "表格"
  },
  en: {
    firstName: "First name",
    lastName: "Last name",
    attestation: "Fill in your digital certificate",
    birthday: "Date of birth (in dd / mm / yyyy format)",
    place: "Place of birth",
    address: "Address",
    city: "City",
    postCode: "Postal code",
    submit: "submit",
    reason: "Choose the exit reason (s)",
    travail:
      "Travel between the home and the place of exercise of the professional activity, when they are " +
      "essential for the exercise of activities which cannot be organized in the form of telework or professional trips which cannot be deferred.",
    courses:
      "Travel to purchase supplies necessary for professional activity and purchases of basic necessities in establishments whose activities remain authorized.",
    sante:
      "Consultations and care that cannot be provided remotely and that cannot be deferred; consultations and care of patients with a long-term condition.",
    famille:
      "Travel for compelling family reasons, for assistance to vulnerable people or childcare.",
    sport:
      "Brief trips, within the limit of one hour daily and within a maximum radius of one kilometer around the home, " +
      "linked either to the individual physical activity of the people, to the exclusion of any collective sporting " +
      "practice and any proximity to d 'other people, either walking with the only people in the same home, or the needs of pets.",
    judiciaire: "Judicial or administrative summons.",
    missions:
      "Participation in missions of general interest at the request of the administrative authority.",
    certificate: "Certificate",
    form: "Form"
  },
  fr: {
    firstName: "Prénom",
    lastName: "Nom",
    attestation: "Remplissez votre attestation numérique",
    birthday: "Date de naissance (au format jj/mm/aaaa)",
    place: "Lieu de naissance",
    address: "Adresse",
    city: "Ville",
    postCode: "Code Postal",
    submit: "loin",
    reason: "Choisissez le ou les motif(s) de sortie",
    travail:
      "Déplacements entre le domicile et le lieu d’exercice de l’activité professionnelle, lorsqu'ils sont " +
      "indispensables à l'exercice d’activités ne pouvant être organisées sous forme de télétravail ou déplacements professionnels ne pouvant être différés.",
    courses:
      "Déplacements pour effectuer des achats de fournitures nécessaires à l’activité professionnelle et des achats " +
      "de première nécessité dans des établissements dont les activités demeurent autorisées.",
    sante:
      "Consultations et soins ne pouvant être assurés à distance et ne pouvant être différés ; consultations et soins " +
      "des patients atteints d'une affection de longue durée.",
    famille:
      "Déplacements pour motif familial impérieux, pour l’assistance aux personnes vulnérables ou la garde d’enfants.",
    sport:
      "Déplacements brefs, dans la limite d'une heure quotidienne et dans un rayon maximal d'un kilomètre autour " +
      "du domicile, liés soit à l'activité physique individuelle des personnes, à l'exclusion de toute pratique sportive " +
      "collective et de toute proximité avec d'autres personnes, soit à la promenade avec les seules personnes " +
      "regroupées dans un même domicile, soit aux besoins des animaux de compagnie.",
    judiciaire: "Judicial or administrative summons.",
    missions:
      "Participation à des missions d’intérêt général sur demande de l’autorité administrative.",
    certificate: "Attestation",
    form: "Forme"
  },
};

i18n.locale = Localization.locale;
i18n.fallbacks = true;

export default function App() {
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
}
