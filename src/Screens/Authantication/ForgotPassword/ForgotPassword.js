import React, {useState, useMemo} from 'react';
import {useTheme} from '@react-navigation/native';
import {Text, View, ScrollView, TouchableOpacity, Alert} from 'react-native';
import {Login, Style} from '../../../style';
import IconM from 'react-native-vector-icons/MaterialIcons';
import {
  Button,
  ConfirmationAlert,
  Spacing,
  AppHeader,
  Input,
  Container,
} from '../../../Components';
import {SH, SF} from '../../../Utiles';
import {useTranslation} from 'react-i18next';
import {RouteName} from '../../../routes';
import {supabase} from '../../../lib/supabase';

const ForgotPassword = props => {
  const {t} = useTranslation();
  const {navigation} = props;
  const [email, setEmailValidError] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const {Colors} = useTheme();
  const Logins = useMemo(() => Login(Colors), [Colors]);

  var alertdata = {
    logout: t('Email_Successfull'),
  };
  const onoknutton = () => {
    navigation.navigate(RouteName.LOGIN_SCREEN);
  };

  const sendPasswordResetEmail = async email => {
    try {
      const {data, error} = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'com.ElimuXR://reset-password', // Deep link to handle reset in your app
      });

      if (error) {
        throw error;
      }

      Alert.alert(
        'Email Sent',
        'Password reset link has been sent to your email address',
        [{text: 'OK'}],
      );

      return true;
    } catch (error) {
      console.error('Password reset error:', error.message);
      Alert.alert('Error', error.message || 'Failed to send reset email', [
        {text: 'OK'},
      ]);
      return false;
    }
  };
  return (
    <Container>
      <View style={Logins.ForgetPasswordView}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={Style.scrollviewstyles}>
          <AppHeader
            onPress={() => navigation.navigate(RouteName.LOGIN_SCREEN)}
            Iconname={true}
            headerTitle={t('Forget_Password')}
          />
          <View style={Logins.TabMinView}>
            <View>
              <View style={Logins.TabMinViewChild}>
                <View style={Logins.BorderWidth}>
                  <TouchableOpacity style={Logins.WidthSet}>
                    <Input
                      placeholder={t('Enter_Email')}
                      inputStyle={Logins.SearchInputBorder}
                      onChangeText={e => setEmailValidError(e)}
                      keyboardType={'email-address'}
                      value={email}
                      leftIcon={
                        <IconM
                          style={Logins.Marginright}
                          name="email"
                          size={SF(25)}
                        />
                      }
                    />
                  </TouchableOpacity>
                </View>
                <Spacing space={SH(20)} />
                <Text style={Logins.SeTextStyleForget}>
                  <Text style={Logins.StarColor}> * </Text>{' '}
                  {t('We_Well_Sand_Message')}
                </Text>
                <Spacing space={SH(20)} />
                <Button
                  onPress={() => {
                    sendPasswordResetEmail(email);
                    setAlertMessage(alertdata.logout);
                  }}
                  title={t('Submit_button')}
                />
                <ConfirmationAlert
                  message={alertMessage}
                  buttonminview={Logins.CenterButton}
                  modalVisible={alertVisible}
                  setModalVisible={setAlertVisible}
                  onPressCancel={() => setAlertVisible(!alertVisible)}
                  onPress={() => {
                    setAlertVisible(!alertVisible), onoknutton();
                  }}
                  iconVisible={true}
                  buttonText={t('Ok_Text')}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </Container>
  );
};
export default ForgotPassword;
