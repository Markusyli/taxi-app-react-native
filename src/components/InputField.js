import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { MaterialIcons } from '@expo/vector-icons';
import styled from 'styled-components';

const InputField = ({
  value,
  placeholderText,
  iconName,
  asButton,
  onPress,
  onClear,
}) => {
  const Input = () => (
    <InputContainer>
      {value ? (
        <>
          {asButton ? (
            <Text>{value}</Text>
          ) : (
            <TextInput value={value} />
          )}
          {onClear && (
            <TouchableOpacity
              activeOpacity={0.8}
              style={{ alignItems: 'flex-end' }}
              onPress={onClear}
            >
              <MaterialIcons
                name="cancel"
                size={20}
                color="#9b99b1"
                style={{ marginTop: 2 }}
              />
            </TouchableOpacity>
          )}
        </>
      ) : (
        <>
          {iconName && (
            <MaterialIcons
              name={iconName}
              size={20}
              color="#9b99b1"
              style={{ marginTop: 2 }}
            />
          )}
          <Placeholder>{placeholderText}</Placeholder>
        </>
      )}
    </InputContainer>
  );

  if (asButton) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.container}
        onPress={onPress}
      >
        <Input />
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Input />
    </View>
  );
};

const InputContainer = styled.View`
  backgroundColor: #ebebf3;
  paddingLeft: 15;
  paddingRight: 10;
  paddingVertical: 10;
  borderRadius: 10;
  width: 100%;
  position: relative;
  flexDirection: row;
  alignItems: center;
`;

const Text = styled.Text`
  fontSize: 17;
  color: #333;
  marginLeft: 5;
  flex: 1;
`;

const TextInput = styled.TextInput`
  fontSize: 17;
  color: #333;
  marginLeft: 5;
  flex: 1;
`;

const Placeholder = styled.Text`
  fontSize: 17;
  color: #9b99b1;
  marginLeft: 6;
`;

InputField.defaultProps = {
  value: null,
  iconName: null,
  asButton: false,
  onPress: null,
  onClear: null,
};

InputField.propTypes = {
  value: PropTypes.string,
  placeholderText: PropTypes.string.isRequired,
  iconName: PropTypes.string,
  asButton: PropTypes.bool,
  onPress: PropTypes.func,
  onClear: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginHorizontal: 15,
  },
});

export default InputField;
