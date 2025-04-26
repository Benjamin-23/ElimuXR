import React, { useMemo } from 'react';
import { View, Text, Image } from 'react-native';
import { ChatStyles } from '../../style';
import { SH, Colors } from "../../Utiles";
import { Container, Spacing, VectorIcons } from '../../Components';
import { useTranslation } from "react-i18next";
import images from '../../index';

const ChatDataView = (props) => {

    const { t } = useTranslation();
    const { item, index, onPress } = props;

    return (
        <Container>
            <View style={ChatStyles.MarginBottomSpace}>
                <View style={ChatStyles.FlexRowJustyCenter}>
                    <View style={ChatStyles.ChatViewBgColor}>
                        <Text style={ChatStyles.TextColorMessage}>{t(item.ChatSelf)}</Text>
                        <Text style={ChatStyles.TextColorMessageTwo}>03:16</Text>
                    </View>
                </View>
                <Text style={ChatStyles.DataSandTimeColor}>{t(item.DateText)}</Text>
                <Spacing space={SH(10)} />
            </View>
            <View style={ChatStyles.MarginBottomSpace}>
                <View style={ChatStyles.FlexRowJustyCentertwo}>
                    <View style={ChatStyles.LeftImageView}>
                        <Image source={images.videocall_four_img} style={ChatStyles.ImagStyleandCall} resizeMode={'cover'} />
                    </View>
                    <View style={ChatStyles.MessageMinviewOwner}>
                        <Text style={ChatStyles.TextColorMessage}>{t(item.DateText_Actually)}</Text>
                        <View style={ChatStyles.FlexCheckSet}>
                            <View>
                                <Text style={ChatStyles.TextColorMessageTwotwo}>{item.ChatTime_User}</Text>
                                {item.icon}
                            </View>
                            <View style={ChatStyles.SetRightIconViewStyle}>
                                <VectorIcons icon="AntDesign" color={Colors.white_text_color} name="check" />
                                <VectorIcons icon="AntDesign" color={Colors.white_text_color} style={ChatStyles.SetIconPotion} name="check" />
                            </View>
                        </View>
                    </View>
                </View>
                <Spacing space={SH(20)} />
            </View>
        </Container>
    );
}
export default ChatDataView;