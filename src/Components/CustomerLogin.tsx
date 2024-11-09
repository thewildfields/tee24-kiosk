import axios from 'axios';
import React, { PropsWithChildren, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Button, Text } from 'react-native-elements';

type CustomerLoginProps = PropsWithChildren<{
    onSubmit: Function,
}>;

const CustomerLogin = ({ onSubmit }: CustomerLoginProps ): React.JSX.Element => {

    const [phone, setPhone] = useState('');

    const findBooking = (e) => {
        e.preventDefault();
        onSubmit(true);
    };

    return(
        <View
            style={styles.customerLogin}
        >
            <View>
                <Text style={styles.text}>Have you reserved this bay</Text>
                <Text style={styles.text}>Enter your phone number to unlock</Text>
            </View>
            <View>
                <TextInput
                    style={styles.phoneInput}
                    value={phone}
                    placeholder='(123) 456-7890'
                    onChangeText={ value => setPhone(value)}
                />
                <Button
                    title="Find Booking"
                    onPress={ e => findBooking(e)}
                />
            </View>
            <View>
                <Text style={styles.text}>No reservation? No problem!</Text>
                <Text style={styles.text}>Scan QR Code to book next available bay</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    customerLogin: {
        width: 800,
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: 'lightgrey',
        borderRadius: 32,
        paddingLeft: 50,
        paddingRight: 50,
        paddingTop: 30,
        paddingBottom: 30,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30,
    },
    phoneInput: {
        backgroundColor: 'white',
        height: 60,
        paddingLeft: 30,
        paddingRight: 30,
        textAlign: 'center',
        marginBottom: 30,
        width: '100%',
        minWidth: 400,
        borderRadius: 30,
        fontSize: 32,
    },
    text: {
        fontWeight: 500,
        fontSize: 24,
        marginBottom: 10,
        textAlign: 'center',
    },
});

export default CustomerLogin;
