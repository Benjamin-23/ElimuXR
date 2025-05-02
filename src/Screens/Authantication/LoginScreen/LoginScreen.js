import {useTheme} from '@react-navigation/native';
import React, {useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Button,
  Container,
  Input,
  PasswordInput,
  Spacing,
} from '../../../Components';
import {SH} from '../../../Utiles';
import images from '../../../index';
import {RouteName} from '../../../routes';
import {Login, Style} from '../../../style';
import {supabase} from '../../../lib/supabase';

const Loginscreen = props => {
  const {navigation} = props;
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const {t} = useTranslation();
  const OnRegisterPress = () => {
    navigation.navigate(RouteName.REGISTER_SCREEN);
  };
  const {Colors} = useTheme();
  const Logins = useMemo(() => Login(Colors), [Colors]);
  async function signInWithEmail() {
    setLoading(true);
    const {error, data} = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    console.log(data);
    if (error) Alert.alert(error.message);
    setLoading(false);
    if (data.user) navigation.navigate(RouteName.OTP_SCREEN);
  }
  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: {session},
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert('Please check your inbox for email verification!');
    setLoading(false);
  }
  return (
    <Container>
      <View style={Logins.MinViewScreen}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={Style.scrollviewstyles}>
          <View style={Logins.Container}>
            <View style={Style.MinViewContent}>
              <View style={Logins.ManViewLogin}>
                <Image
                  style={Logins.ImageSet}
                  resizeMode="contain"
                  source={images.App_Logo}
                />
              </View>
              <Spacing space={SH(30)} />
              <Text style={Logins.LoginText}>{t('Login_Text')}</Text>
              <Spacing space={SH(20)} />
              <View style={Logins.InputSpaceView}>
                <Input
                  title={t('Email')}
                  placeholder={t('Enter your Email')}
                  onChangeText={text => setEmail(text)}
                  value={email}
                  inputType="email"
                  maxLength={100}
                  placeholderTextColor={Colors.gray_text_color}
                />
              </View>
              <PasswordInput
                label={t('Password_Text')}
                placeholder={t('Password_Text')}
                onChangeText={text => setPassword(text)}
              />
              <View style={Logins.ViewTextStyle}>
                <Text style={Logins.TextStyle}>
                  {t('Dont_Have_Account')}{' '}
                  <Text
                    style={Logins.registerTextStyle}
                    onPress={() => OnRegisterPress()}>
                    {' '}
                    {t('Register_Text')}
                  </Text>
                </Text>
              </View>
              <Spacing space={SH(40)} />
              <View style={Logins.LoginButton}>
                <Button
                  title={t('Login_Text')}
                  onPress={() => signInWithEmail()}
                />
              </View>
              <Spacing space={SH(10)} />
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(RouteName.FORGET_PASSWORD_SCREEN)
                }>
                <Text style={Logins.ForgetPasswordStyles}>
                  {t('Forgot_Password')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </Container>
  );
};
export default Loginscreen;
