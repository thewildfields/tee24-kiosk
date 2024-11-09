import React, { PropsWithChildren, ReactNode } from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import { Overlay } from 'react-native-elements';

type SupportWindowProps = PropsWithChildren<{
    isVisible: boolean,
    updateVisibility: Function,
    children: ReactNode
}>

const KioskOverlay = ({isVisible, updateVisibility, children}: SupportWindowProps): React.JSX.Element => {

    return(
        <>
        {
            isVisible &&
            <Overlay
                isVisible={isVisible}
                ModalComponent={Modal}
                supportedOrientations={['portrait', 'landscape']}
                onBackdropPress={e => updateVisibility(false)}
                style={[styles.modal]}
            >
                <View
                    style={styles.modalContent}
                >
                    {children}
                </View>
            </Overlay> }
        </>
    );
};

const styles = StyleSheet.create({
    modal: {
        padding: 0,
        position: 'relative',
    },
    modalContent: {
        width: 1024,
        maxWidth: '90%',
        padding: 0,
        margin: 0,
        borderRadius: 16,
        overflow: 'hidden',
        minHeight: 700,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default KioskOverlay;
