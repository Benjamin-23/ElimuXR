import React, { useMemo, useRef,useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { SW, Colors, SF } from '../../Utiles';

function OtpInput({ numberOfInputs = 4 }) {
    const [otp, setOtp] = useState(Array(numberOfInputs).fill(''));
    const inputRefs = useRef([]);
    // const LoginStyles = LoginStyle;
    const handleInputChange = (text, index) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);
        // Move to the next input
        if (text !== '' && index < numberOfInputs - 1) {
            inputRefs.current[index + 1].focus();
        }
    };
    const handleInputDelete = (index) => {
        if (index > 0) {
            const newOtp = [...otp];
            newOtp[index - 1] = '';
            setOtp(newOtp);
            inputRefs.current[index - 1].focus();
        }
    };

    const styles = useMemo(
        () =>
            StyleSheet.create({
                CustomeInputView: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                },
                TextInputView: {
                    borderRadius: 10,
                    overflow: 'hidden',
                    backgroundColor: Colors.white_text_color,
                    borderWidth: 1,
                    borderColor: Colors.theme_backgound
                },
                CustomeInput: {
                    width: SW(55),
                    height: SW(55),
                    textAlign: 'center',
                    fontWeight: '600',
                    fontSize: SF(20),
                },
            }),
        [],
    );

    return (
        <View style={styles.CustomeInputView}>
            {Array.from({ length: numberOfInputs }).map((_, index) => (
                <View style={styles.TextInputView} key={index}>
                    <TextInput
                        key={index}
                        style={styles.CustomeInput}
                        value={otp[index]}
                        keyboardType="numeric"
                        maxLength={1}
                        ref={(ref) => (inputRefs.current[index] = ref)}
                        onChangeText={(text) => handleInputChange(text, index)}
                        onKeyPress={({ nativeEvent }) => {
                            if (nativeEvent.key === 'Backspace') {
                                handleInputDelete(index);
                            }
                        }}
                    />
                </View>
            ))}
        </View>
    );
}
export default OtpInput;
