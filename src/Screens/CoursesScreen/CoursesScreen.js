import React, { useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
import { View, KeyboardAvoidingView, FlatList } from 'react-native';
import { Style, CoursesStyle } from '../../style';
import { Container, CoursesView } from '../../Components';
import { RouteName } from '../../routes';
import { useTranslation } from "react-i18next";
import images from '../../index';
import { ScrollView } from 'react-native-virtualized-view';

const CoursesScreen = (props) => {
  const { navigation } = props;
  const { Colors } = useTheme();
  const { t } = useTranslation();
  const CoursesStyles = useMemo(() => CoursesStyle(Colors), [Colors]);
  const CoursesDataview = [
    {
      gittext: 'CarouselItemsFirst_Title_2',
      images: images.My_Courses_Image_1,
      reviewtext: 'photography_Title_37',
      digittext: '$89',
    },
    {
      gittext: 'photography_Title_38',
      images: images.My_Courses_Image_2,
      reviewtext: 'photography_Title_40',
      digittext: '$116',
    },
    {
      gittext: 'photography_Title_39',
      images: images.My_Courses_Image_3,
      reviewtext: 'photography_Title_37',
      digittext: '$76',
    },
    {
      gittext: 'photography_Title_13',
      images: images.My_Courses_Image_4,
      reviewtext: 'photography_Title_37',
      digittext: '$140',
    },
    {
      gittext: 'PopularCoursesData_Title_12',
      images: images.My_Courses_Image_5,
      reviewtext: 'photography_Title_37',
      digittext: '$89',
    },
    {
      gittext: 'Purchased_History_view_11',
      images: images.My_Courses_Image_6,
      reviewtext: 'photography_Title_37',
      digittext: '$75',
    },
    {
      gittext: 'CarouselItemsFirst_Title_8',
      images: images.My_Courses_Image_3,
      reviewtext: 'photography_Title_37',
      digittext: '$40',
    },
    {
      gittext: 'Purchased_History_view_16',
      images: images.Description_image_1,
      reviewtext: 'photography_Title_37',
      digittext: '$108',
    },
  ];
  return (
    <Container>
      <View style={CoursesStyles.minstyleviewphotograpgy}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={Style.scrollviewstyles}>
          <View style={CoursesStyles.keybordtopviewstyle}>
            <KeyboardAvoidingView enabled>
              <View style={CoursesStyles.minviewsigninscreen}>
                <FlatList
                  data={CoursesDataview}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => (<CoursesView
                    item={item}
                    onPress={() => navigation.navigate(RouteName.COURSES_DETAILS_SCREEN)}
                  />)}
                />
              </View>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </View>
    </Container>
  );
};

export default CoursesScreen;
