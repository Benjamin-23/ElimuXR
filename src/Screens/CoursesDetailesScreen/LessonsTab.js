import React, { useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
import { View, FlatList } from "react-native";
import { LessonsTabStyle } from '../../style';
import { Container, LessonsTabViews, Spacing } from '../../Components';
import { SH } from '../../Utiles';
import images from '../../index';

const LessonsTab = (props) => {
  const { Colors } = useTheme();
  const LessonsTabStyles = useMemo(() => LessonsTabStyle(Colors), [Colors]);
  const { onPress } = props;
  const LessonsTabData = [
    {
      imge: images.My_Courses_Image_1,
      roundimagtitle: 'photography_Title_7',
      roundimagtitletwo: 'photography_Title_8',
      iconname: 'unlock',
      Unlockedtext: 'photography_Title_10',
    },
    {
      imge: images.My_Courses_Image_2,
      roundimagtitle: 'PopularCoursesData_Title_12',
      roundimagtitletwo: 'photography_Title_11',
      iconname: 'lock',
      Unlockedtext: 'photography_Title_9',
    },
    {
      imge: images.My_Courses_Image_3,
      roundimagtitle: 'Purchased_History_view_11',
      roundimagtitletwo: 'photography_Title_11.',
      iconname: 'lock',
      Unlockedtext: 'photography_Title_9',
    },
    {
      imge: images.My_Courses_Image_4,
      roundimagtitle: 'CarouselItemsFirst_Title_6',
      roundimagtitletwo: 'photography_Title_12',
      iconname: 'lock',
      Unlockedtext: 'photography_Title_9',
    },
    {
      imge: images.My_Courses_Image_5,
      roundimagtitle: 'photography_Title_13',
      roundimagtitletwo: 'photography_Title_14',
      iconname: 'lock',
      Unlockedtext: 'photography_Title_9',
    },
  ];
  return (
    <Container>
      <View style={LessonsTabStyles.overviewtabminview}>
        <View>
          <Spacing space={SH(20)} />
          <FlatList
            data={LessonsTabData}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (<LessonsTabViews
              item={item}
              onPress={() => onPress()}
            />)}
          />
        </View>
      </View>
    </Container>
  );
}
export default LessonsTab;





