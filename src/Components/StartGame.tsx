import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

const StartGame = (): React.JSX.Element => {
    return(
        <TouchableHighlight
            style={styles.gameButton}
        >
            <View>
                <Text
                    style={styles.gameButtonText}
                >
                    Hit On
                </Text>
                <Text
                    style={styles.gameButtonTextBig}
                >
                    Driving Range
                </Text>
                <Text
                    style={styles.gameButtonText}
                >
                    Tap Here
                </Text>
            </View>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    gameButton: {
        width: 400,
        minHeight: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        borderRadius: 16,
        backgroundColor: 'green',
    },
    gameButtonText: {
        fontSize: 32,
        fontWeight: 500,
        color: 'white',
        textAlign: 'center',
        marginBottom: 20,
    },
    gameButtonTextBig: {
        fontSize: 60,
        fontWeight: 700,
        color: 'white',
        textAlign: 'center',
        marginBottom: 20,
    },
});

export default StartGame;
