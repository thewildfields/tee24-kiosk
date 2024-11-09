import React, { useState } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import SupportButton from './SupportButton';
import SupportWindow from './SupportWindow';
import GameSelection from './GameSelection';
import SettingsWindow from './SettingsWindow';

const KioskScreen = (): React.JSX.Element => {

    const [displaySupportWindow, setDisplaySupportWindow] = useState(false);
    const [displaySettingsWindow, setDisplaySettingsWindow] = useState(false);

    return(
        <View
            style={styles.kioskScreen}
        >
            <ImageBackground
                style={styles.kioskScreenBg}
                resizeMode="cover"
                source={require('../assets/kiosk-bg.jpg')}
            >
                <View
                    style={styles.kioskScreenContainer}
                >
                    <GameSelection/>
                    <SupportWindow
                        isVisible={displaySupportWindow}
                        updateVisibility={ value => setDisplaySupportWindow(value)}
                        updateSettingsVisibility={ value => setDisplaySettingsWindow(value)}
                    />
                    <SettingsWindow
                        isVisible={displaySettingsWindow}
                        updateVisibility={ value => setDisplaySettingsWindow(value)}
                    />
                    <SupportButton
                        onTouch={ value => setDisplaySupportWindow(value)}
                    />
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    kioskScreen: {
        position: 'relative',
    },
    kioskScreenBg: {
        width: '100%',
        height: '100%',
        position: 'relative',
    },
    kioskScreenContainer: {
        position: 'relative',
        width: '100%',
        maxWidth: 1500,
        padding: 50,
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
});

export default KioskScreen;
