import axios from 'axios';
import React, { PropsWithChildren, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { SaveSettings } from '../Functions/storage';

type CustomerLoginProps = PropsWithChildren<{
    onSubmit: Function,
    venueId: String,
    bayId: String,
}>;

const CustomerLogin = ({ onSubmit, venueId, bayId }: CustomerLoginProps ): React.JSX.Element => {

    const [phone, setPhone] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const findBooking = (e) => {
        e.preventDefault();
        setErrorMessage(false);
        if(!phone || !phone.trim().length ){ return; }
        axios.get(`http://127.0.0.1:5001/golf-bay-rental/us-central1/app/kiosk/venue/${venueId}/bay/${bayId}/phone/${phone}`)
            .then( response => {
                if( response.data.isSuccess){
                    setSuccessMessage(`Hello ${response.data.customerName}! We found Your booking!`)
                    SaveSettings('customerName', response.data.customerName);
                    SaveSettings('booking', response.data.booking);
                    setTimeout(() => {
                       onSubmit(true);
                    }, 3000);
                } else {
                    setErrorMessage(response.data.errorMessage);
                }
            })
            .catch( error => console.error(error.message));
    };

    return(
        <View
            style={styles.customerLogin}
        >
            <View>
                <Text style={styles.text}>Have you reserved this bay?</Text>
                <Text style={styles.text}>Enter your phone number to unlock.</Text>
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
                { successMessage.length && <Text style={styles.text}>{successMessage}</Text> }
                { errorMessage.length && <Text style={styles.textError}>{errorMessage}</Text> }
                { !successMessage.length && <View><Text style={styles.text}>No reservation? No problem!</Text>
                <Text style={styles.text}>Scan QR Code to book next available bay</Text></View> }
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
    textError: {
        fontWeight: 500,
        fontSize: 24,
        marginBottom: 30,
        textAlign: 'center',
        color: 'red',
    },
});

export default CustomerLogin;
