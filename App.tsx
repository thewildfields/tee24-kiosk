/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, Text } from 'react-native';
import KioskScreen from './src/Components/KioskScreen';
import LoginScreen from './src/Components/LoginScreen';
import { GetSettings, RemoveSettings, SaveSettings } from './src/Functions/storage';
import SettingsScreen from './src/Components/SettingsScreen';


function App(): React.JSX.Element {

  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState(false);
  const [venue, setVenue] = useState(false);
  const [bay, setBay] = useState(false);

  useEffect(() => {
    GetSettings('userId')
      .then(response => setUserId(JSON.parse(response)))
      .catch(error => console.error(error));
    GetSettings('venue')
      .then(response => setVenue(JSON.parse(response)))
      .catch(error => console.error(error));
    GetSettings('bay')
      .then(response => setBay(JSON.parse(response)))
      .catch(error => console.error(error));
  },[]);

  const LogOut = () => {
    RemoveSettings('user');
    RemoveSettings('userId');
    setLoggedIn(false);
    setUserId(false);
  };

  const updateAppData = (key, value) => {
    switch (key) {
      case 'venue':
        setVenue(value);
      break;
    }
  };

  return (
    <SafeAreaView>
      { !userId && <LoginScreen
              onLogIn={ (logValue, newUserId) => {
                setLoggedIn(logValue);
                setUserId(newUserId);
              }}
            />
      }
      { userId && <KioskScreen/> }
      {/* <Button
        title="log out"
        onPress={LogOut}
      /> */}
    </SafeAreaView>
  );
}

export default App;
