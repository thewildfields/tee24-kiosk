import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const SupportButton = () => {
    return(
        <View
            style={styles.supportButton}
        >
            <Text
                style={styles.supportButtonText}
            >Support</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    supportButton: {
        position: 'absolute',
        zIndex: 10,
        backgroundColor: 'green',
        bottom: 50,
        right: 50,
        width: 150,
        height: 150,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: '50%',
        borderTopRightRadius: '50%',
        borderBottomLeftRadius: '50%',
    },
    supportButtonText: {
        color: 'white',
        fontSize: 20,
        textTransform: 'uppercase',
        letterSpacing: 1,
        fontWeight: 500,
    },
});

export default SupportButton;
