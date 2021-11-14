import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';

function LoadingModal({ loadingMessage, transparent = true }) {
  return (
    <Modal visible={loadingMessage.length !== 0} transparent={transparent}>
      <View style={style.loadingModal}>
        <Text style={style.loadingText}>{loadingMessage}</Text>
      </View>
    </Modal>
  );
}

export default LoadingModal;

const style = StyleSheet.create({
  loadingModal: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  loadingText: {
    fontSize: 30,
    color: 'green',
  },
});
