import {useTheme} from '@react-navigation/native';
import React, {useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
  Linking,
} from 'react-native';
import {
  Button,
  ConfirmationAlert,
  Container,
  Input,
  Spacing,
  VectorIcons,
} from '../../../Components';
import {SF, SH} from '../../../Utiles';
import images from '../../../index';
import {RouteName} from '../../../routes';
import {ProfileTabStyles, Style} from '../../../style';
import {supabase} from '../../../lib/supabase';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

const ProfileTab = props => {
  const {navigation} = props;
  const {t} = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalcontent, setmodalcontent] = useState(0);
  const {Colors} = useTheme();
  const ProfileTabStyle = useMemo(() => ProfileTabStyles(Colors), [Colors]);

  const [userInfo, setUserInfo] = useState({
    phone_number: '',
    email: '',
    fu_name: '',
  });

  const [editData, setEditData] = useState({
    phone: '',
    email: '',
    display_name: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [uploading, setUploading] = useState(false);

  const alertdata = {
    logout: t('Are_You_Sure_logout'),
  };

  const onoknutton = () => {
    navigation.navigate(RouteName.LOGIN_SCREEN);
  };

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get auth user
        const {
          data: {user},
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) throw userError;
        if (!user) throw new Error('No authenticated user found');

        // Try to get profile data from users table
        const {data: profileData, error: profileError} = await supabase
          .from('users')
          .select('phone_number, full_name')
          .eq('email', user.email)
          .maybeSingle(); // Use maybeSingle to handle no results

        if (profileError) throw profileError;

        // If profile exists, set data
        if (profileData) {
          setUserInfo({
            phone_number: profileData.phone_number || '',
            email: user.email || '',
            full_name: profileData.full_name || '',
            avatar_url: profileData.avatar_url || null,
          });
          setEditData({
            phone: profileData.phone_number || '',
            email: user.email || '',
            display_name: profileData.full_name || '',
          });
        } else {
          // If profile doesn't exist, initialize with empty values
          setUserInfo({
            phone_number: '',
            email: user.email || '',
            full_name: '',
          });
          setEditData({
            phone: '',
            email: user.email || '',
            display_name: '',
          });
          // Enable edit mode automatically for new users
          setIsEditing(true);
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
        Alert.alert('Error', error.message || 'Failed to fetch user data');
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdateProfile = async () => {
    try {
      const {
        data: {user},
        error: userError,
      } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) throw new Error('No user found');

      // First check if profile exists
      const {data: existingProfile, error: fetchError} = await supabase
        .from('users')
        .select()
        .eq('email', user.email)
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (existingProfile) {
        // Update existing profile
        const {error: profileError} = await supabase
          .from('users')
          .update({
            phone_number: editData.phone,
            full_name: editData.display_name,
            updated_at: new Date(),
          })
          .eq('email', user.email);

        if (profileError) throw profileError;
      } else {
        // Create new profile
        const {error: profileError} = await supabase.from('users').insert({
          email: user.email,
          phone_number: editData.phone,
          full_name: editData.display_name,
          created_at: new Date(),
          updated_at: new Date(),
        });

        if (profileError) throw profileError;
      }

      // Update email if changed
      if (editData.email !== user.email) {
        const {error: emailError} = await supabase.auth.updateUser({
          email: editData.email,
        });
        if (emailError) throw emailError;
        Alert.alert(
          'Verify Email',
          'A verification link was sent to your new email',
        );
      }

      // Update local state
      setUserInfo({
        phone_number: editData.phone,
        email: editData.email,
        full_name: editData.display_name,
      });
      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error.message);
      Alert.alert('Error', error.message || 'Failed to update profile');
    }
  };

  // Add this function to handle image selection
  const handleImagePicker = async source => {
    try {
      let options = {
        mediaType: 'photo',
        quality: 0.8,
        maxWidth: 500,
        maxHeight: 500,
      };

      if (source === 'camera') {
        // Check camera permission status
        const cameraPermission =
          Platform.OS === 'ios'
            ? PERMISSIONS.IOS.CAMERA
            : PERMISSIONS.ANDROID.CAMERA;

        const permissionStatus = await check(cameraPermission);

        // Handle different permission states
        switch (permissionStatus) {
          case RESULTS.DENIED:
            // Permission hasn't been requested yet
            const requestResult = await request(cameraPermission);
            if (requestResult === RESULTS.GRANTED) {
              // Permission granted, launch camera
              launchCamera(options, handleImagePickerResponse);
            } else {
              Alert.alert(
                'Permission Required',
                'Camera permission is needed to take photos. Please enable it in settings.',
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  {
                    text: 'Open Settings',
                    onPress: () => Linking.openSettings(),
                  },
                ],
              );
            }
            return;

          case RESULTS.BLOCKED:
            // Permission permanently denied - redirect to settings
            Alert.alert(
              'Permission Blocked',
              'Camera permission is permanently denied. Please enable it in app settings.',
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'Open Settings',
                  onPress: () => Linking.openSettings(),
                },
              ],
            );
            return;

          case RESULTS.GRANTED:
            // Permission already granted - launch camera
            launchCamera(options, handleImagePickerResponse);
            return;

          case RESULTS.UNAVAILABLE:
            // Camera not available on this device
            Alert.alert('Error', 'Camera is not available on this device');
            return;
        }
      } else {
        // For gallery selection
        launchImageLibrary(options, handleImagePickerResponse);
      }
    } catch (error) {
      console.error('Error handling image picker:', error);
      Alert.alert('Error', 'Failed to access camera or photos');
    }
  };

  const handleImagePickerResponse = async response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorCode) {
      console.log('ImagePicker Error: ', response.errorMessage);
      Alert.alert('Error', response.errorMessage || 'Failed to select image');
    } else if (response.assets && response.assets[0].uri) {
      const uri = response.assets[0].uri;
      setProfilePic(uri);
      await uploadProfilePicture(uri);
    }
  };

  const handleCameraPermission = async () => {
    try {
      const cameraPermission = Platform.select({
        ios: PERMISSIONS.IOS.CAMERA,
        android: PERMISSIONS.ANDROID.CAMERA,
      });

      const status = await check(cameraPermission);

      switch (status) {
        case RESULTS.GRANTED:
          return true;

        case RESULTS.DENIED:
          const requestStatus = await request(cameraPermission);
          return requestStatus === RESULTS.GRANTED;

        case RESULTS.BLOCKED:
          Alert.alert(
            'Permission Required',
            'Camera access is blocked. Please enable it in settings.',
            [
              {text: 'Cancel', style: 'cancel'},
              {
                text: 'Open Settings',
                onPress: async () => {
                  try {
                    await Linking.openSettings();
                  } catch (err) {
                    console.error('Failed to open settings:', err);
                  }
                },
              },
            ],
          );
          return false;

        default:
          return false;
      }
    } catch (error) {
      console.error('Permission check error:', error);
      return false;
    }
  };

  const handleImageCapture = async () => {
    const hasPermission = await handleCameraPermission();

    if (!hasPermission) {
      Alert.alert(
        'Permission Denied',
        'Cannot access camera without permission',
        [{text: 'OK'}],
      );
      return;
    }

    // Proceed with camera launch
    launchCamera(
      {
        mediaType: 'photo',
        quality: 0.8,
      },
      response => {
        if (!response.didCancel && !response.error) {
          // Handle successful image capture
        }
      },
    );
  };

  // Function to upload the image to Supabase storage
  const uploadProfilePicture = async uri => {
    try {
      setUploading(true);
      const {
        data: {user},
        error: userError,
      } = await supabase.auth.getUser();
      if (userError) throw userError;

      // Convert image to blob
      const response = await fetch(uri);
      const blob = await response.blob();

      // Generate unique filename
      const fileExt = uri.split('.').pop();
      const fileName = `${user.email}-${Date.now()}.${fileExt}`;
      const filePath = `profile_pictures/${fileName}`;

      // Upload to Supabase storage
      const {error: uploadError, data: uploadData} = await supabase.storage
        .from('avatars') // Your bucket name
        .upload(filePath, blob);

      console.log(uploadData, 'user data');
      if (uploadError) throw uploadError;

      // Get public URL
      const {
        data: {publicUrl},
      } = supabase.storage.from('avatars').getPublicUrl(filePath);

      // Update user profile with new image URL
      const {error: updateError} = await supabase
        .from('users')
        .update({avatar_url: publicUrl})
        .eq('email', user.email);

      if (updateError) throw updateError;

      // Update local state
      setUserInfo(prev => ({...prev, avatar_url: publicUrl}));
      Alert.alert('Success', 'Profile picture updated!');
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      Alert.alert('Error', 'Failed to upload profile picture');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Container>
      <ScrollView>
        <View style={ProfileTabStyle.BackgroundWhite}>
          <View style={ProfileTabStyle.whilistminbody}>
            <View style={ProfileTabStyle.ImagCenter}>
              <View style={ProfileTabStyle.ImagCenter}>
                <View>
                  <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    disabled={uploading}>
                    <View>
                      {uploading ? (
                        <ActivityIndicator
                          size="large"
                          color={Colors.primary}
                        />
                      ) : (
                        <>
                          <Image
                            style={ProfileTabStyle.ImageStyles}
                            resizeMode="cover"
                            source={
                              profilePic || userInfo.avatar_url
                                ? {uri: profilePic || userInfo.avatar_url}
                                : images.User_image_one_profile
                            }
                          />
                          <View style={ProfileTabStyle.CameraIconContainer}>
                            <VectorIcons
                              icon="MaterialIcons"
                              name="photo-camera"
                              size={SF(20)}
                              color={Colors.white}
                            />
                          </View>
                        </>
                      )}
                    </View>
                  </TouchableOpacity>

                  {/* modal for profile */}
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}>
                    <View style={ProfileTabStyle.CenteredView}>
                      <View style={ProfileTabStyle.ImageSourceModal}>
                        <Text style={ProfileTabStyle.ModalTitle}>
                          Update Profile Picture
                        </Text>

                        <Button
                          title="Take Photo"
                          onPress={() => {
                            setModalVisible(false);
                            handleImagePicker('camera');
                          }}
                          style={ProfileTabStyle.ModalButton}
                        />

                        <Button
                          title="Choose from Gallery"
                          onPress={() => {
                            setModalVisible(false);
                            handleImagePicker('gallery');
                          }}
                          style={ProfileTabStyle.ModalButton}
                        />

                        <Button
                          title="Cancel"
                          onPress={() => setModalVisible(false)}
                          style={ProfileTabStyle.ModalCancelButton}
                        />
                      </View>
                    </View>
                  </Modal>
                  {/* end */}
                  {isEditing ? (
                    <Input
                      style={ProfileTabStyle.UserNameInput}
                      value={editData.display_name}
                      onChangeText={text =>
                        handleInputChange('display_name', text)
                      }
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <Text style={ProfileTabStyle.UserName}>
                      {userInfo.full_name || 'New User'}
                    </Text>
                  )}
                </View>
              </View>
            </View>
            <View style={ProfileTabStyle.ProfileDetailesMinview}>
              {/* edit buttons */}
              <View style={ProfileTabStyle.EditProfileHeader}>
                <Text style={ProfileTabStyle.EditProFile}>
                  {t('Edit_Profile')}
                </Text>
              </View>

              {/* Phone number field */}
              <View style={ProfileTabStyle.PhoneNumberAndIcon}>
                <View style={ProfileTabStyle.BgWhiteShadow}>
                  {isEditing ? (
                    <Input
                      style={ProfileTabStyle.EditInput}
                      value={editData.phone}
                      onChangeText={text => handleInputChange('phone', text)}
                      placeholder="Phone number"
                      keyboardType="phone-pad"
                    />
                  ) : (
                    <>
                      <Text style={ProfileTabStyle.PhoneNumberText}>
                        Phone Number
                      </Text>
                      <Text style={ProfileTabStyle.DigitNumberText}>
                        {userInfo.phone_number || 'Not provided'}
                      </Text>
                    </>
                  )}
                </View>
              </View>

              {/* Email field */}
              <View style={ProfileTabStyle.PhoneNumberAndIcon}>
                <View style={ProfileTabStyle.BgWhiteShadow}>
                  {isEditing ? (
                    <Input
                      style={ProfileTabStyle.EditInput}
                      value={editData.email}
                      onChangeText={text => handleInputChange('email', text)}
                      placeholder="Email"
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  ) : (
                    <>
                      <Text style={ProfileTabStyle.PhoneNumberText}>Email</Text>
                      <Text style={ProfileTabStyle.DigitNumberText}>
                        {userInfo.email || 'Not provided'}
                      </Text>
                    </>
                  )}
                </View>
              </View>

              <View>
                {isEditing ? (
                  <View style={ProfileTabStyle.ActionButtons}>
                    <Button
                      title="Save"
                      onPress={handleUpdateProfile}
                      buttonStyle={ProfileTabStyle.SaveButton}
                    />
                    <Button
                      title="Cancel"
                      onPress={() => {
                        setEditData({...userInfo});
                        setIsEditing(false);
                      }}
                      buttonStyle={ProfileTabStyle.CancelButton}
                    />
                  </View>
                ) : (
                  <Button
                    title="Edit"
                    onPress={() => setIsEditing(true)}
                    buttonStyle={ProfileTabStyle.EditButton}
                  />
                )}
              </View>

              <Spacing space={SH(20)} />
              <TouchableOpacity
                onPress={() => {
                  setAlertVisible(true);
                  setAlertMessage(alertdata.logout);
                }}>
                <View style={ProfileTabStyle.IconAndTextFlex}>
                  <View>
                    <Text style={ProfileTabStyle.LogOutView}>
                      {t('Log_Out')}
                    </Text>
                  </View>
                  <View>
                    <VectorIcons
                      icon="AntDesign"
                      size={SF(27)}
                      name="arrowright"
                      color={Colors.black_text_color}
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <ConfirmationAlert
                message={alertMessage}
                modalVisible={alertVisible}
                setModalVisible={setAlertVisible}
                onPressCancel={() => setAlertVisible(!alertVisible)}
                onPress={() => {
                  setAlertVisible(!alertVisible), onoknutton();
                }}
                cancelButtonText={t('Cancel_Button')}
                buttonText={t('Ok_Text')}
              />
              <TouchableOpacity
                onPress={() => navigation.navigate(RouteName.SETTINGS_SCREEN)}>
                <View style={ProfileTabStyle.IconAndTextFlex}>
                  <View>
                    <Text style={ProfileTabStyle.LogOutView}>
                      {t('Setting_Text')}
                    </Text>
                  </View>
                  <View>
                    <VectorIcons
                      icon="AntDesign"
                      size={SF(27)}
                      name="arrowright"
                      color={Colors.black_text_color}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

export default ProfileTab;
