import axios from 'axios';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import { GetSettings, SaveSettings } from '../Functions/storage';

type LoginScreenProps = PropsWithChildren<{
    updateData: Function
}>

const SettingsScreen = ({updateData}: LoginScreenProps): React.JSX.Element => {

    const [userId, setUserId] = useState(false);
    const [venues, setVenues] = useState([]);
    const [venue, setVenue] = useState(false);

    useEffect(() => {
        GetSettings('userId')
        .then(response => setUserId(JSON.parse(response)))
        .catch(error => console.error(error));
    },[]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:5001/golf-bay-rental/us-central1/app/venues/${userId}`)
            .then(response => setVenues(response.data))
            .catch(error => console.error(error));
    },[userId]);

    // useEffect(() => {
    //     axios.get(`http://127.0.0.1:5001/golf-bay-rental/us-central1/app/venues/${userId}`)
    //         .then(response => setVenues(response.data))
    //         .catch(error => console.error(error));
    // },[venue]);

    const selectVenue = async (id) => {
        await SaveSettings('venue', id);
    };

    return(
        <View>
            <Text>1. Select Venue</Text>
            <FlatList
                data={venues}
                renderItem={
                    ({item}) => (
                    <Button
                        title={item.title}
                        onPress={ e => selectVenue(item._id)}
                    />)
                }
            />
        </View>
    );
};

export default SettingsScreen;
