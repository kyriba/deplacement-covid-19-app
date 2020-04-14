import 'react-native-gesture-handler';

import React, {useState, useEffect} from "react";
import {ScrollView, StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import { CheckBox, Input as TextInput, Text as ElementText, Button} from 'react-native-elements'
// import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

import getAttestation, {getQrCodeData} from './src/certificateGenerator';
import QRCodeInMemory from './src/qrcode'
import PDFReader from 'rn-pdf-reader-js'

i18n.translations = {
    en: {
        firstName: 'First name',
        lastName: 'Last name',
        attestation: 'Fill in your digital certificate',
        filds: 'All fields are mandatory',
        birthday: 'Date of birth (in dd / mm / yyyy format)',
        place: 'Place of birth',
        address: 'Address',
        city: 'City',
        postCode: 'Postal code',
        submit: 'submit',
        reason: 'Choose the exit reason (s)',
        reason1: 'Travel between the home and the place of exercise of the professional activity, when they are ' +
            'essential for the exercise of activities which cannot be organized in the form of telework or professional trips which cannot be deferred.',
        reason2: 'Travel to purchase supplies necessary for professional activity and purchases of basic necessities in establishments whose activities remain authorized',
        reason3: 'Consultations and care that cannot be provided remotely and that cannot be deferred; consultations and care of patients with a long-term condition.',
        reason4: 'Travel for compelling family reasons, for assistance to vulnerable people or childcare.',
        reason5: 'Brief trips, within the limit of one hour daily and within a maximum radius of one kilometer around the home, ' +
            'linked either to the individual physical activity of the people, to the exclusion of any collective sporting ' +
            'practice and any proximity to d \'other people, either walking with the only people in the same home, or the needs of pets.',
        reason6: 'Judicial or administrative summons.',
        reason7: 'Participation in missions of general interest at the request of the administrative authority.'


    },
    fr: {
        firstName: 'Prénom',
        lastName: 'Nom',
        attestation: 'Remplissez en ligne votre attestation numérique',
        filds: 'Tous les champs sont obligatoires',
        birthday: 'Date de naissance (au format jj/mm/aaaa)',
        place: 'Lieu de naissance',
        address: 'Adresse',
        city: 'Ville',
        postCode: 'Code Postal',
        submit: 'Loin',
        reason: 'Choisissez le ou les motif(s) de sortie',
        reason1: 'Déplacements entre le domicile et le lieu d’exercice de l’activité professionnelle, lorsqu\'ils sont ' +
            'indispensables à l\'exercice d’activités ne pouvant être organisées sous forme de télétravail ou déplacements professionnels ne pouvant être différés.',
        reason2: 'Déplacements pour effectuer des achats de fournitures nécessaires à l’activité professionnelle et des achats ' +
            'de première nécessité dans des établissements dont les activités demeurent autorisées',
        reason3: 'Consultations et soins ne pouvant être assurés à distance et ne pouvant être différés ; consultations et soins ' +
            'des patients atteints d\'une affection de longue durée.',
        reason4: 'Déplacements pour motif familial impérieux, pour l’assistance aux personnes vulnérables ou la garde d’enfants.',
        reason5: 'Déplacements brefs, dans la limite d\'une heure quotidienne et dans un rayon maximal d\'un kilomètre autour ' +
            'du domicile, liés soit à l\'activité physique individuelle des personnes, à l\'exclusion de toute pratique sportive ' +
            'collective et de toute proximité avec d\'autres personnes, soit à la promenade avec les seules personnes ' +
            'regroupées dans un même domicile, soit aux besoins des animaux de compagnie.',
        reason6: 'Judicial or administrative summons.',
        reason7: 'Participation à des missions d’intérêt général sur demande de l’autorité administrative.'
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
                <Text style={styles.label}>{name}</Text>
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

function Form({navigation}) {
    const [isSelected1, setSelection1] = useState(false);
    const [isSelected2, setSelection2] = useState(false);
    const [isSelected3, setSelection3] = useState(false);
    const [isSelected4, setSelection4] = useState(false);
    const [isSelected5, setSelection5] = useState(false);
    const [isSelected6, setSelection6] = useState(false);
    const [isSelected7, setSelection7] = useState(false);


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

      const profile = {
        firstname: firstName,
        lastname: lastName,
        birthday: bithDate,
        lieunaissance: birthPlace,
        address: address,
        zipcode: postCode,
        town: city,
        datesortie: '12-04-2020',
        heuresortie: '13:00'
      }

      const reasons = ["courses"]

      navigation.navigate('Attestation', {profile: profile, reasons: reasons})

    }

    return (
        <ScrollView>
            <ElementText style={styles.headerText}>{i18n.t('attestation')}:</ElementText>
            <ElementText style={styles.textMandatory}>{i18n.t('filds')}.</ElementText>
            {/* {Example()} */}
            {inputfirstName(i18n.t('firstName'), 'Jean')}
            {inputLastName(i18n.t('lastName'), 'Dupont')}
            {inputBithDate(i18n.t('birthday'), '01/01/1970')}
            {inputBirthPlace(i18n.t('place'), 'Lyon')}
            {inputAddress(i18n.t('address'), '999 avenue de france')}
            {inputCity(i18n.t('city'), 'Paris')}
            {inputpostCode(i18n.t('postCode'), '75001')}


            <Text style={styles.headerText}>{i18n.t('reason')}.</Text>
            <CheckBox
                checked={isSelected1}
                style={styles.checkbox}
                onPress={() => setSelection1(!isSelected1)}
            />
            <Text style={styles.text}>{i18n.t('reason1')}.</Text>
            <CheckBox
                checked={isSelected2}
                style={styles.checkbox}
                onPress={() => setSelection2(!isSelected2)}
            />
            <Text style={styles.text}>{i18n.t('reason2')}.</Text>
            <CheckBox
                checked={isSelected3}
                style={styles.checkbox}
                onPress={() => setSelection3(!isSelected3)}
            />
            <Text style={styles.text}>{i18n.t('reason3')}.</Text>
            <CheckBox
                checked={isSelected4}
                style={styles.checkbox}
                onPress={() => setSelection4(!isSelected4)}
            />
            <Text style={styles.text}>{i18n.t('reason4')}.</Text>
            <CheckBox
                checked={isSelected5}
                style={styles.checkbox}
                onPress={() => setSelection5(!isSelected5)}
            />
            <Text style={styles.text}>{i18n.t('reason5')}.</Text>
            <CheckBox
                checked={isSelected6}
                style={styles.checkbox}
                onPress={() => setSelection6(!isSelected6)}
            />
            <Text style={styles.text}>{i18n.t('reason6')}.</Text>
            <CheckBox
                checked={isSelected7}
                style={styles.checkbox}
                onPress={() => setSelection7(!isSelected7)}
            />
            <Text style={styles.text}>{i18n.t('reason7')}.</Text>


            <Button style={styles.submitButton} onPress={() => handleGenerate()} title={i18n.t('submit')}>Generate qrcode</Button>

        </ScrollView>
    );
}



function PdfView({profile, reasons, qrCodeBase64}) {

    const [pdfFile, setPdfFile] = useState('');


    useEffect(() => {
        getAttestation(profile, reasons, qrCodeBase64).then((pdfFile) => {
        setPdfFile(pdfFile)
      }).catch((err) => {
          console.info(err)
      })
    }, [profile, reasons, qrCodeBase64])

    const data = 'data:application/pdf;base64,' + pdfFile;

    if (pdfFile !== '') { 
    return (<PDFReader source={{base64: data}}/>)
    } else {
        return (
            <View
              style={{
                ...StyleSheet.absoluteFillObject,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ActivityIndicator size='large' />
            </View>
          )

    }

    }

function AttestationView({ route }) {

    const { profile, reasons } = route.params;

    const qrCodeData = getQrCodeData(profile, reasons);
    const [qrCodeBase64, setQrCodeBase64] = useState('');

    return (
        <>
        {/* QRCodeInMemory is non visible rendering to draw QRCode */}
        {qrCodeBase64 === '' && <QRCodeInMemory qrCodeData={qrCodeData} setQrCodeBase64={setQrCodeBase64}/>} 
        <PdfView profile={profile} reasons={reasons} qrCodeBase64={qrCodeBase64}/>
        </>
        )
};


export default function App() {

    return (
        <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Form"
            component={Form}
            options={{title: 'Form'}}
          />
          <Stack.Screen name="Attestation" component={AttestationView} />
        </Stack.Navigator>
      </NavigationContainer>
    )
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
        margin: 30,
    },
    submitButtonText: {
        color: 'white',
        padding: 1
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 22,
        width: 500,
        color: 'blue',
        paddingTop: 50,
        paddingBottom: 25,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 10
    },
    textMandatory: {
        fontWeight: 'bold',
        fontSize: 20,
        paddingTop: 1,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 10,
        color: 'red',
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
    label: {
        fontWeight: 'bold',
        fontSize: 16,
        paddingTop: 1,
        paddingBottom: 20,
        paddingLeft: 10,
        paddingRight: 20,
        borderRadius: 10,
        flexGrow: 1,
        flex: 1,
    },
    scrollView: {
        marginHorizontal: 20,
    },
})
