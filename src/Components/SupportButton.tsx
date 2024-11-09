import React, { PropsWithChildren } from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';

type SupportButtonProps = PropsWithChildren<{
    onTouch: Function;
}>;

const SupportButton = ({onTouch}: SupportButtonProps) => {
    return(
        <TouchableHighlight
            style={styles.supportButton}
            onPress={ e => onTouch(true)}
        >
            <Text
                style={styles.supportButtonText}
            >Support</Text>
        </TouchableHighlight>
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
