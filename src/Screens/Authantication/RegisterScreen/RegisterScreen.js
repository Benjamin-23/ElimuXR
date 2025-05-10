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
import {SH, SF} from '../../../Utiles';
import {RouteName} from '../../../routes';
import {Login, Style} from '../../../style';
import {useTranslation} from 'react-i18next';
import {supabase} from '../../../lib/supabase';
import {VectorIcons} from '../../../Components';
import {StyleSheet} from 'react-native';

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

      console.log(existingUser, 'existingUser');

      if (existingUser && existingUser.session) {
        // User already exists, redirect to login
        Alert.alert('User already exists', 'Please login instead');
        navigation.navigate(RouteName.LOGIN_SCREEN);
        setLoading(false);
        return;
      }

      if (
        checkError &&
        checkError.message.includes('Invalid login credentials')
      ) {
        // Email exists but password is wrong
        Alert.alert(
          'Authentication Error',
          'Email exists but password is incorrect',
        );
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
      // Only redirect to success screen if session exists (email confirmed)
      if (session) {
        navigation.navigate(RouteName.REGISTER_SUCCESSFULLY);
      } else {
        // Otherwise, user needs to confirm email first
        Alert.alert(
          'Please check your email',
          'Confirm your email before continuing',
        );
      }
      setLoading(false);
    } catch (error) {
      Alert.alert('Error during registration', error.message);
      setLoading(false);
    }
  }
  const [passwordVisibility, setpasswordVisibility] = useState(true);
  const onChangeText = text => {
    if (text === 'password') setpasswordVisibility(!passwordVisibility);
  };
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
                <View style={Logins.InputSpaceView}>
                  <Input
                    title={t('Enter your Email')}
                    placeholder={t('Enter your Email')}
                    onChangeText={text => setEmail(text)}
                    value={email}
                    inputType="email"
                    maxLength={100}
                    placeholderTextColor={Colors.gray_text_color}
                  />
                </View>
              </View>
              <Spacing space={SH(20)} />
              <Input
                title={t('Phone Number')}
                placeholder={t('Enter your phone number')}
                onChangeText={text => setState({...state, mobileNumber: text})}
                value={state.mobileNumber}
                keyboardType="phone-pad"
                placeholderTextColor={Colors.gray_text_color}
              />
              {/* <Spacing space={SH(20)} /> */}

              <Input
                title={t('Enter Password')}
                name="password"
                label={t('Password_Text')}
                placeholder={t('Password_Text')}
                onChangeText={text => setPassword(text)}
                value={password}
                textContentType="newPassword"
                secureTextEntry={passwordVisibility}
                rightIcon={
                  <TouchableOpacity
                    style={styles.IconPostionAboluteTwo}
                    onPress={() => {
                      onChangeText('password');
                    }}>
                    <VectorIcons
                      name={passwordVisibility ? 'eye-off' : 'eye'}
                      size={SF(25)}
                      color={Colors.gray_text_color}
                      icon="Ionicons"
                    />
                  </TouchableOpacity>
                }
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
const styles = StyleSheet.create({
  IconPostionAboluteTwo: {
    position: 'absolute',
    right: SH(30),
    height: SH(50),
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialLoginContainer: {
    alignItems: 'center',
    marginVertical: SH(20),
  },
  socialLoginText: {
    color: 'black',
    fontSize: SF(16),
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: SH(12),
    paddingHorizontal: SH(25),
    borderRadius: SH(5),
    borderWidth: 1,
    borderColor: 'gray',
  },
  googleIcon: {
    width: SH(20),
    height: SH(20),
    marginRight: SH(10),
  },
  googleButtonText: {
    color: '#000000',
    fontSize: SF(16),
    fontWeight: 'bold',
  },
});
export default Register;
