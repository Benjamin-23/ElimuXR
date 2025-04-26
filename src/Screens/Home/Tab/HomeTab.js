import React, { useMemo } from 'react';
import { View,  KeyboardAvoidingView, FlatList, Text, TouchableOpacity } from "react-native";
import { HomeStyles, Style } from '../../../style';
import { SH } from '../../../Utiles';
import { Container, Rating } from '../../../Components';
import LinearGradient from 'react-native-linear-gradient';
import { HomeSmallImageView, Spacing, PopularCoursesView, InstructorView, HomeCarouselSlider, NewCoursesView } from '../../../Components';
import { useTranslation } from "react-i18next";
import { RouteName } from "../../../routes";
import { useTheme } from '@react-navigation/native';
import images from '../../../index';
import { ScrollView } from 'react-native-virtualized-view';

const HomeTab = (props) => {
  const { t } = useTranslation();
  const { navigation } = props;
  const { Colors } = useTheme();
  const HomeStyle = useMemo(() => HomeStyles(Colors), [Colors]);
  const HomeImageData = [
    {
      roundimagtitle: 'HomeImageData_Title_1',
      imge: images.Home_First_Slide_Image_7,
    },
    {
      roundimagtitle: 'HomeImageData_Title_2',
      imge: images.Home_First_Slide_Image_8,
    },
    {
      roundimagtitle: 'HomeImageData_Title_3',
      imge: images.Home_First_Slide_Image_9,
    },
    {
      roundimagtitle: 'HomeImageData_Title_4',
      imge: images.Home_First_Slide_Image_10,
    },
    {
      roundimagtitle: 'HomeImageData_Title_5',
      imge: images.Home_First_Slide_Image_11,

    },
    {
      roundimagtitle: 'HomeImageData_Title_6',
      imge: images.Home_First_Slide_Image_12,

    },
    {
      roundimagtitle: 'HomeImageData_Title_7',
      imge: images.Home_First_Slide_Image_13,
    },
  ];
  const NewCoursesData = [
    {
      whitebodyimagetext: 'PopularCoursesData_Title_9',
      blacktitle: 'PopularCoursesData_Title_10',
      rating: <Rating imageSize={17} />,
      blacktitledigit2: '$59',
      imge: images.Home_First_Slide_Image_18,
    },
    {
      whitebodyimagetext: 'PopularCoursesData_Title_11',
      blacktitle: 'PopularCoursesData_Title_12',
      rating: <Rating imageSize={17} />,
      blacktitledigit2: '$64',
      imge: images.Home_First_Slide_Image_19,
    },
    {
      whitebodyimagetext: 'PopularCoursesData_Title_13',
      blacktitle: 'PopularCoursesData_Title_14',
      rating: <Rating imageSize={17} />,
      blacktitledigit2: '$49',
      imge: images.Home_First_Slide_Image_20,
    },
    {
      whitebodyimagetext: 'PopularCoursesData_Title_15',
      blacktitle: 'PopularCoursesData_Title_16',
      rating: <Rating imageSize={17} />,
      blacktitledigit2: '$59',
      imge: images.Home_First_Slide_Image_21,
    },
  ];
  const PopularCoursesData = [
    {
      whitebodyimagetext: 'PopularCoursesData_Title_1',
      blacktitle: 'PopularCoursesData_Title_2',
      rating: <Rating imageSize={17} />,
      blacktitledigit2: '$49',
      imge: images.Home_First_Slide_Image_14,
    },
    {
      whitebodyimagetext: 'PopularCoursesData_Title_3',
      blacktitle: 'PopularCoursesData_Title_4',
      rating: <Rating imageSize={17} />,
      blacktitledigit2: '$59',
      imge: images.Home_First_Slide_Image_15,
    },
    {
      whitebodyimagetext: 'PopularCoursesData_Title_5',
      blacktitle: 'PopularCoursesData_Title_6',
      rating: <Rating imageSize={17} />,
      blacktitledigit2: '$59',
      imge: images.Home_First_Slide_Image_16,
    },
    {
      whitebodyimagetext: 'PopularCoursesData_Title_7',
      blacktitle: 'PopularCoursesData_Title_8',
      rating: <Rating imageSize={17} />,
      blacktitledigit2: '$64',
      imge: images.Home_First_Slide_Image_17,
    },
  ]
  const InstructorData = [
    {
      username: 'PopularCoursesData_Title_17',
      userjob: 'PopularCoursesData_Title_18',
      rating: <Rating imageSize={17} ratingCount={3} />,
      userrankingtwo: 'PopularCoursesData_Title_19',
      imge: images.Home_First_Slide_Image_22,
    },
    {
      username: 'PopularCoursesData_Title_20',
      userjob: 'PopularCoursesData_Title_21',
      rating: <Rating imageSize={17} ratingCount={3} />,
      userrankingtwo: 'PopularCoursesData_Title_22',
      imge: images.Home_First_Slide_Image_23,
    },
    {
      username: 'PopularCoursesData_Title_23',
      userjob: 'PopularCoursesData_Title_24',
      rating: <Rating imageSize={17} ratingCount={3} />,
      userrankingtwo: 'PopularCoursesData_Title_25',
      imge: images.Home_First_Slide_Image_24,
    },
    {
      username: 'PopularCoursesData_Title_26',
      userjob: 'PopularCoursesData_Title_27',
      rating: <Rating imageSize={17} ratingCount={3} />,
      userrankingtwo: 'PopularCoursesData_Title_28',
      imge: images.Home_First_Slide_Image_25,
    },
    {
      username: 'PopularCoursesData_Title_29',
      userjob: 'PopularCoursesData_Title_30',
      rating: <Rating imageSize={17} ratingCount={3} />,
      userrankingtwo: 'PopularCoursesData_Title_31',
      imge: images.Home_First_Slide_Image_26,
    },
  ];

  return (
    <>
      <Container>
        <View style={HomeStyle.minstyleviewphotograpgy}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={Style.scrollviewstyle}>
            <KeyboardAvoidingView enabled>
              <LinearGradient
                start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                colors={['rgba(254,238,245,1)', 'rgba(223,238,255,1)']} >
                <View style={HomeStyle.minflexview}>
                  <View style={HomeStyle.minviewsigninscreen}>
                    <HomeCarouselSlider onPress={() => navigation.navigate(RouteName.COURSES_DETAILS_SCREEN)} />
                    <Spacing space={SH(30)} />
                    <View>
                      <FlatList
                        data={HomeImageData}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (<HomeSmallImageView
                          item={item}
                          onPress={() => navigation.navigate(RouteName.COURSES_SCREEN)}
                        />)}
                        contentContainerStyle={HomeStyle.leftrightpadding}
                      />
                    </View>
                    <Spacing space={SH(30)} />
                    <TouchableOpacity>
                      <Text style={HomeStyle.popularcourcetexttwo}>{t("Popular_Courses")}</Text>
                    </TouchableOpacity>
                    <Spacing space={SH(10)} />
                    <FlatList
                      data={PopularCoursesData}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      renderItem={({ item }) => (<PopularCoursesView
                        item={item}
                        onPress={() => navigation.navigate(RouteName.COURSES_DETAILS_SCREEN)}
                      />)}
                      contentContainerStyle={HomeStyle.leftrightpadding}
                    />
                    <Spacing space={SH(30)} />
                    <Text style={HomeStyle.popularcourcetexttwo}>{t("New_Courses")}</Text>
                    <Spacing space={SH(10)} />
                    <FlatList
                      data={NewCoursesData}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      renderItem={({ item }) => (<NewCoursesView
                        item={item}
                        onPress={() => navigation.navigate(RouteName.COURSES_DETAILS_SCREEN)}
                      />)}
                      contentContainerStyle={HomeStyle.leftrightpadding}
                    />
                    <Spacing space={SH(30)} />
                    <Text style={HomeStyle.popularcourcetexttwo}>{t("Instructor_Text")}</Text>
                    <Spacing space={SH(10)} />
                    <FlatList
                      data={InstructorData}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      renderItem={({ item }) => (<InstructorView
                        item={item}
                        onPress={() => navigation.navigate(RouteName.INTRUDUCTION_PROFILE_SCREEN)}
                      />)}
                      contentContainerStyle={HomeStyle.leftrightpadding}
                    />
                    <Spacing space={SH(30)} />
                  </View>
                </View>
              </LinearGradient>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Container>
    </>
  );
};
export default HomeTab;


