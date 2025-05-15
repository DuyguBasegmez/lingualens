import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function Gallery() {
  return (
    <View style={styles.container}>
      {/* Back Button (top-left) */}
      <Link href="/" asChild>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
      </Link>

      {/* Title */}
      <Text style={styles.title}>Gallery</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    padding: 8,
  },
  backButtonText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  title: {
    marginTop: 80,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
