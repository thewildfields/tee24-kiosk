import React, { PropsWithChildren, useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import KioskOverlay from './KioskOverlay';
import { TouchableHighlight } from 'react-native';
import { GetSettings, RemoveSettings, SaveSettings } from '../Functions/storage';
import axios from 'axios';

type SupportWindowProps = PropsWithChildren<{
    isVisible: boolean,
    updateVisibility: Function,
}>

const SettingsWindow = ({isVisible, updateVisibility }: SupportWindowProps): React.JSX.Element => {

    const [userId, setUserId] = useState('');
    const [venues, setVenues] = useState([]);
    const [venue, setVenue] = useState('');
    const [venueId, setVenueId] = useState('');
    const [bays, setBays] = useState([]);
    const [bay, setBay] = useState('');
    const [bayId, setBayId] = useState('');
    const [switchVenue, setSwitchVenue] = useState(false);
    const [switchBay, setSwitchBay] = useState(false);

    useEffect(() => {
        GetSettings('venue')
            .then( venueId => {
                setVenueId(JSON.parse(venueId));
            })
            .catch( error => console.error(error));
        GetSettings('bay')
            .then( bayId => {
                setBayId(JSON.parse(bayId));
            })
            .catch( error => console.error(error));
        GetSettings('userId')
            .then( id => {
                setUserId(JSON.parse(id));
            })
            .catch( error => console.error(error));
    },[]);

    useEffect(() => {
        axios.get(`https://us-central1-golf-bay-rental.cloudfunctions.net/app/venues/${userId}`)
            .then( response => setVenues(response.data))
            .catch( error => console.error(error));
    },[userId]);

    useEffect(() => {
        if( !venueId || !venueId.length ){ return; }
        axios.get(`https://us-central1-golf-bay-rental.cloudfunctions.net/app/venue/id/${venueId}`)
            .then( response => setVenue(response.data))
            .catch( error => console.error(error));
        axios.get(`https://us-central1-golf-bay-rental.cloudfunctions.net/app/bays/venue/${venueId}`)
            .then( response => setBays(response.data))
            .catch( error => console.error(error));
    },[venueId]);

    useEffect(() => {
        if( !bayId || !bayId.length ){ return; }
        axios.get(`https://us-central1-golf-bay-rental.cloudfunctions.net/app/bay/${bayId}`)
            .then( response => setBay(response.data))
            .catch( error => console.error(error));
    },[bayId]);

    return(
        <KioskOverlay
            isVisible={isVisible}
            updateVisibility={ value => updateVisibility(value)}
        >
            <View
                style={styles.adminSettings}
            >
                <View>
                    <Text>Venue</Text>
                    <Text>{venue.title}</Text>
                    <Button
                        title="Switch Venue"
                        onPress={e => setSwitchVenue(true)}
                    />
                    {
                        switchVenue &&
                        <View>
                            <FlatList
                                data={venues}
                                renderItem={
                                    ({item}) => <Button
                                        title={item.title}
                                        onPress={ async e => {
                                            if( item._id !== venueId){
                                                setVenue(item);
                                                setVenueId(item.id);
                                                setBay(false);
                                                await SaveSettings('venue', item._id);
                                                await RemoveSettings('bay');
                                            }
                                            setSwitchVenue(false);
                                        }}
                                    />}
                            />
                        </View>
                    }
                </View>
                <View>
                    <Text>Bay</Text>
                    <Text>{ bay ? bay.title : 'Select Bay'}</Text>
                    <Button
                        title="Switch Bay"
                        onPress={e => setSwitchBay(true)}
                    />
                    {
                        switchBay &&
                        <View>
                            <FlatList
                                data={bays}
                                renderItem={
                                    ({item}) => <Button
                                        title={item.title}
                                        onPress={ async e => {
                                            if( item._id !== bayId){
                                                setBay(item);
                                                setBayId(item._id);
                                                await SaveSettings('bay', item._id);
                                            }
                                            setSwitchBay(false);
                                        }}
                                    />}
                            />
                        </View>
                    }
                </View>
            </View>
        </KioskOverlay>
    );
};

const styles = StyleSheet.create({
    adminSettings: {
        width: '100%',
        paddingLeft: 20,
        paddingRight: 20,
    },
    adminButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
    },
});

export default SettingsWindow;
