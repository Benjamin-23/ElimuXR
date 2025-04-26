import React, { useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Style, SwiperStyles } from '../../style';
import { Button, Container, Lottie } from '../../Components';
import { useTranslation } from "react-i18next";
import { RouteName } from '../../routes';
import images from '../../index';

const App = (props) => {
  const { t } = useTranslation();
  const { navigation } = props;
  const { Colors } = useTheme();
  const SwiperStyle = useMemo(() => SwiperStyles(Colors), [Colors]);
  const Swiperdata = [
    {
      key: 's1',
      text: 'Swiper_title_1',
      title: 'Swiper_title_2',
      animation: images.Swiper_First,
      backgroundColor: 'transparent',
    },
    {
      key: 's2',
      text: 'Swiper_title_3',
      title: 'Swiper_title_4',
      animation: images.Swiper_Two,
      backgroundColor: 'transparent',
    },
    {
      key: 's3',
      text: 'Swiper_title_5',
      title: 'Swiper_title_6',
      animation: images.Swiper_Three,
      backgroundColor: 'transparent',
    },
  ]
  
  const RenderItem = ({ item }) => {
    return (
      <Container>
        <View style={SwiperStyle.minstyleviewphotograpgy}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={Style.scrollviewstyles}>
            <Text style={SwiperStyle.titleStyle}>
              {t(item.title)}
            </Text>
            <View style={SwiperStyle.imagset}>
              <Lottie
                source={item.animation}
              />
            </View>
            <Text style={SwiperStyle.textstyle}>
              {t(item.text)}
            </Text>
          </ScrollView>
        </View>
      </Container>
    );
  };
  const _renderDoneButton = () => {
    return (
      <Button
        title={t("Get_Started")}
        buttonStyle={SwiperStyle.buttonStyle}
        onPress={
          () => navigation.navigate(RouteName.LANGUAGE_SCREEN)
        }
      />
    );
  };
  const _renderNextButton = () => {
    return (
      <View style={SwiperStyle.setbgbuttondiv}>
        <Text style={SwiperStyle.nextbuttoncolorset}>{t("Next_Started")}</Text>
      </View>
    );
  };
  const _renderSkipButton = () => {
    return (
      <View style={SwiperStyle.setbgbuttondiv}>
        <TouchableOpacity onPress={
          () => navigation.navigate(RouteName.LANGUAGE_SCREEN)
        }>
          <Text style={SwiperStyle.nextbuttoncolorset}>{t("Skip_Started")}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <>
      <AppIntroSlider
        data={Swiperdata}
        renderItem={RenderItem}
        renderNextButton={_renderNextButton}
        renderSkipButton={_renderSkipButton}
        renderDoneButton={_renderDoneButton}
        showSkipButton={true}
        activeDotStyle={SwiperStyle.avtivedotsstyle}
        dotStyle={SwiperStyle.dotstyleset}
      />
    </>
  );
};
export default App;