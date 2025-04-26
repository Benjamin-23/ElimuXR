import React, { useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
import { View, FlatList, KeyboardAvoidingView } from "react-native";
import { Style, WishilistTabStyle } from "../../../style";
import { WishiListView, Rating } from '../../../Components';
import { RouteName } from '../../../routes';
import images from '../../../index';
import { ScrollView } from 'react-native-virtualized-view';

const WishlistTab = (props) => {
  const MyCoursesData = [
    {
      Title: 'My_Courses_Title_1',
      TimeText: 'My_Courses_Title_2',
      rating: <Rating imageSize={17} />,
      VideoText: 'My_Courses_Title_3',
      image: images.My_Courses_Image_1,
      PriceText: '$ 54',
    },
    {
      Title: 'My_Courses_Title_4',
      TimeText: 'My_Courses_Title_5',
      rating: <Rating imageSize={17} />,
      VideoText: 'My_Courses_Title_6',
      image: images.My_Courses_Image_2,
      PriceText: '$ 84',
    },
    {
      Title: 'My_Courses_Title_7',
      TimeText: 'My_Courses_Title_8',
      rating: <Rating imageSize={17} />,
      VideoText: 'My_Courses_Title_9',
      image: images.My_Courses_Image_3,
      PriceText: '$ 64',
    },
    {
      Title: 'My_Courses_Title_10',
      TimeText: 'My_Courses_Title_11',
      rating: <Rating imageSize={17} />,
      VideoText: 'My_Courses_Title_12',
      image: images.My_Courses_Image_4,
      PriceText: '$ 94',
    },
    {
      Title: 'My_Courses_Title_13',
      TimeText: 'My_Courses_Title_14',
      rating: <Rating imageSize={17} />,
      VideoText: 'My_Courses_Title_15',
      image: images.My_Courses_Image_5,
      PriceText: '$ 79',
    },
    {
      Title: 'My_Courses_Title_15',
      TimeText: 'My_Courses_Title_16',
      rating: <Rating imageSize={17} />,
      VideoText: 'My_Courses_Title_17',
      image: images.My_Courses_Image_6,
      PriceText: '$ 60',
    },
    {
      Title: 'My_Courses_Title_18',
      TimeText: 'My_Courses_Title_19',
      rating: <Rating imageSize={17} />,
      VideoText: 'My_Courses_Title_20',
      image: images.My_Courses_Image_7,
      PriceText: '$ 70',
    },
    {
      Title: 'My_Courses_Title_21',
      TimeText: 'My_Courses_Title_22',
      rating: <Rating imageSize={17} />,
      VideoText: 'My_Courses_Title_23',
      image: images.My_Courses_Image_8,
      PriceText: '$ 54',
    },
  ];
  const { navigation } = props;
  const { Colors } = useTheme();
  const WishilistTabStyles = useMemo(() => WishilistTabStyle(Colors), [Colors]);

  return (
    <View style={WishilistTabStyles.minstyleviewphotograpgy}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={Style.scrollviewstyles}>
        <KeyboardAvoidingView enabled>
          <View style={WishilistTabStyles.minflexview}>
            <View style={WishilistTabStyles.whilistminbody}>
              <FlatList
                data={MyCoursesData}
                numColumns={1}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (<WishiListView
                  item={item}
                  onPress={() => navigation.navigate(RouteName.COURSES_DETAILS_SCREEN)}
                />)}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}
export default WishlistTab;