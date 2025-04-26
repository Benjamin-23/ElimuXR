import React, { useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
import { View, FlatList } from "react-native";
import { ReviewsTabStyle } from '../../style';
import { Container, Rating, ReviewsTabView, Spacing } from '../../Components';
import { SH } from '../../Utiles';
import images from '../../index';

const ReviewsTab = (props) => {
  const { Colors } = useTheme();
  const ReviewsTabStyles = useMemo(() => ReviewsTabStyle(Colors), [Colors]);
 
  const ReviewsTabData = [
    {
      imge: images.My_Courses_Image_1,
      datetext: 'photography_Title_15',
      username: 'photography_Title_16',
      rating: <Rating
        tintColor={Colors.lavender_blush_colors}
        imageSize={20} />,
      paregraphtext: 'photography_Title_17'
    },
    {
      imge: images.Reviews_Image_2,
      datetext: 'photography_Title_18',
      username: 'photography_Title_19',
      rating: <Rating
        tintColor={Colors.lavender_blush_colors}
        imageSize={20} />,
      paregraphtext: 'photography_Title_20'
    },
    {
      imge: images.Reviews_Image_3,
      datetext: 'photography_Title_21',
      username: 'photography_Title_22',
      rating: <Rating
        tintColor={Colors.lavender_blush_colors}
        imageSize={20} />,
      paregraphtext: 'photography_Title_23'
    },
    {
      imge: images.Reviews_Image_4,
      datetext: 'photography_Title_24',
      username: 'photography_Title_25',
      rating: <Rating
        tintColor={Colors.lavender_blush_colors}
        imageSize={20} />,
      paregraphtext: 'photography_Title_26'
    },
  ];
  return (
    <Container>
      <Spacing space={SH(20)} />
      <View style={ReviewsTabStyles.overviewtabminview}>
        <FlatList
          data={ReviewsTabData}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (<ReviewsTabView
            item={item}
          />)}
        />
      </View>
    </Container>
  );
}
export default ReviewsTab;





