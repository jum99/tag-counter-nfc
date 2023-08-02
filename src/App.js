import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import nfcManager from 'react-native-nfc-manager';
import Game from './Game';

function App(props) {
  const [hasNfc, setHasNfc] = React.useState(null);
  const [enabled, setEnabled] = React.useState(null);

  React.useEffect(() => {
    async function checkNfc() {
      const supported = await nfcManager.isSupported();
      if (supported) {
        await nfcManager.start();
        setEnabled(await nfcManager.isEnabled());
      }
      setHasNfc(supported);
    }
    checkNfc();
  }, []);
  if (hasNfc === null) {
    return null;
  } else if (!hasNfc) {
    return (
      <View style={styles.wrapper}>
        <Text>Your device doesn't support nfc</Text>
      </View>
    );
  } else if (!enabled) {
    return (
      <View style={styles.wrapper}>
        <Text>Your nfc is not enabled</Text>
        <TouchableOpacity
          onPress={() => {
            nfcManager.goToNfcSetting();
          }}>
          <Text>GO TO SETTINGS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            setEnabled(await nfcManager.isEnabled());
          }}>
          <Text>Check again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return <Game />;
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
