import React, { useState } from 'react';
import { View, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

export default function App() {
  const [pcMacAddress] = useState("YOUR_PC_MAC_ADDRESS");
  const [macMacAddress] = useState("YOUR_MAC_MAC_ADDRESS");

  const [pcApiUrl] = useState("http://YOUR_SERVER_IP:5000/wake");
  const [macApiUrl] = useState("http://YOUR_SERVER_IP:5000/wake");

  const [macLaunchUrl] = useState("http://YOUR_MAC_IP:5001/launch");
  const [pcLaunchUrl] = useState("http://YOUR_PC_IP:5002/launch");

  const wakePC = async () => {
    try {
      const response = await axios.post(pcApiUrl, {
        mac_address: pcMacAddress
      });

      Alert.alert("Success", response.data.status);
    } catch (error) {
      console.error("Wake-on-LAN failed:", error);
      Alert.alert("Error", "Could not send wake signal to PC.");
    }
  };

  const wakeMac = async () => {
    try {
      const response = await axios.post(macApiUrl, {
        mac_address: macMacAddress
      });

      Alert.alert("Success", response.data.status);
    } catch (error) {
      console.error("Wake-on-LAN failed:", error);
      Alert.alert("Error", "Could not send wake signal to Mac.");
    }
  };

  const launchApp = async (url, appName) => {
    try {
      const response = await axios.post(url, {
        app: appName
      });

      Alert.alert("Success", response.data.status);
    } catch (error) {
      console.error(`Launch ${appName} failed:`, error);
      Alert.alert("Error", `Could not launch ${appName}.`);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button
        title="Wake PC"
        onPress={wakePC}
        color="#2196F3"
      />

      <View style={styles.spacer} />

      <Button
        title="Wake Mac"
        onPress={wakeMac}
        color="#4CAF50"
      />

      <View style={styles.spacer} />

      <Button
        title="Open Discord on PC"
        onPress={() => launchApp(pcLaunchUrl, "Discord")}
        color="#9C27B0"
      />

      <View style={styles.spacer} />

      <Button
        title="Open VSCode on PC"
        onPress={() => launchApp(pcLaunchUrl, "VSCode")}
        color="#9C27B0"
      />

      <View style={styles.spacer} />

      <Button
        title="Open Discord on Mac"
        onPress={() => launchApp(macLaunchUrl, "Discord")}
        color="#FF5722"
      />

      <View style={styles.spacer} />

      <Button
        title="Open VSCode on Mac"
        onPress={() =>
          launchApp(macLaunchUrl, "Visual Studio Code")
        }
        color="#FF5722"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },

  spacer: {
    height: 20,
  },
});