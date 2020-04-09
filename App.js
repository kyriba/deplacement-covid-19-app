import * as React from 'react';
import { Platform, StyleSheet, Text, View, TextInput } from 'react-native';
import "./src/main.css"
const instructions = Platform.select({
  ios: `Press Cmd+R to reload,\nCmd+D or shake for dev menu`,
  android: `Double tap R on your keyboard to reload,\nShake or press menu button for dev menu`,
});

export default function App() {
  return (
    <View style={styles.container}>
      <h1 className="flex flex-wrap">
                <span className="covid-title">
                    COVID-19
                </span>
        <span className="covid-subtitle">
                    Générateur d'attestation de&nbsp;déplacement&nbsp;dérogatoire
                </span>
      </h1>

      <p className="alert  alert-danger  d-none" role="alert" id="alert-facebook"></p>

      <div className="wrapper">

        <form id="form-profile" accept-charset="UTF-8">
          <h2 className="titre-2">Remplissez en ligne votre attestation numérique :</h2>
          <p className="text-alert">Tous les champs sont obligatoires.</p>

          <div className="form-group">
            <label htmlFor="field-firstname" id="field-firstname-label">Prénom</label>
            <div className="input-group  align-items-center">
              <input
                  type="text"
                  className="form-control"
                  id="field-firstname"
                  name="firstname"
                  autoComplete="given-name"
                  placeholder="Jean"
                  required
                  autoFocus
              />
                <span className="validity" aria-hidden="true"></span>
            </div>
            <p className="exemple"></p>
          </div>

          <div className="form-group">
            <label htmlFor="field-lastname" id="field-lastname-label">Nom</label>
            <div className="input-group  align-items-center">
              <input
                  type="text"
                  className="form-control"
                  id="field-lastname"
                  name="lastname"
                  autoComplete="family-name"
                  placeholder="Dupont"
                  required
                  autoFocus
              />
                <span className="validity" aria-hidden="true"></span>
            </div>
            <p className="exemple"></p>
          </div>

          <div className="form-group">
            <label htmlFor="field-birthday" id="field-birthday-label">Date de naissance (au format jj/mm/aaaa)</label>
            <div className="input-group  align-items-center">
              <input
                  type="text"
                  pattern="^([0][1-9]|[1-2][0-9]|30|31)/([0][1-9]|10|11|12)/(19[0-9][0-9]|20[0-1][0-9]|2020)"
                  inputMode="numeric"
                  className="form-control"
                  id="field-birthday"
                  name="birthday"
                  autoComplete="bday"
                  placeholder="01/01/1970"
                  maxLength="10"
                  required
              />
                <span className="validity" aria-hidden="true"></span>
            </div>
            <p className="exemple"></p>
          </div>

          <div className="form-group">
            <label htmlFor="field-lieunaissance" id="field-lieunaissance-label">Lieu de naissance</label>
            <div className="input-group  align-items-center">
              <input
                  type="text"
                  className="form-control"
                  id="field-lieunaissance"
                  name="lieunaissance"
                  placeholder="Lyon"
                  required
              />
                <span className="validity" aria-hidden="true"></span>
            </div>
            <p className="exemple"></p>
          </div>

          <div className="form-group">
            <label htmlFor="field-address" id="field-address-label">Adresse</label>
            <div className="input-group  align-items-center">
              <input
                  type="text"
                  className="form-control"
                  id="field-address"
                  name="address"
                  autoComplete="address-line1"
                  placeholder="999 avenue de france"
                  required
              />
                <span className="validity" aria-hidden="true"></span>
            </div>
            <p className="exemple"></p>
          </div>

          <div className="form-group">
            <label htmlFor="field-town" id="field-town-label">Ville</label>
            <div className="input-group  align-items-center">
              <input
                  type="text"
                  className="form-control"
                  id="field-town"
                  name="town"
                  autoComplete="address-level1"
                  placeholder="Paris"
                  required
              />
                <span className="validity" aria-hidden="true"></span>
            </div>
            <p className="exemple"></p>
          </div>

          <div className="form-group">
            <label htmlFor="field-zipcode" id="field-zipcode-label">Code Postal</label>
            <div className="input-group  align-items-center">
              <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]{5}"
                  min="00000"
                  max="99999"
                  className="form-control"
                  id="field-zipcode"
                  name="zipcode"
                  autoComplete="postal-code"
                  minLength="4"
                  maxLength="5"
                  placeholder="75001"
                  required
              />
                <span className="validity" aria-hidden="true"></span>
            </div>
            <p className="exemple"></p>
          </div>

          <fieldset>
            <legend className="title-3">Choisissez le ou les motif(s) de sortie</legend>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" name="field-reason" id="checkbox-travail"
                     value="travail"/>
                <label className="form-check-label" htmlFor="checkbox-travail">Déplacements entre le domicile et le lieu
                  d’exercice de l’activité professionnelle, lorsqu'ils sont indispensables à l'exercice d’activités ne
                  pouvant être organisées sous forme de télétravail ou déplacements professionnels ne pouvant être
                  différés.</label>
            </div>

            <div className="form-check">
              <input className="form-check-input" type="checkbox" name="field-reason" id="checkbox-courses"
                     value="courses"/>
                <label className="form-check-label" htmlFor="checkbox-courses">Déplacements pour effectuer des achats de
                  fournitures nécessaires à l’activité professionnelle et des achats de première nécessité dans des
                  établissements dont les activités demeurent autorisées <a
                      href="https://www.service-public.fr/particuliers/actualites/A13921" target="_blank">(liste sur
                    gouvernement.fr)</a>.</label>
            </div>

            <div className="form-check">
              <input className="form-check-input" type="checkbox" name="field-reason" id="checkbox-sante" value="sante"/>
                <label className="form-check-label" htmlFor="checkbox-sante">Consultations et soins ne pouvant être
                  assurés à distance et ne pouvant être différés ; consultations et soins des patients atteints d'une
                  affection de longue durée.</label>
            </div>

            <div className="form-check">
              <input className="form-check-input" type="checkbox" name="field-reason" id="checkbox-famille"
                     value="famille"/>
                <label className="form-check-label" htmlFor="checkbox-famille">Déplacements pour motif familial
                  impérieux, pour l’assistance aux personnes vulnérables ou la garde d’enfants.</label>
            </div>

            <div className="form-check">
              <input className="form-check-input" type="checkbox" name="field-reason" id="checkbox-sport" value="sport"/>
                <label className="form-check-label" htmlFor="checkbox-sport">Déplacements brefs, dans la limite d'une
                  heure quotidienne et dans un rayon maximal d'un kilomètre autour du domicile, liés soit à l'activité
                  physique individuelle des personnes, à l'exclusion de toute pratique sportive collective et de toute
                  proximité avec d'autres personnes, soit à la promenade avec les seules personnes regroupées dans un
                  même domicile, soit aux besoins des animaux de compagnie.</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" name="field-reason" id="checkbox-judiciaire"
                     value="judiciaire"/>
                <label className="form-check-label" htmlFor="checkbox-judiciaire">Convocation judiciaire ou
                  administrative.</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" name="field-reason" id="checkbox-missions"
                     value="missions"/>
                <label className="form-check-label" htmlFor="checkbox-missions">Participation à des missions d’intérêt
                  général sur demande de l’autorité administrative.</label>
            </div>
          </fieldset>

          <div className="form-group">
            <label htmlFor="field-datesortie">Date de sortie</label>
            <div className="input-group  align-items-center">
              <input type="date" className="form-control" id="field-datesortie" name="datesortie"
                     placeholder="JJ/MM/YYYY" required/>
                <span className="validity" aria-hidden="true"></span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="field-heuresortie">Heure de sortie</label>
            <div className="input-group  align-items-center">
              <input type="time" className="form-control" id="field-heuresortie" name="heure" required />
                <span className="validity" aria-hidden="true"></span>
            </div>
          </div>


          <p className="text-center mt-5">
            <button type="button" id="generate-btn" className="btn btn-primary btn-attestation"><span><i
                className="fa fa-file-pdf inline-block mr-1"></i>  Générer mon attestation</span></button>
          </p>


        </form>
      </div>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  titre2: {
    textAlign: 'left',
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#000191",
  },
  textAlert: {
    textAlign: "left",
    color: "#000000",
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
