import React, { useState } from "react";
import { CheckBox } from "react-native-elements";
import i18n from "i18n-js";

import { View, Text, StyleSheet } from "react-native";
import { Input as TextInput } from "react-native-elements";

const useInput = (initialState) => {
  const [value, onChangeText] = React.useState(initialState);
  return [value, onChangeText];
};

export const useInputField = (type) => {
  const initialState = "";

  const [value, onInputChange, setValue] = useInput(initialState);

  const input = (name, placeholder) => {
    return (
      <View style={{ padding: 15 }}>
        <Text style={styles.label}>{name}</Text>
        <TextInput
          style={styles.input}
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
};

export const useCheckbox = (label, addCheck, removeCheck) => {
  const [isSelected, setSelection] = useState(false);
  return (
    <>
      <Text style={styles.headerText}>{i18n.t(label)}.</Text>
      <CheckBox
        checked={isSelected}
        style={styles.checkbox}
        onPress={() => {
          setSelection(!isSelected);
          if (!isSelected) {
            addCheck(label)
          } else {
            removeCheck(label)
          }

        }}
      />
    </>
  );
};


export const useAllCheckboxes = () => {
  const [allChecked, setAllChecked] = useState([]);

  const addCheck = (label) => {
    setAllChecked(allChecked.concat(label));
  }

  const removeCheck = (label) => {
    setAllChecked(allChecked.filter((item) => item !== label));
  }

  return [allChecked, addCheck, removeCheck]


}

const styles = StyleSheet.create({
  input: {
    margin: 2,
    height: 35,
    borderColor: "#241e2f",
    borderWidth: 1,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    paddingTop: 1,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 20,
    borderRadius: 10,
    flexGrow: 1,
    flex: 1,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 14,
    width: 500,
    color: "black",
    paddingTop: 50,
    paddingBottom: 25,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
  },
  checkbox: {
    marginBottom: 20,
    width: 15,
    height: 15,
    borderColor: "black",
    margin: 15,
  },
});
