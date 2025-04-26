import React, { useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
import { Text, View,  KeyboardAvoidingView, FlatList, TouchableOpacity, } from "react-native";
import { SF, SH } from "../../../Utiles";
import { Style, ExamScreenStyle } from "../../../style";
import { Search, Spacing, ExamView, Container, VectorIcons } from '../../../Components';
import { useTranslation } from "react-i18next";
import { RouteName } from '../../../routes';
import { ScrollView } from 'react-native-virtualized-view';

const ExamScreen = (props) => {
    const { t } = useTranslation();
    const { navigation } = props;
    const { Colors } = useTheme();
    const ExamScreenStyles = useMemo(() => ExamScreenStyle(Colors), [Colors]);
    const ExamTabData = [
        {
          Title: 'photography_Titles_4',
          IconMin: <VectorIcons icon="Entypo" name="creative-cloud" size={SF(35)} color={Colors.theme_backgound} />,
          Titletwo: 'photography_Titles_5',
          IconMintwo: <VectorIcons icon="Entypo" name="code" size={SF(35)} color={Colors.theme_backgound} />,
        },
        {
          Title: 'photography_Titles_6',
          IconMin: <VectorIcons icon="MaterialCommunityIcons" name="head-cog-outline" size={SF(35)} color={Colors.theme_backgound} />,
          Titletwo: 'photography_Titles_7',
          IconMintwo: <VectorIcons icon="FontAwesome5" name="user-cog" size={SF(35)} color={Colors.theme_backgound} />,
        },
        {
          Title: 'photography_Titles_8',
          IconMin: <VectorIcons icon="FontAwesome5" name="cogs" size={SF(35)} color={Colors.theme_backgound} />,
          Titletwo: 'photography_Titles_9',
          IconMintwo: <VectorIcons icon="FontAwesome5" name="people-carry" size={SF(35)} color={Colors.theme_backgound} />,
        },
        {
          Title: 'photography_Titles_10',
          IconMin: <VectorIcons icon="MaterialCommunityIcons" name="google-analytics" size={SF(35)} color={Colors.theme_backgound} />,
          Titletwo: 'photography_Titles_11',
          IconMintwo: <VectorIcons icon="MaterialCommunityIcons" name="desktop-mac-dashboard" size={SF(35)} color={Colors.theme_backgound} />,
        },
      ];
      
    return (
        <Container>
            <View style={ExamScreenStyles.minstyleviewphotograpgy}>
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={Style.scrollviewstyles}>
                    <KeyboardAvoidingView enabled>
                        <View style={ExamScreenStyles.minflexview}>
                            <View style={ExamScreenStyles.minviewsigninscreen}>
                                <Text style={ExamScreenStyles.examtitle}>{t("Exam_Title_1")}</Text>
                                <Spacing space={SH(20)} />
                                <Search placeholder={"Search"} />
                                <Spacing space={SH(10)} />
                                <View style={ExamScreenStyles.marginbottomspace}>
                                    <FlatList
                                        data={ExamTabData}
                                        showsHorizontalScrollIndicator={false}
                                        renderItem={({ item }) => (<ExamView
                                            item={item}
                                            onPress={() => navigation.navigate(RouteName.SELECT_EXAM_SCREEN)}
                                        />)}
                                    />
                                </View>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        </Container >
    );
};

export default ExamScreen;
