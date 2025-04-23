import { Stack, Slot, Link, usePathname } from 'expo-router';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons, Entypo } from '@expo/vector-icons';

export default function RootLayout() {
  const pathname = usePathname();

  return (
    <View style={{ flex: 1 }}>
      {/* Main content of each screen */}
      <Slot />

      {/* Global Bottom Navigation */}
      { // optional: hide on specific routes
        <View style={styles.bottomBar}>
          <Link href="/flashcards" asChild>
            <TouchableOpacity>
              <MaterialIcons name="photo-camera" size={32} />
            </TouchableOpacity>
          </Link>

          <TouchableOpacity style={styles.captureButton} />

          <TouchableOpacity>
            <Entypo name="cycle" size={32} />
          </TouchableOpacity>
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: '#abc',
    width: '100%',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  captureButton: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#000',
  },
});
