import * as React from 'react';
import { Platform, StyleSheet, Text, View, TextInput, Button } from 'react-native';
const instructions = Platform.select({
  ios: `Press Cmd+R to reload,\nCmd+D or shake for dev menu`,
  android: `Double tap R on your keyboard to reload,\nShake or press menu button for dev menu`,
});

export default function App() {
  const  handleClick = async () => {
    event.preventDefault()

    saveProfile()
    const reasons = getAndSaveReasons()
    const pdfBlob = await generatePdf(getProfile(), reasons)
    localStorage.clear()
    downloadBlob(pdfBlob, 'attestation.pdf')

    snackbar.classList.remove('d-none')
    setTimeout(() => snackbar.classList.add('show'), 100)

    setTimeout(function () {
      snackbar.classList.remove('show')
      setTimeout(() => snackbar.classList.add('d-none'), 500)
    }, 6000)
  }

    const handleGenerate = () => {
      console.log("Generate")
    }

    return (
    <View style={styles.container}>
      <Text style={styles.title1}>Remplissez en ligne votre attestation numérique :</Text>
      <Text style={styles.title2}>Tous les champs sont obligatoires.</Text>
      <Text style={styles.inputLabel}>Prénom</Text>
      <TextInput style={styles.input} placeholder="Jean"/>
      <Text style={styles.inputLabel}>Nom</Text>
      <TextInput style={styles.input} placeholder="Dupont"/>
      <Text style={styles.inputLabel}>Date de naissance (au format jj/mm/aaaa)</Text>
      <TextInput style={styles.input} placeholder="01/01/1970"/>
      <Text style={styles.inputLabel}>Lieu de naissance</Text>
      <TextInput style={styles.input} placeholder="Lyon"/>
      <Text style={styles.inputLabel}>Adresse</Text>
      <TextInput style={styles.input} placeholder="999 avenue de france"/>
      <Text style={styles.inputLabel}>Ville</Text>
      <TextInput style={styles.input} placeholder="Paris"/>
      <Text style={styles.inputLabel}>Code Postal</Text>
      <TextInput style={styles.input} placeholder="75001"/>
      <Button onClick={handleGenerate()} >Generate qrcode</Button>
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
  title1: {},
  title2: {},
  inputLabel: {},
  input: {
    color: "red",
  },
  row: {
    display: "flex"
  }

});
