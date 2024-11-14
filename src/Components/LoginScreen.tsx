import axios from 'axios';
import React, { PropsWithChildren, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { SaveSettings } from '../Functions/storage';
import { NativeModules } from 'react-native';
const { LauncherModule } = NativeModules;

type LoginScreenProps = PropsWithChildren<{
    onLogIn: Function,
}>

const LoginScreen = ({onLogIn}: LoginScreenProps): React.JSX.Element => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const launchTGC = async () => {
        try {
          await LauncherModule.launchUri('file:///C:/ProgramData/ProTee United/TGC Simulator/TGCSim.exe'); // Launches specific .exe
        } catch (error) {
          console.error('Error launching exe:', error);
        }
      };

    const SignIn = () => {

        const signInData = {
            email: email,
            password: password,
            isKiosk: true,
        };

        axios.post('https://us-central1-golf-bay-rental.cloudfunctions.net/app/auth/sign-in', signInData)
            .then(
                async response => {
                    if(response.data.message && response.data.message === 'Login successful'){
                        const user = response.data.user;
                        onLogIn(true, user._id);
                        SaveSettings('userId', user._id);
                        SaveSettings('token', response.data.token);
                    }
                })
                // response => console.log(response))
            .catch(err => {
                console.error(err);
                setErrorMessage(err.message);
            });

    };

    return(
        <View style={styles.loginScreen} >
            <Text>Login Screen</Text>
            <TextInput
                style={styles.textInput}
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.textInput}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
            />
            <Button
              title="log in"
              onPress={ SignIn }
            />
            <Button
              title="Launch TGC"
              onPress={ launchTGC}
            />
            <Text>{errorMessage}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    loginScreen: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        maxWidth: 1024,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 32,
        gap: 16,
    },
    textInput: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'black',
        borderRadius: 8,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        width: '100%',
        maxWidth: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
});

export default LoginScreen;
