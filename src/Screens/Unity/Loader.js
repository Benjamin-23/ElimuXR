import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';

const Loader = () => {
    return (
        <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={styles.indicator.color} />
        </View>
    );
};

const styles = StyleSheet.create({
    loaderContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 1)',
    },
    indicator:
    {
        color: '#3D90D7',
    }
});


export default Loader;