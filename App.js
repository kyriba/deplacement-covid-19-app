import * as React from 'react'

import { Platform, StyleSheet, Text, View, TextInput, Button } from 'react-native';
const instructions = Platform.select({
  ios: `Press Cmd+R to reload,\nCmd+D or shake for dev menu`,
  android: `Double tap R on your keyboard to reload,\nShake or press menu button for dev menu`,
});



const Row = ({children}) => {
  return (<View>{children}</View>)
}

const useInput = initialState => {
    const [value, setValue] = React.useState(initialState);
    const onChange = e => setValue(e.target.value)
    return[value, onChange, setValue]
}


  const useInputField = type => {
    const initialState = '';
    
    const [value, onInputChange, setValue] = useInput(initialState);

    const input = (name, placeholder) => {
        return (
          <Row>
            <Text style={styles.inputLabel}>{name}</Text>
            <TextInput style={styles.input}
                name={name}
                value={value}
                onChange={onInputChange}
                type={type}
                placeholder={placeholder}
            />
            </Row>
        );
    };

    const reset = () => {
        setValue(initialState);
    };

    return [value, input, reset, setValue];


}

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

    const [firstName, inputfirstName] = useInputField('text')
    const [lastName, inputLastName] = useInputField('text')
    const [bithDate, inputBithDate] = useInputField('date')
    const [birthPlace, inputBirthPlace] = useInputField('text')
    const [address, inputAddress] = useInputField('text')
    const [city, inputCity] = useInputField('text')
    const [postCode, inputpostCode] = useInputField('text')

    return (
    <View style={styles.container}>
      <Row>
      <Text style={styles.title1}>Remplissez en ligne votre attestation numérique :</Text>
      <Text style={styles.title2}>Tous les champs sont obligatoires.</Text>
      </Row>
      {inputfirstName('Prénom', 'Jean')}
      {inputLastName('Nom', 'Dupont')}
      {inputBithDate('Date de naissance (au format jj/mm/aaaa)', '01/01/1970')}
      {inputBirthPlace('Lieu de naissance', 'Lyon')}
      {inputAddress('Adresse', '999 avenue de france')}
      {inputCity('Ville', 'Paris')}
      {inputpostCode('Code Postal', '75001')}
      <Button onClick={handleGenerate()} title="Press Me" >Generate qrcode</Button>
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
    display: "flex",
  }

});
