import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { Ionicons } from '@expo/vector-icons';

export default function VideoScreen({ route, navigation }) {
  const { uri } = route.params; // Get YouTube URL from route.params
  const { height, width } = Dimensions.get('window');
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [isPlaying, setIsPlaying] = useState(false);

  const videoId = uri.split('v=')[1]?.split('&')[0]; // Extract YouTube video ID

  const videoRef = useRef(); // Create a ref to the YouTube player

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleExit = () => {
    navigation.goBack();
  };

  const handleShare = () => {
    alert('Chức năng chia sẻ chưa được thêm vào!');
  };

  const rewindAudio = () => {
    if (videoRef.current) {
      // Get the current time and rewind by 10 seconds
      videoRef.current.getCurrentTime().then((currentTime) => {
        const newTime = Math.max(currentTime - 10, 0); // Prevent seeking before the start of the video
        videoRef.current.seekTo(newTime);
      });
    }
  };
  
  const forwardAudio = () => {
    if (videoRef.current) {
      // Get the current time and forward by 10 seconds
      videoRef.current.getCurrentTime().then((currentTime) => {
        const newTime = currentTime + 10; // No need to cap here, as it's ok to seek beyond the video duration
        videoRef.current.seekTo(newTime);
      });
    }
  };
  

  // Show controls on tap and start fade-out timer
  const handleTap = () => {
    // Reset the fade animation to show controls immediately
    fadeAnim.setValue(1);

    // Start fading out controls after 3 seconds
    setTimeout(() => {
      fadeOutControls();
    }, 3000);
  };

  // Fade out controls
  const fadeOutControls = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  // Trigger fade-out after 3 seconds of playing
  useEffect(() => {
    if (isPlaying) {
      setTimeout(() => {
        fadeOutControls();
      }, 3000);
    }
  }, [isPlaying]);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handleTap}>
        <View style={styles.videoWrapper}>
          <YoutubePlayer
            ref={videoRef} // Attach ref to YouTube player
            height={600}
            width={1200}
            play={isPlaying}
            videoId={videoId}
          />
        </View>
      </TouchableWithoutFeedback>

      {/* Header */}
      <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
        <TouchableOpacity onPress={handleExit} style={styles.headerButton}>
          <Ionicons name="chevron-back-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShare} style={styles.headerButton}>
          <Ionicons name="share-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </Animated.View>

      {/* Controls */}
      <Animated.View style={[styles.controlsContainer, { opacity: fadeAnim }]}>
        <TouchableOpacity onPress={rewindAudio} style={styles.iconButton}>
          <Ionicons name="play-back-sharp" size={32} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handlePlayPause}
          style={[styles.iconButton, styles.playButton]}
        >
          <Ionicons
            name={isPlaying ? 'pause-circle-outline' : 'play-circle-outline'}
            size={50}
            color="#fff"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={forwardAudio} style={styles.iconButton}>
          <Ionicons name="play-forward" size={32} color="#fff" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  videoWrapper: {
    flex: 1,
    marginLeft: -400,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    height: 80,
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  headerButton: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    marginBottom: 20,
  },
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});
