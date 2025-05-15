import { Stack, Slot, Link, usePathname } from 'expo-router';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons,MaterialCommunityIcons, Entypo, Ionicons } from '@expo/vector-icons';

export default function RootLayout() {
  const pathname = usePathname();

  // hangi route’larda gizleyeceğiz
  const hideOn = ['/settings', '/profile'];

  return (
    <View style={{ flex: 1 }}>
      {/* Main content */}
      <Slot />

      {/* Global Bottom Navigation */}
      { !hideOn.includes(pathname) && (
        <View style={styles.bottomBar}>
          <Link href="/flashcards" asChild>
            <TouchableOpacity>
             <MaterialCommunityIcons name="cards" size={32} color="black" />
            </TouchableOpacity>
          </Link>

          <TouchableOpacity style={styles.captureButton} />
          <Link href="/profile" asChild>
          <TouchableOpacity>
          <Ionicons name="person-outline" size={24} color="black" />
          </TouchableOpacity>
          </Link>
        </View>
      )}
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
