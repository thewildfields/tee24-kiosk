import axios from 'axios';
import React, { PropsWithChildren, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { SaveSettings } from '../Functions/storage';

type LoginScreenProps = PropsWithChildren<{
    onLogIn: Function,
}>

const LoginScreen = ({onLogIn}: LoginScreenProps): React.JSX.Element => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const SignIn = () => {

        const signInData = {
            email: email,
            password: password,
            isKiosk: true,
        };

        axios.post('http://127.0.0.1:5001/golf-bay-rental/us-central1/app/auth/sign-in', signInData)
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
        <View
            style={styles.loginScreen}
        >
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
            <Text>{errorMessage}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    loginScreen: {
        display: 'flex',
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
