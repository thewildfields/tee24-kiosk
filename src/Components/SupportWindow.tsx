import React, { PropsWithChildren } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import KioskOverlay from './KioskOverlay';
import { TouchableHighlight } from 'react-native';

type SupportWindowProps = PropsWithChildren<{
    isVisible: boolean,
    updateVisibility: Function,
    updateSettingsVisibility: Function,
}>

const SupportWindow = ({isVisible, updateVisibility, updateSettingsVisibility}: SupportWindowProps): React.JSX.Element => {

    return(
        <KioskOverlay
            isVisible={isVisible}
            updateVisibility={ value => updateVisibility(value)}
        >
            <Button
                title={'Contact Support'}
            />
            <TouchableHighlight
                style={styles.adminButton}
                onPress={ e => {
                    updateSettingsVisibility(true);
                }}
            >
                <Text>Bay Settings</Text>
            </TouchableHighlight>
        </KioskOverlay>
    );
};

const styles = StyleSheet.create({
    adminButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
    },
});

export default SupportWindow;
