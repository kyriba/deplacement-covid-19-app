import i18n from "i18n-js";
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import { Card, CheckBox, Input as TextInput } from "react-native-elements";

import { MaskService } from "react-native-masked-text";

const useRefsStore = () => {
  const [refs, setRefs] = useState({});

  const addRef = (name, ref) => {
    if (refs[name] === undefined) {
      setRefs({ ...refs, [name]: ref });
    }
  };

  return [refs, addRef];
};

export const useInputsFabric = () => {
  const [inputRefs, addInputRef] = useRefsStore();

  const useInputField = (
    nextField,
    fieldType = "default",
    inputMask = "default"
  ) => {
    const initialState = "";
    const [value, onInputChange] = useState(initialState);
    const [error, setError] = useState(initialState);

    let inputChangeWithMask = onInputChange;
    let keyboardType = "default";
    let returnKeyType = "next";
    let blurOnSubmit = false;

    switch (fieldType) {
      case "datetime":
        inputChangeWithMask = (e) => {
          const maskedValue = MaskService.toMask("datetime", e, {
            format: "DD/MM/YYYY",
          });
          onInputChange(maskedValue);
        };
        keyboardType = "number-pad";
        returnKeyType = "done";
        break;
      case "postalcode":
        inputChangeWithMask = (e) => {
          const maskedValue = MaskService.toMask("custom", e, {
            mask: "99999",
          });
          onInputChange(maskedValue);
        };
        keyboardType = "number-pad";
        returnKeyType = "done";
        blurOnSubmit = true;
        break;
      default:
        inputChangeWithMask = onInputChange;
    }

    const input = (name, placeholder) => {
      return (
        <View style={{ padding: 15 }}>
          <TextInput
            label={name}
            style={styles.input}
            name={name}
            value={value}
            blurOnSubmit={blurOnSubmit}
            onChangeText={inputChangeWithMask}
            placeholder={placeholder}
            returnKeyType={returnKeyType}
            keyboardType={keyboardType}
            onSubmitEditing={() => {
              inputRefs[nextField].focus();
            }}
            ref={(input) => {
              addInputRef(name, input);
            }}
            errorMessage={error}
            errorStyle={{ color: "red" }}
          />
        </View>
      );
    };
    return [value, input];
  };

  return useInputField;
};

export const useCheckbox = (label, addCheck, removeCheck) => {
  const [isSelected, setSelection] = useState(false);
  const handleSelection = () => {
    setSelection(!isSelected);
    if (!isSelected) {
      addCheck(label);
    } else {
      removeCheck(label);
    }
  };

  return (
    <TouchableWithoutFeedback key={`touch-${label}`} onPress={handleSelection} >
      <Card key={`card-${label}`} containerStyle={{backgroundColor:'whitesmoke'}}>
        <View key={`view-${label}`}>
          <Text style={styles.text}>{i18n.t(label)}</Text>
          <CheckBox
            checked={isSelected}
            style={styles.checkbox}
            key={`checkbox-${label}`}
            onPress={handleSelection}
          />
        </View>
      </Card>
    </TouchableWithoutFeedback>
  );
};

export const useAllCheckboxes = () => {
  const [allChecked, setAllChecked] = useState([]);

  const addCheck = (label) => {
    setAllChecked(allChecked.concat(label));
  };

  const removeCheck = (label) => {
    setAllChecked(allChecked.filter((item) => item !== label));
  };

  return [allChecked, addCheck, removeCheck];
};

const styles = StyleSheet.create({
  input: {
    margin: 2,
    height: 35,
    borderColor: "#241e2f",
    borderWidth: 1,
  },
  text: {
    fontSize: 14,
    paddingTop: 25,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
    flexGrow: 1,
    flex: 1,
  },
  checkbox: {
    marginBottom: 20,
    width: 15,
    height: 15,
    borderColor: "black",
    margin: 15,
  },
});
