import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Colors, SF, SH } from '../../Utiles';
import { VectorIcons } from '../../Components';

function HeaderLeftMenuIcon(props) {
    const { navigation } = props;
    return (
        <TouchableOpacity style={{left:SH(13)}} onPress={() => navigation.toggleDrawer()}>
            <VectorIcons
                color={Colors.theme_backgound}
                name="navicon"
                icon="EvilIcons"
                size={SF(35)}
            />
        </TouchableOpacity>
    );
};

export default HeaderLeftMenuIcon;