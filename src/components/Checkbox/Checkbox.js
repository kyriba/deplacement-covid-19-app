import React, { useState } from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import { Card, CheckBox } from "react-native-elements";
import i18n from "i18n-js";

const Checkbox = (label, addCheck, removeCheck) => {
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
    <TouchableWithoutFeedback key={`touch-${label}`} onPress={handleSelection}>
      <Card
        key={`card-${label}`}
        containerStyle={{ backgroundColor: "whitesmoke" }}
      >
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

export default Checkbox;
