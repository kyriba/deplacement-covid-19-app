import i18n from "i18n-js";
import * as Localization from "expo-localization";

const initializeTranslations = () => {
  i18n.translations = {
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
      form: "Form",
      generate: "Generate qrcode",
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
      form: "Forme",
      generate: "Generate qrcode",
    },
  };

  i18n.locale = Localization.locale;
  i18n.fallbacks = true;
};

export default initializeTranslations;
