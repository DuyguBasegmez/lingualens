import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

export default function LinguaLensHomeScreen() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [facing, setFacing] = useState<CameraType>('front');
  const [permission, requestPermission] = useCameraPermissions();
  const slideInAnim = useState(() => new Animated.Value(300))[0];

  // Dinamik kare boyutu
  const screenWidth = Dimensions.get('window').width;
  const squareSize = screenWidth * 0.9;

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const toggleCameraFacing = () =>
    setFacing((f) => (f === 'back' ? 'front' : 'back'));

  const toggleMenu = () => {
    Animated.timing(slideInAnim, {
      toValue: menuVisible ? 300 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setMenuVisible(!menuVisible);
  };

  return (
    <View style={styles.container}>
      {/* Top Menu */}
      <View style={styles.topMenu}>
        <TouchableOpacity>
          <Feather name="settings" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.flagButton}>
          <Text style={styles.btnText}>FLAG</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleMenu}>
          <Ionicons name="person-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Camera Preview */}
      <View
        style={[
          styles.cameraContainer,
          { width: squareSize, height: squareSize },
        ]}
      >
        <CameraView
          style={{ width: '100%', height: '100%' }}
          facing={facing}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.flipButton}
              onPress={toggleCameraFacing}
            >
              <Text style={styles.flipText}>Flip</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>

      {/* Instructions */}
      <Text style={styles.instruction}>Point your camera at an object</Text>
      <Text style={styles.words}>
        Translation{"\n"}SDDS{"\n"}SDS{"\n"}SDSD
      </Text>

      {/* Profile Menu */}
      <Animated.View
        style={[
          styles.profileMenu,
          { transform: [{ translateX: slideInAnim }] },
        ]}
      >
        <Text style={styles.menuText}>Profile Menu</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
  },
  topMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  flagButton: {
    top: 5,
    left: 80,
  },
  btnText: {
    fontWeight: 'bold',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },

  // <<< Burayı güncelledik >>>
  cameraContainer: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 20,
  },

  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
  },
  flipButton: {
    backgroundColor: '#00000080',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  flipText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  instruction: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 30,
  },
  words: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 14,
  },

  profileMenu: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 250,
    height: '100%',
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    padding: 20,
  },
  menuText: {
    color: 'black',
    fontSize: 18,
  },
});
