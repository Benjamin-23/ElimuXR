import React, {useState, useMemo} from 'react';
import {useTheme} from '@react-navigation/native';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import {
  Input,
  Button,
  CheckBox,
  Spacing,
  Countrycode,
  PasswordInput,
  Container,
} from '../../../Components';
import {SH} from '../../../Utiles';
import {RouteName} from '../../../routes';
import {Login, Style} from '../../../style';
import {useTranslation} from 'react-i18next';
import {supabase} from '../../../lib/supabase';

const Register = props => {
  const {navigation} = props;
  const stateArray = {
    username: '',
    emailId: '',
    mobileNumber: '',
    textInputPassword: '',
    toggleCheckBox: false,
  };

  const [state, setState] = useState(stateArray);
  const {t} = useTranslation();
  const [checked, setChecked] = React.useState(true);
  const toggleCheckbox = () => setChecked(!checked);

  const {Colors} = useTheme();
  const Logins = useMemo(() => Login(Colors), [Colors]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    setLoading(true);
    try {
      // First, check if user already exists
      const {data: existingUser, error: checkError} =
        await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });

      if (existingUser && existingUser.session) {
        // User already exists, redirect to login
        Alert.alert('User already exists', 'Please login instead');
        navigation.navigate(RouteName.LOGIN_SCREEN);
        setLoading(false);
        return;
      }

      // User doesn't exist, proceed with signup
      const {
        data: {session},
        error,
      } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        Alert.alert(error.message);
      }
      if (!session) {
        Alert.alert('Please check your inbox for email verification!');
      }

      setLoading(false);
      navigation.navigate(RouteName.REGISTER_SUCCESSFULLY);
    } catch (error) {
      Alert.alert('Error during registration', error.message);
      setLoading(false);
    }
  }

  return (
    <Container>
      <View style={Logins.MinViewBgColor}>
        <ScrollView contentContainerStyle={Style.scrollviewstyles}>
          <View style={Logins.Container}>
            <View style={Style.MinViewContent}>
              <View style={Logins.TopSpaceRegister}>
                <Text style={Logins.RegisterText}>{t('Register_Text')}</Text>
              </View>
              <Input
                title={t('Enter_Your_Name')}
                placeholder={t('Enter_Your_Name')}
                onChangeText={text => setState({...state, username: text})}
                value={state.username}
              />
              <Spacing space={SH(20)} />
              <View style={Style.FlexRowPassword}>
                <View style={Style.InputViewWidth}>
                  <Input
                    title={t('Email')}
                    placeholder={t('Enter your email')}
                    onChangeText={text => setEmail(text)}
                    value={email}
                    maxLength={100}
                    inputType="text"
                    placeholderTextColor={Colors.gray_text_color}
                    inputStyle={Style.PaddingLeftCountryInput}
                  />
                </View>
              </View>
              <Spacing space={SH(20)} />
              <Input
                title={t('Phone_Number')}
                placeholder={t('Enter your phone number')}
                onChangeText={text => setState({...state, mobileNumber: text})}
                value={state.mobileNumber}
                keyboardType="phone-pad"
                placeholderTextColor={Colors.gray_text_color}
              />
              <Spacing space={SH(20)} />
              <Input
                label={t('Password_Text')}
                placeholder={t('Password_Text')}
                onChangeText={text => setPassword(text)}
                inputType="password"
                value={password}
              />
              <Spacing space={SH(20)} />
              <View style={Logins.FlexRowChekBox}>
                <View style={Logins.CheckBoxView}>
                  <CheckBox
                    checked={checked}
                    onPress={toggleCheckbox}
                    iconType="material-community"
                    checkedIcon="checkbox-marked"
                    uncheckedIcon="checkbox-blank-outline"
                    checkedColor={Colors.theme_backgound}
                  />
                </View>
                <Text style={Logins.SimpleTextStyle}>
                  {t('I_Agree_Text')}{' '}
                  <Text style={Logins.borderbottomTwo}>
                    <Text
                      style={Logins.bluecolor}
                      onPress={() =>
                        Linking.openURL('https://myaccount.google.com/')
                      }>
                      {' '}
                      {t('Terms_Of_Service')}{' '}
                    </Text>
                  </Text>
                  {t('And_text')}{' '}
                  <Text
                    onPress={() =>
                      Linking.openURL('https://myaccount.google.com/')
                    }
                    style={Logins.bluecolor}>
                    {t('Privacy_Policy')}
                  </Text>
                </Text>
              </View>
              <Spacing space={SH(10)} />
              <View style={Logins.ButtonView}>
                <Button
                  title={t('Register_Text')}
                  onPress={() => signUpWithEmail()}
                  loading={loading}
                  disabled={loading}
                />
              </View>
              <Spacing space={SH(20)} />
              <View style={Logins.TopSpace}>
                <View style={Logins.AlredyAndLoginBox}>
                  <Text style={Logins.MemberTextStyle}>
                    {t('Already_Member')}
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate(RouteName.LOGIN_SCREEN)}>
                    <Text style={Logins.LoginScreenText}>
                      {t('Login_Text')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </Container>
  );
};
export default Register;
