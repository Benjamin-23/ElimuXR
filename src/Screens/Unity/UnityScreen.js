import React, { useRef, useCallback, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import UnityView from '@azesmway/react-native-unity';
import NotImplementedScreen from './NotImplementedScreen';
import Loader from './Loader';

const UnityScreen = ({ selectedModel }) => {
    const unityRef = useRef(null);
    const [isUnityReady, setIsUnityReady] = useState(false);
    const [errorState, setErrorState] = useState({ hasError: false, message: '' });

    const sessionData = selectedModel
        ? {
            Id: selectedModel.modelId,
            ArView: selectedModel.arView,
        }
        : null;

    const postData = useCallback(() => {
        if (unityRef.current && sessionData) {
            const jsonData = JSON.stringify(sessionData);
            unityRef.current.postMessage('ReactNativeBridge', 'SendData', jsonData);
        }
    }, [sessionData]);

    const handleMessages = (message) => {
        if (message === 'unity-started') {
            postData();
        }

        if (message === 'model-placed') {
            setTimeout(() => {
                setIsUnityReady(true);
            }, 1000);
        }

        if (message.includes('error')) {
            handleErrors(message);
        }
    };

    const handleErrors = (message) => {
        console.error('Unity Error:', message);
        setErrorState({ hasError: true, message });
    };

    if (!selectedModel) {
        return <NotImplementedScreen reason="Feature will be available soon!" />;
    }

    if (errorState.hasError) {
        return <NotImplementedScreen reason={errorState.message || "An error occurred in Unity."} />;
    }

    return (
        <View style={styles.container}>
            <UnityView
                ref={unityRef}
                style={styles.unity}
                onUnityMessage={result => {
                    const message = result?.nativeEvent?.message;
                    handleMessages(message);
                }}
            />
            {!isUnityReady && <Loader />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    unity: {
        flex: 1,
    },
});

export default UnityScreen;
