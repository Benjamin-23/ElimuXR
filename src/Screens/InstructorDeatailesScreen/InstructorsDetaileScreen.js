import React, { useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
import { Text, View, Image, KeyboardAvoidingView, FlatList, TouchableOpacity, } from "react-native";
import { Container, VectorIcons, InstructorDetailView, Rating, Spacing } from '../../Components';
import images from '../../index';
import { Style, InstructorsDetaileStyle } from "../../style";
import { SF, SH } from "../../Utiles";
import { useTranslation } from "react-i18next";
import { ScrollView } from 'react-native-virtualized-view';

const InstructorsDetaileScreen = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { Colors } = useTheme();
  const InstructorsDetaileStyles = useMemo(() => InstructorsDetaileStyle(Colors), [Colors]);
  const InstructorDetailData = [
    {
      "id": 1,
      "image": images.My_Courses_Image_1,
      "text": "Instructor_Title_22",
      "rating": <Rating
        tintColor={Colors.white_text_color}
        imageSize={20} />,
      "usertext": "Instructor_Title_23",
      "usericon": "user",
      "clockicon": "clockcircleo",
      "timetextset": "Instructor_Title_24",
      "buttonset": "Instructor_Title_25",
      "buttonsettwo": "Instructor_Title_26",
    },
    {
      "id": 2,
      "image": images.My_Courses_Image_2,
      "text": "Instructor_Title_27",
      "rating": <Rating
        tintColor={Colors.white_text_color}
        imageSize={20} />,
      "usertext": "Instructor_Title_28",
      "usericon": "user",
      "clockicon": "clockcircleo",
      "timetextset": "Instructor_Title_29",
      "buttonset": "Instructor_Title_25",
      "buttonsettwo": "Instructor_Title_26",
    },
    {
      "id": 3,
      "image": images.My_Courses_Image_3,
      "text": "Instructor_Title_30",
      "rating": <Rating
        tintColor={Colors.white_text_color}
        imageSize={20} />,
      "usertext": "Instructor_Title_18",
      "usericon": "user",
      "clockicon": "clockcircleo",
      "timetextset": "Instructor_Title_31",
      "buttonset": "Instructor_Title_25",
      "buttonsettwo": "Instructor_Title_26",
    },
  ]
  return (
    <Container>
      <View style={InstructorsDetaileStyles.minstyleviewphotograpgy}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={Style.scrollviewInstructorsDetaileStyles}>
          <KeyboardAvoidingView enabled>
            <View style={InstructorsDetaileStyles.minflexview}>
              <View style={InstructorsDetaileStyles.minviewsigninscreen}>
                <View style={InstructorsDetaileStyles.justicenterview}>
                  <Image style={InstructorsDetaileStyles.imagsetstyle} resizeMode="cover" source={images.videocall_four_img} />
                </View>
                <Text style={InstructorsDetaileStyles.texctstyles}>{t("Instructor_Title_18")}</Text>
                <Spacing space={SH(10)} />
                <Rating
                  imageSize={20}
                  tintColor={Colors.lavender_blush_colors}
                />
                <View style={InstructorsDetaileStyles.minflexviewstyle}>
                  <View>
                    <TouchableOpacity style={InstructorsDetaileStyles.bgcolorwhiteset}>
                      <VectorIcons icon="AntDesign" name="copy1" size={SF(30)} color={Colors.theme_backgound} />
                    </TouchableOpacity>
                    <Text style={InstructorsDetaileStyles.texctstyles}>5</Text>
                    <Text style={InstructorsDetaileStyles.corsestextstyle}>{t("Instructor_Title_19")}</Text>
                  </View>
                  <View>
                    <TouchableOpacity style={InstructorsDetaileStyles.bgcolorwhiteset}>
                      <VectorIcons icon="FontAwesome" name="user" size={35} color={Colors.theme_backgound} />
                    </TouchableOpacity>
                    <Text style={InstructorsDetaileStyles.texctstyles}>600</Text>
                    <Text style={InstructorsDetaileStyles.corsestextstyle}>{t("Instructor_Title_20")}</Text>
                  </View>
                  <View>
                    <TouchableOpacity style={InstructorsDetaileStyles.bgcolorwhiteset}>
                      <VectorIcons icon="FontAwesome5" name="users" size={30} color={Colors.theme_backgound} />
                    </TouchableOpacity>
                    <Text style={InstructorsDetaileStyles.texctstyles}>135</Text>
                    <Text style={InstructorsDetaileStyles.corsestextstyle}>{t("Instructor_Title_21")}</Text>
                  </View>
                </View>
                <View>
                  <FlatList
                    data={InstructorDetailData}
                    renderItem={({ item, index }) => (<InstructorDetailView
                      item={item}
                      index={index}
                    />)}
                    showsHorizontalScrollIndicator={false}
                    style={InstructorsDetaileStyles.setflex}
                  />
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </Container>
  );
};
export default InstructorsDetaileScreen;
