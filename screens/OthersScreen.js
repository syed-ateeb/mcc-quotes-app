import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { TouchableWithoutFeedback, View, Text, StyleSheet } from 'react-native';
import PressableButton from '../components/PressableButton';
import { auth } from '../services/firebase';
import {
  calculateCloudCount,
  calculateLocalCount,
  calculateTotalCount,
} from '../services/calculator';
import LoadingModal from '../components/LoadingModal';

function OthersScreen() {
  const [cloudCount, setCloudCount] = useState(0);
  const [localCount, setLocalCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const user = { email: auth.currentUser.email };

  const navigation = useNavigation();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigation.replace('auth');
    } catch (e) {
      console.log('Could not sign out');
      console.log(e.message);
    }
  };

  useEffect(() => {
    (async () => {
      const cc = await calculateCloudCount();
      const lc = await calculateLocalCount();
      const tc = await calculateTotalCount();
      setCloudCount(cc);
      setLocalCount(lc);
      setTotalCount(tc);
      setIsLoading(false);
    })();
  }, []);

  return (
    <TouchableWithoutFeedback style={{ flex: 1 }}>
      <View style={style.mainView}>
        {isLoading && <LoadingModal loadingMessage="Loading..." />}
        <Text style={style.textStyle}>Logged in as: {user.email}</Text>
        <Text style={style.textStyle}>Quotes saved on cloud: {cloudCount}</Text>
        <Text style={style.textStyle}>
          Quotes saved on local storage: {localCount}
        </Text>
        <Text style={style.textStyle}>Total quotes saved: {totalCount}</Text>
        <PressableButton onPress={handleSignOut} buttonText="Sign out" />
      </View>
    </TouchableWithoutFeedback>
  );
}

export default OthersScreen;

const style = StyleSheet.create({
  mainView: {
    flex: 1,
    padding: 10,
  },
  textStyle: {
    color: 'black',
    padding: 5,
  },
});
