import React, {useState} from "react";
import {Platform, ScrollView, StyleSheet, Text, View, TextInput, Button} from 'react-native';
import { CheckBox } from 'react-native-elements'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

const instructions = Platform.select({
    ios: `Press Cmd+R to reload,\nCmd+D or shake for dev menu`,
    android: `Double tap R on your keyboard to reload,\nShake or press menu button for dev menu`,
});

i18n.translations = {
    en: {
        firstName: 'First name',
        lastName: 'Last name',
        attestation: 'Fill in your digital certificate',
        filds: 'All fields are mandatory',
        birthday: 'Date of birth (in dd / mm / yyyy format)',
        place: 'Lieu de naissance',
        address: 'Address',
        city: 'City',
        postCode: 'Postal code',
        submit: 'Press Me',
        reason: 'Choose the exit reason (s)',
        firstReason: 'Travel between the home and the place of exercise of the professional activity, when they are essential for the exercise of activities which cannot be organized in the form of telework or professional trips which cannot be deferred.'

    },
    fr: {
        firstName: 'Prénom',
        lastName: 'Nom',
        attestation: 'Remplissez en ligne votre attestation numérique',
        filds: 'Tous les champs sont obligatoires',
        birthday: 'Date de naissance (au format jj/mm/aaaa)',
        place: 'Place of birth',
        address: 'Adresse',
        city: 'Ville',
        postCode: 'Code Postal',
        submit: 'Press Me',
        reason: 'Choisissez le ou les motif(s) de sortie',
        firsReason: 'Déplacements entre le domicile et le lieu d’exercice de l’activité professionnelle, lorsqu\'ils sont indispensables à l\'exercice d’activités ne pouvant être organisées sous forme de télétravail ou déplacements professionnels ne pouvant être différés.'
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

    const handleConfirm = date => {
        console.warn("A date has been picked: ", date);
        hideDatePicker();
    };

    return (
        <View>
            <Button title="Show Date Picker" onPress={showDatePicker}/>
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
    const [value, onChangeText] = React.useState(initialState);
    return [value, onChangeText]
}

const useInputField = type => {
    const initialState = '';

    const [value, onInputChange, setValue] = useInput(initialState);

    const input = (name, placeholder) => {
        return (
            <View style={{padding: 15}}>
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
    const [isSelected, setSelection] = useState(false);
    const handleClick = async () => {
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

    var Datastore = require('react-native-local-mongodb'),
        db = new Datastore({filename: 'asyncStorageKey', autoload: true});

    const [firstName, inputfirstName] = useInputField('text')
    const [lastName, inputLastName] = useInputField('text')
    const [bithDate, inputBithDate] = useInputField('date')
    const [birthPlace, inputBirthPlace] = useInputField('text')
    const [address, inputAddress] = useInputField('text')
    const [city, inputCity] = useInputField('text')
    const [postCode, inputpostCode] = useInputField('text')

    const handleGenerate = () => {
        console.log(firstName)
        db.insert([{firstName: firstName}], function (err, newDocs) {
        });

        var docs = db.getAllData();
        console.log("Hello " + docs[0].firstName)
    }

    return (
        <ScrollView>
            <Text style={styles.headerText}>{i18n.t('attestation')} :</Text>
            <Text style={styles.text}>{i18n.t('filds')}.</Text>
            {Example()}
            {inputfirstName(i18n.t('firstName'), 'Jean')}
            {inputLastName(i18n.t('lastName'), 'Dupont')}
            {inputBithDate(i18n.t('birthday'), '01/01/1970')}
            {inputBirthPlace(i18n.t('place'), 'Lyon')}
            {inputAddress(i18n.t('address'), '999 avenue de france')}
            {inputCity(i18n.t('city'), 'Paris')}
            {inputpostCode(i18n.t('postCode'), '75001')}
            <Text style={styles.text}>{i18n.t('reason')}.</Text>
            <CheckBox
                checked={isSelected}
                style={styles.checkbox}
                onPress={() => setSelection(!isSelected)}
            />
            <Text style={styles.text}>{i18n.t('firstReason')}.</Text>
            <Button onPress={() => handleGenerate()} title={i18n.t('submit')}>Generate qrcode</Button>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        paddingTop: 500,
        flex: 1,
        paddingBottom: 0
    },
    checkbox: {
        marginBottom: 20,
        width: 15,
        height: 15,
        borderColor: 'black',
        margin: 15
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
    submitButtonText: {
        color: 'white',
        padding: 1
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 14,
        width: 500,
        color: 'blue',
        paddingTop: 50,
        paddingBottom: 5,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 10
    },
    text: {
        width: 500,
        paddingTop: 1,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 10
    },
    scrollView: {
        marginHorizontal: 20,
    },
})
