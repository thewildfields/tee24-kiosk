import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import SupportButton from './SupportButton';

const KioskScreen = () => {
    return(
        <View
            style={styles.kioskScreen}
        >
            <ImageBackground
                style={styles.kioskScreenBg}
                resizeMode="cover"
                source={require('../assets/kiosk-bg.jpg')}
            >
                <SupportButton/>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    kioskScreen: {
    },
    kioskScreenBg: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
    },
})

export default KioskScreen;
