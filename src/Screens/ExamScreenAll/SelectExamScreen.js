import React, { useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
import { View,  KeyboardAvoidingView, FlatList } from "react-native";
import { Button, Container, SelectExamView } from '../../Components';
import { Style, SelectExamScreenStyle } from "../../style";
import { RouteName } from '../../routes';
import { useTranslation } from "react-i18next";
import { ScrollView } from 'react-native-virtualized-view';

const SelectExamScreen = (props) => {
    const { navigation } = props;
    const { t } = useTranslation();
    const { Colors } = useTheme();
    const SelectExamScreenStyles = useMemo(() => SelectExamScreenStyle(Colors), [Colors]);
    const SelectExmaData = [
        {
          Title: 'photography_Titles_12',
          Titletwo: 'photography_Titles_13',
        },
        {
          Title: 'photography_Titles_14',
          Titletwo: 'photography_Titles_15',
        },
        {
          Title: 'photography_Titles_16',
          Titletwo: 'photography_Titles_17',
        },
        {
          Title: 'photography_Titles_18',
          Titletwo: 'photography_Titles_19',
        },
        {
          Title: 'photography_Titles_20',
          Titletwo: 'photography_Titles_21',
        },
        {
          Title: 'photography_Titles_22',
          Titletwo: 'photography_Titles_23',
        },
        {
          Title: 'photography_Titles_24',
          Titletwo: 'photography_Titles_25',
        },
      ];
    return (
        <Container>
            <View style={SelectExamScreenStyles.minstyleviewphotograpgy}>
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={Style.scrollviewstyles}>
                    <KeyboardAvoidingView enabled>
                        <View style={SelectExamScreenStyles.minflexview}>
                            <View style={SelectExamScreenStyles.minviewsigninscreen}>
                                <View style={SelectExamScreenStyles.marginbottomspace}>
                                    <FlatList
                                        data={SelectExmaData}
                                        showsHorizontalScrollIndicator={false}
                                        renderItem={({ item }) => (<SelectExamView
                                            item={item}
                                            onPress={() => navigation.navigate(RouteName.EXAM_QUESTION_SCREEN)}
                                        />)}
                                    />
                                </View>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
                <View style={SelectExamScreenStyles.ButtonSelectExamScreenStyle}>
                    <Button title={t("View_All_Text")} onPress={() => navigation.navigate(RouteName.EXAM_QUESTION_SCREEN)} />
                </View>
            </View>
        </Container>
    );
};
export default SelectExamScreen;
