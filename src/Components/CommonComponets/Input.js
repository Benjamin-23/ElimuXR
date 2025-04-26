import React, { useMemo } from 'react';
import propTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { SF, SH, SW, Fonts, Colors } from '../../Utiles';
import { Input } from '@rneui/themed';

function Inputs({
  title = '',
  placeholder = '',
  titleStyle = {},
  inputStyle = {},
  onChangeText = () => { },
  onFocus = () => { },
  onBlur = () => { },
  value = '',
  textprops = {},
  inputprops = {},
  inputType = null,
  autoCompleteType = '',
  onEndEditing = () => { },
  multiline,
  autoFocus,
  secureTextEntry,
  maxLength,
  leftIcon = {},
  rightIcon = {},
  errorMessage = "",
  disabled = false,
  required = false,
  containerStyle,
  inputContainerStyle,
  numberOfLines
}) {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: { width: '100%', ...containerStyle, marginBottom: SH(0), },
        inputContainerStyle: {
          borderBottomWidth: SH(0),
          width: "100%",
          ...inputContainerStyle
        },
        input_style: {
          width: '100%',
          borderColor: Colors.black_text_color,
          fontSize: SF(16),
          fontWeight: '600',
          marginBottom: SH(0),
          fontFamily: Fonts.Poppins_Medium,
          color: Colors.black_text_color,
          paddingVertical: SH(8),
          paddingHorizontal: SH(10),
          borderRadius: SH(7),
          borderWidth: SH(1),
          ...inputStyle,
        },
        labelStyle: {
          width: '100%',
          fontSize: SF(20),
          color: Colors.black_text_color,
          fontFamily: Fonts.Poppins_Medium,
          paddingHorizontal: SW(5),
          ...titleStyle,
          fontWeight: '500',
          paddingVertical: SH(2),
        },
        placeholderStyle: {
          fontSize: SF(19),
          color: Colors.black_text_color,
          fontFamily: Fonts.Poppins_Medium
        },
        errorStyle: {
          color: Colors.theme_backgound,
          fontFamily: Fonts.Poppins_Medium,
        },
      }),
    [title, titleStyle, inputStyle, Colors],
  );

  return (
    <View style={styles.container}>
      <Input
        label={title + (required ? "*" : "")}
        placeholder={placeholder}
        onChangeText={(text) => onChangeText(text)}
        leftIcon={leftIcon}
        multiline={multiline}
        placeholderTextColor={Colors.black_text_color}
        rightIcon={rightIcon}
        numberOfLines={numberOfLines}
        containerStyle={styles.inputContainer}
        errorMessage={errorMessage}
        disabled={disabled}
        onFocus={() => onFocus()}
        onBlur={() => onBlur()}
        autoFocus={autoFocus}
        keyboardType={!inputType ? 'default' : inputType}
        secureTextEntry={secureTextEntry}
        value={value}
        selectionColor={Colors.theme_backgound}
        maxLength={maxLength}
        {...inputprops}
        errorStyle={styles.errorStyle}
        inputStyle={styles.input_style}
        labelStyle={styles.labelStyle}
        inputContainerStyle={styles.inputContainerStyle}
        onEndEditing={(e) => onEndEditing(e)}
        disabledInputStyle={{ background: "#ddd" }}
      />
    </View>
  );
}
export default Inputs;
