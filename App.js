import * as React from 'react'

import { Platform, ScrollView, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const instructions = Platform.select({
  ios: `Press Cmd+R to reload,\nCmd+D or shake for dev menu`,
  android: `Double tap R on your keyboard to reload,\nShake or press menu button for dev menu`,
});


const Example = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
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
            <View style = {{ padding: 15 }}>
            <Text style={styles.inputLabel}>{name}</Text>
            <TextInput style={styles.input}
                name={name}
                value={value}
                onChangeText={onInputChange}
                type={type}
                placeholder={placeholder}
            />
            </View>
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
    <ScrollView style={styles.container}>
      <Text style={styles.headerTextBox}>Remplissez en ligne votre attestation numérique :</Text>
      <Text style={styles.text}>Tous les champs sont obligatoires.</Text>
      {Example()}
      {inputfirstName('Prénom', 'Jean')}
      {inputLastName('Nom', 'Dupont')}
      {inputBithDate('Date de naissance (au format jj/mm/aaaa)', '01/01/1970')}
      {inputBirthPlace('Lieu de naissance', 'Lyon')}
      {inputAddress('Adresse', '999 avenue de france')}
      {inputCity('Ville', 'Paris')}
      {inputpostCode('Code Postal', '75001')}
      <Button onClick={handleGenerate()} title="Press Me" >Generate qrcode</Button>
    </ScrollView>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   title1: {},
//   title2: {},
//   inputLabel: {},
//   input: {
//     color: "red",
//   },
//   row: {
//     display: "flex",
//   }

// });

const styles = StyleSheet.create({
  container: {
     paddingTop: 100
  },
  input: {
     margin: 2,
     height: 35,
     borderColor: '#241e2f',
     borderWidth: 1
  },
  submitButton: {
     backgroundColor: '#241e2f',
     padding: 0,
     margin: 15,
     height: 40,
  },
  submitButtonText:{
     color: 'white'
  },
  headerTextBox:{
    fontWeight: 'bold',
    fontSize: 14,
    width:500,
    color: 'blue',
    paddingTop:5,
    paddingBottom:5,
    paddingLeft:20,
    paddingRight:20, 
    borderRadius:10
  },

  text:{
    width:500,
    paddingTop:5,
    paddingBottom:5,
    paddingLeft:20,
    paddingRight:20, 
    borderRadius:10
  }
})
