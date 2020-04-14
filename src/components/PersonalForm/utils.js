import React from "react";
import {View, Text, StyleSheet} from 'react-native';
import { Input as TextInput} from 'react-native-elements'


const useInput = initialState => {
    const [value, onChangeText] = React.useState(initialState);
    return [value, onChangeText]
}

export const useInputField = type => {
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

const styles = StyleSheet.create({
    input: {
        margin: 2,
        height: 35,
        borderColor: '#241e2f',
        borderWidth: 1
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
    }
})
