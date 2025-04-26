import React, { useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
import { View, FlatList, KeyboardAvoidingView, } from "react-native";
import { Container, InstructorListView, Rating } from '../../Components';
import { Style, ProfileStyles } from "../../style";
import { RouteName } from "../../routes";
import images from '../../index';
import { ScrollView } from 'react-native-virtualized-view';

const InstructorsProfileScreen = (props) => {

  const { navigation } = props;
  const { Colors } = useTheme();
  const ProfileStyle = useMemo(() => ProfileStyles(Colors), [Colors]);
  const InstructerData = [
    {
      "id": 1,
      "image": images.videocall_one_img,
      "icon": "dot-fill",
      "colors": Colors.green_dot_color,
      "text": "Instructor_Title_32",
      "rating": <Rating
        tintColor={Colors.white_text_color}
        imageSize={20}
      />,
      "jobtextset": "Instructor_Title_33",
    },
    {
      "id": 2,
      "image": images.videocall_two_img,
      "icon": "dot-fill",
      "colors": Colors.red_color_set,
      "text": "Instructor_Title_34",
      "rating": <Rating
        tintColor={Colors.white_text_color}
        imageSize={20}
      />,
      "jobtextset": "Instructor_Title_35",
    },
    {
      "id": 3,
      "image": images.videocall_three_img,
      "icon": "dot-fill",
      "colors": Colors.red_color_set,
      "text": "Instructor_Title_36",
      "rating": <Rating
        tintColor={Colors.white_text_color}
        imageSize={20}
      />,
      "jobtextset": "Instructor_Title_37",
    },
    {
      "id": 4,
      "image": images.videocall_four_img,
      "icon": "dot-fill",
      "text": "Instructor_Title_34",
      "colors": Colors.green_dot_color,
      "rating": <Rating
        tintColor={Colors.white_text_color}
        imageSize={20}
      />,
      "jobtextset": "Instructor_Title_38",
    },
    {
      "id": 5,
      "image": images.videocall_six_img,
      "icon": "dot-fill",
      "colors": Colors.green_dot_color,
      "text": "Instructor_Title_39",
      "rating": <Rating
        tintColor={Colors.white_text_color}
        imageSize={20}
      />,
      "jobtextset": "Instructor_Title_40",
    },
    {
      "id": 6,
      "image": images.videocall_saven_img,
      "icon": "dot-fill",
      "colors": Colors.red_color_set,
      "text": "Instructor_Title_41",
      "rating": <Rating
        tintColor={Colors.white_text_color}
        imageSize={20}
      />,
      "jobtextset": "Instructor_Title_40",
    },
    {
      "id": 7,
      "image": images.videocall_aeight_img,
      "icon": "dot-fill",
      "colors": Colors.green_dot_color,
      "text": "Instructor_Title_42",
      "rating": <Rating
        tintColor={Colors.white_text_color}
        imageSize={20}
      />,
      "jobtextset": "Instructor_Title_43",
    },
    {
      "id": 8,
      "image": images.videocall_aeight_img_two,
      "icon": "dot-fill",
      "text": "Instructor_Title_44",
      "colors": Colors.red_color_set,
      "rating": <Rating
        tintColor={Colors.white_text_color}
        imageSize={20}
      />,
      "jobtextset": "Instructor_Title_45",
    },
  ]
  return (
    <Container>
      <View style={ProfileStyle.minstyleviewphotograpgy}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={Style.scrollviewstyles}>
          <KeyboardAvoidingView enabled>
            <View style={ProfileStyle.minflexview}>
              <View style={ProfileStyle.minviewsigninscreen}>
                <FlatList
                  data={InstructerData}
                  renderItem={({ item }) => (<InstructorListView
                    item={item}
                    onPress={() => navigation.navigate(RouteName.INSTRUCTOR_DETAILS_SCREEN)}
                  />)}
                  numColumns={2}
                  showsHorizontalScrollIndicator={false}
                  style={ProfileStyle.setflex}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </Container>
  );
};
export default InstructorsProfileScreen;
