import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';

const Loader = ({ message }) => {
    return (
        <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={styles.indicator.color} />
            {message && <Text style={styles.progressText}>{message}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    loaderContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        paddingHorizontal: 20,
    },
    indicator: {
        color: '#3D90D7',
    },
    progressText: {
        marginTop: 16,
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
    },
});

export default Loader;
