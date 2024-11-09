import axios from 'axios';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { GetSettings, SaveSettings } from '../Functions/storage';
import CustomerLogin from './CustomerLogin';
import StartGame from './StartGame';


const GameSelection = (): React.JSX.Element => {

    const [venueId, setVenueId] = useState(false);
    const [bayId, setBayId] = useState(false);
    const [venue, setVenue] = useState(false);
    const [bay, setBay] = useState(false);
    const [kioskOpen, setKioskOpen] = useState(false);

    useEffect(() => {
        GetSettings('venue')
            .then(venueId => { setVenueId(JSON.parse(venueId))})
            .catch(error => console.error(error));
        GetSettings('bay')
            .then(bayId => { setBayId(JSON.parse(bayId))})
            .catch(error => console.error(error));
    },[]);

    useEffect(() => {
        if( !venueId || !bayId ){ return; }
        axios.get(`http://127.0.0.1:5001/golf-bay-rental/us-central1/app/venue/id/${venueId}`)
            .then( response => setVenue(response.data))
            .catch( error => console.error(error));
        axios.get(`http://127.0.0.1:5001/golf-bay-rental/us-central1/app/bay/${bayId}`)
            .then( response => setBay(response.data))
            .catch( error => console.error(error));
    }, [venueId, bayId]);

    return(
        <View>
            {
                venue && bay &&
                <>
                    <View
                        style={styles.kioskTitle}
                    >
                        <Text style={styles.h1}>{ `Welcome to ${venue.title}`}</Text>
                        <Text style={styles.h2}>{ `You are on ${bay.title}`}</Text>
                    </View>
                    { 
                        kioskOpen
                            ? <StartGame />
                            : <CustomerLogin
                                onSubmit={ value => setKioskOpen(value) }
                            />
                    }
                </>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    kioskTitle: {
        backgroundColor: 'white',
        borderRadius: 32,
        width: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: 50,
        paddingRight: 50,
        paddingTop: 30,
        paddingBottom: 30,
        marginBottom: 100,
    },
    h1: {
        fontSize: 40,
        textAlign: 'center',
        fontWeight: 500,
        marginBottom: 20,
    },
    h2: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 500,
    },
});

export default GameSelection;
