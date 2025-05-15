import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Animated, Dimensions, Pressable, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { Feather, Ionicons, Entypo } from '@expo/vector-icons';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

export default function LinguaLensHomeScreen() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [flagMenuVisible, setFlagMenuVisible] = useState(false);
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const slideInAnim = useState(() => new Animated.Value(300))[0];
  const flagMenuAnim = useState(() => new Animated.Value(0))[0];

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
    setFacing(f => (f === 'back' ? 'front' : 'back'));

  const toggleMenu = () => {
    Animated.timing(slideInAnim, {
      toValue: menuVisible ? 300 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setMenuVisible(!menuVisible);
  };

  const toggleFlagMenu = () => {
    Animated.timing(flagMenuAnim, {
      toValue: flagMenuVisible ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    setFlagMenuVisible(!flagMenuVisible);
  };

  return (
    <View style={styles.container}>
      {/* Top Menu */}
      <View style={styles.topMenu}>
        <Link href="/settings" asChild>
          <TouchableOpacity>
            <Feather name="settings" size={24} color="black" />
          </TouchableOpacity>
        </Link>
        <TouchableOpacity style={styles.flagButton} onPress={toggleFlagMenu}>
          <Feather name="flag" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Flag Dropdown Menu */}
      {flagMenuVisible && <Pressable style={styles.overlay}  onPress={toggleFlagMenu} />}
      <Animated.View
        style={[
          styles.flagMenuContainer,
          {
            opacity: flagMenuAnim,
            transform: [
              {
                scale: flagMenuAnim.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1] }),
              },
            ],
            left: 55 + screenWidth / 2,
          },
        ]}
      >
        {/* Scrollable items */}
        <ScrollView style={{ maxHeight: 200 }}>
          {[...Array(20)].map((_, i) => (
            <TouchableOpacity key={i} style={styles.flagMenuItem} onPress={() => {}}>
              <Text>Option {i + 1}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>

      {/* Camera Preview */}
      <View
        style={[
          styles.cameraContainer,
          { width: squareSize, height: squareSize },
        ]}
      >
        <CameraView style={{ width: '100%', height: '100%' }} facing={facing}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.flipButton}
              onPress={toggleCameraFacing}
            >
              <Entypo name="cycle" size={32} color="#fff" />
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>

      {/* Instructions */}
      <Text style={styles.instruction}>Point your camera at an object</Text>
      <Text style={styles.words}>
        Translation{"\n"}SDDS{"\n"}SDS{"\n"}SDSD
      </Text>

      {/* Overlay to close menu when tapping outside */}
      {menuVisible && <Pressable style={styles.overlay} onPress={toggleMenu} />}

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
    position: 'relative',
    zIndex: 300,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: 50,
  },
  flagButton: {
    top: 5,
    right: 20,  // <<< SAĞDAN 20 birim mesafede olacak
    padding: 4,
    borderRadius: 4,
    // margin eksik yazılmıştı, onu da siliyorum şimdilik
  },
  btnText: {
    fontWeight: 'bold',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
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
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 150,
  },
  flagMenuContainer: {
    position: 'absolute',
    top: 100,       // FLAG butonundan biraz aşağıda (örneğin 55px aşağıda)
    right: 20,     // sağdan 20 birim (button ile aynı)
    width: 120,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingVertical: 4,
    zIndex: 200,
    maxHeight: 200,
  },
  flagMenuItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  profileMenu: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: 250,
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