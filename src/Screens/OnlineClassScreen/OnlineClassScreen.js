import React, { useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
import { View, KeyboardAvoidingView, FlatList, } from "react-native";
import { OnlineClassStyle, Style } from '../../style';
import { Container, OnlineClassView } from '../../Components';
import { RouteName } from '../../routes';
import { ScrollView } from 'react-native-virtualized-view';

const OnlineClassScreen = (props) => {
  const OnlineClassData = [
    {
      "text": "Online_Class_title_1",
      "Datetext": "Online_Class_title_2",
      "buttontitle": "Online_Class_title_3",
      "navigationpass": RouteName.VIDEO_CALL_SCREEN,
      "Date": "23/07/2022",
      "starttime": "Online_Class_title_5",
      "settime": "Online_Class_title_6",
      "simpleline": "|",
    },
    {
      "text": "Online_Class_title_7",
      "buttontitle": "Online_Class_title_8",
      "navigationpass": RouteName.ONLINE_CLASS_SCREEN,
      "Datetext": "Online_Class_title_2",
      "Date": "01/06/2022",
    },
    {
      "id": 2,
      "text": "Online_Class_title_9",
      "Datetext": "Online_Class_title_2",
      "buttontitle": "Online_Class_title_3",
      "Date": "28/02/2022",
      "navigationpass": RouteName.VIDEO_CALL_SCREEN,
      "starttime": "Online_Class_title_5",
      "settime": "Online_Class_title_10",
      "simpleline": "|",
    },
    {
      "id": 3,
      "text": "Online_Class_title_11",
      "Datetext": "Online_Class_title_2",
      "buttontitle": "Online_Class_title_8",
      "navigationpass": RouteName.ONLINE_CLASS_SCREEN,
      "Date": "12/05/2022",
    },
    {
      "id": 4,
      "text": "Online_Class_title_12",
      "Datetext": "Online_Class_title_2",
      "buttontitle": "Online_Class_title_8",
      "navigationpass": RouteName.ONLINE_CLASS_SCREEN,
      "Date": "21/04/2022",
    },
    {
      "id": 5,
      "text": "Online_Class_title_13",
      "Datetext": "Online_Class_title_2",
      "Date": "26/10/2022",
      "navigationpass": RouteName.VIDEO_CALL_SCREEN,
      "starttime": "Online_Class_title_5",
      "settime": "Online_Class_title_14",
      "buttontitle": "Online_Class_title_3",
      "simpleline": "|",
    },
  ];
  const { navigation } = props;
  const { Colors } = useTheme();
  const OnlineClassStyles = useMemo(() => OnlineClassStyle(Colors), [Colors]);

  return (
    <Container>
      <View style={OnlineClassStyles.minstyleviewphotograpgy}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={Style.scrollviewstyles}>
          <KeyboardAvoidingView enabled>
            <View style={OnlineClassStyles.minflexview}>
              <View style={OnlineClassStyles.minviewsigninscreen}>
                <FlatList
                  data={OnlineClassData}
                  renderItem={({ item, index }) => (<OnlineClassView
                    item={item}
                    onPress={() => navigation.navigate(item.navigationpass)}
                    index={index}
                  />)}
                  showsHorizontalScrollIndicator={false}
                  style={OnlineClassStyles.setflex}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </Container>
  );
};
export default OnlineClassScreen;
