import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Platform, Dimensions } from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import images from '../../index';

const VideoPlayers = () => {
  
    return (
        <View style={styles.backgroundVideo}>
            <VideoPlayer
                source={{ uri: images.Video_Valux }}
                onBack={() => null} // Optionally handle the back button
                // onEnd={() => alert('Video has finished playing!')}
                style={styles.videoPlayer}
                tapAnywhereToPause={true}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    backgroundVideo: {
        height: 370,
        width: '100%',
        backgroundColor: 'rgba(223,238,255,1)'
    },
});

export default VideoPlayers;