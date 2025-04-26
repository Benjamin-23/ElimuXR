import React, { useMemo } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { HomeStyles } from '../../style';
import { widthPercent } from '../../Utiles';
import { useTranslation } from "react-i18next";
import { useTheme } from '@react-navigation/native';
import images from '../../index';

const HomeCarouselSlider = (props) => {
  const { navigation, onPress } = props;
  const { Colors } = useTheme();
  const HomeStyle = useMemo(() => HomeStyles(Colors), [Colors]);
  let _slider1Ref;
  const { t } = useTranslation();

  const CarouselItemsFirst = [
    {
      title: 'CarouselItemsFirst_Title_1',
      paregraphtitle: 'CarouselItemsFirst_Title_2',
      imge: images.Home_First_Slide_Image_1,
    },
    {
      title: 'CarouselItemsFirst_Title_3',
      paregraphtitle: 'CarouselItemsFirst_Title_4',
      imge: images.Home_First_Slide_Image_2,
    },
    {
      title: 'CarouselItemsFirst_Title_5',
      paregraphtitle: 'CarouselItemsFirst_Title_6',
      imge: images.Home_First_Slide_Image_3,
    },
    {
      title: 'CarouselItemsFirst_Title_7',
      paregraphtitle: 'CarouselItemsFirst_Title_8',
      imge: images.Home_First_Slide_Image_4,
    },
    {
      title: 'CarouselItemsFirst_Title_9',
      paregraphtitle: 'CarouselItemsFirst_Title_10',
      imge: images.Home_First_Slide_Image_5,
    },
  ];

  const _renderItem = ({ item, index }) => {
    return (
      <View>
        <TouchableOpacity style={HomeStyle.rounftextview} onPress={
          () => onPress()
        }>
          <Image style={HomeStyle.imagsetstyle} resizeMode="stretch" source={item.imge} />
          <Text
            style={HomeStyle.textContainer}
          >
            {t(item.title)}
          </Text>
          <Text
            style={HomeStyle.textContainertwo}
          >
            {t(item.paregraphtitle)}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <Carousel
      ref={c => _slider1Ref = c}
      data={CarouselItemsFirst}
      renderItem={_renderItem}
      sliderWidth={widthPercent(100)}
      itemWidth={widthPercent(85)}
      hasParallaxImages={false}
      inactiveSlideScale={0.94}
      inactiveSlideOpacity={0.7}
      containerCustomStyle={HomeStyle.slider}
      loop={true}
      autoplay={true}
      enableSnap={true}
      bounces={false}
    />
  );
};
export default HomeCarouselSlider;