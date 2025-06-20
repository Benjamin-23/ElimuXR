import React, { useRef, useCallback, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import UnityView from '@azesmway/react-native-unity';
import NotImplementedScreen from './NotImplementedScreen';
import Loader from './Loader';

const UnityScreen = ({ selectedModel }) => {
    const unityRef = useRef(null);
    const [isUnityReady, setIsUnityReady] = useState(false);
    const [errorState, setErrorState] = useState({ hasError: false, message: '' });
    const [message, setMessage] = useState(null);

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
            setMessage("Please Wait");
            postData();
        }

        if (message === 'model-placed') {
            setMessage("Preparing Assets");
            setTimeout(() => {
                setIsUnityReady(true);
            }, 1000);
        }

        if (message.includes('downloading')) {
            const parts = message.split(':');
            if (parts.length > 1) {
                const progressValue = parseFloat(parts[1]);
                if (!isNaN(progressValue)) {
                    const formattedProgress = `Downloading Assets ${Math.round(progressValue * 100)}%`;
                    setMessage(formattedProgress);
                }
            }
        }

        if (message.includes('error')) {
            handleErrors(message);
        }
    };

    const handleErrors = (message) => {
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
            {!isUnityReady && <Loader message={message} />}
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