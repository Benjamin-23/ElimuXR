import React, { useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
import { View, KeyboardAvoidingView, FlatList, } from "react-native";
import { Container, PurchasedHistoryView } from '../../Components';
import { Style, PurchasedHistoryStyle } from "../../style";
import images from '../../index';
import { ScrollView } from 'react-native-virtualized-view';

const PurchasedHistoryScreen = (props) => {
  const { navigation } = props;
  const { Colors } = useTheme();
  const PurchasedHistoryStyles = useMemo(() => PurchasedHistoryStyle(Colors), [Colors]);
 
  const PurchasedHistoryData = [
    {
      "id": 1,
      "image": images.My_Courses_Image_2,
      "text": "Purchased_History_view_1",
      "usertext": "Purchased_History_view_2",
      "timetextset": "Purchased_History_view_3",
      "totalprice": "Purchased_History_view_4",
      "dolardprice": "$ 80.00",
      "paymenttypetext": "Purchased_History_view_5",
      "googlepay": "Purchased_History_view_6",
      "buttonset": "Purchased_History_view_7"
    },
    {
      "id": 2,
      "image": images.My_Courses_Image_3,
      "text": "Purchased_History_view_8",
      "usertext": "Purchased_History_view_9",
      "timetextset": "Purchased_History_view_3",
      "totalprice": "Purchased_History_view_4",
      "dolardprice": "$ 120.00",
      "paymenttypetext": "Purchased_History_view_5",
      "googlepay": "Purchased_History_view_10",
      "buttonset": "Purchased_History_view_7"
    },
    {
      "id": 3,
      "image": images.My_Courses_Image_4,
      "text": "Purchased_History_view_11",
      "usertext": "Purchased_History_view_12",
      "timetextset": "Purchased_History_view_3",
      "totalprice": "Purchased_History_view_4",
      "dolardprice": "$ 60.00",
      "paymenttypetext": "Purchased_History_view_5",
      "googlepay": "Purchased_History_view_13",
      "buttonset": "Purchased_History_view_7"
    },
    {
      "id": 4,
      "image": images.My_Courses_Image_5,
      "text": "Purchased_History_view_14",
      "usertext": "Purchased_History_view_15",
      "timetextset": "Purchased_History_view_3",
      "totalprice": "Purchased_History_view_4",
      "dolardprice": "$ 125.00",
      "paymenttypetext": "Purchased_History_view_5",
      "googlepay": "Purchased_History_view_6",
      "buttonset": "Purchased_History_view_7"
    },
    {
      "id": 5,
      "image": images.My_Courses_Image_1,
      "text": "Purchased_History_view_16",
      "usertext": "Purchased_History_view_17",
      "timetextset": "Purchased_History_view_3",
      "totalprice": "Purchased_History_view_4",
      "dolardprice": "$ 138.00",
      "paymenttypetext": "Purchased_History_view_5",
      "googlepay": "Purchased_History_view_10",
      "buttonset": "Purchased_History_view_7"
    }
  ]
  return (
    <Container>
      <View style={PurchasedHistoryStyles.minstyleviewphotograpgy}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={Style.scrollviewstyles}>
          <KeyboardAvoidingView enabled>
            <View style={PurchasedHistoryStyles.minflexview}>
              <View style={PurchasedHistoryStyles.minviewsigninscreen}>
                <View>
                  <FlatList
                    data={PurchasedHistoryData}
                    renderItem={({ item }) => (<PurchasedHistoryView
                      item={item}
                    />)}
                    showsHorizontalScrollIndicator={false}
                    style={PurchasedHistoryStyles.setflex}
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
export default PurchasedHistoryScreen;
