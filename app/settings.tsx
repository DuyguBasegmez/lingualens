import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Settings() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons
          name="chevron-back"
          size={24}
          color="black"
          onPress={() => router.back()}
        />
        <Text style={styles.title}>Settings</Text>
      </View>

      {/* Options */}
      <View style={styles.optionRow}>
        <Text style={styles.optionText}>Dark Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={setIsDarkMode}
        />
      </View>

      <View style={styles.optionRow}>
        <Text style={styles.optionText}>Notifications</Text>
        <Switch
          value={true}
          onValueChange={() => { /* handle toggle */ }}
        />
      </View>

      {/* Link back to home */}
      <Link href="/" style={styles.link}>
        <Text style={styles.linkText}>Go Home</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  optionText: {
    fontSize: 18,
  },
  link: {
    marginTop: 40,
    alignSelf: 'center',
  },
  linkText: {
    fontSize: 16,
    color: '#0066CC',
  },
});
