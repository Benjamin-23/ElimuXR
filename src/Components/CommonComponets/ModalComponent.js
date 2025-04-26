import React, { useMemo } from 'react';
import { Modal, View, Pressable, Image } from 'react-native';
import { ModalStyle } from '../../style';
import images from '../../index';

function ModalComponent({ children, modalVisible, setModalVisible, close, ModalViewStyle, modalbuttonClose }) {

  return <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      setModalVisible(!modalVisible);
    }}
  >
    <View style={ModalStyle.ModalCenteredView}>
      <View style={[ModalStyle.ModalView, { ...ModalViewStyle }]}>
        <Pressable
          style={ModalStyle.CloseView}
          onPress={() => close ? close() : null}
        >
          {close ?
            <Pressable
              style={[ModalStyle.ModalButtonClose, { ...modalbuttonClose }]}
              onPress={() => close()}
            >
              {/* <Image resizeMode='cover' source={images.close} /> */}
            </Pressable>
            : null}
          {children}
        </Pressable>
      </View>
    </View>
  </Modal>;
}

export default ModalComponent;
