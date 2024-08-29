import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import RNBluetoothClassic, {
  BluetoothDevice,
} from "react-native-bluetooth-classic";
import Toast from "react-native-toast-message";
import Modal from "react-native-modal";

export default function Home() {
  const [devices, setDevices] = useState([]);
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchPairedDevices = async () => {
      try {
        const pairedDevices = await RNBluetoothClassic.getBondedDevices();
        setDevices(pairedDevices);
        setFilteredDevices(pairedDevices);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPairedDevices();
  }, []);

  useEffect(() => {
    filterDevices(searchQuery);
  }, [searchQuery]);

  const filterDevices = (query) => {
    if (!query) {
      setFilteredDevices(devices);
    } else {
      const filtered = devices.filter((device) =>
        device.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredDevices(filtered);
    }
  };

  const connectToDevice = async (device) => {
    setIsConnecting(true);
    try {
      const connected = await device.connect();
      if (connected) {
        setConnectedDevice(device);
        setIsModalVisible(false); // Close modal upon successful connection
        Toast.show({
          type: "success",
          text1: "Connected",
          text2: `Connected to ${device.name}`,
        });
        device.onDataReceived((data) => {
          // Handle data received if necessary
        });
      }
    } catch (error) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: "Connection error",
        text2: error.message,
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const sendCommand = async (command) => {
    if (connectedDevice) {
      try {
        await connectedDevice.write(command);
        Toast.show({
          type: "success",
          text1: "Command Sent",
          text2: `Sent: ${command}`,
        });
      } catch (error) {
        console.error(error);
        Toast.show({
          type: "error",
          text1: "Send error",
          text2: error.message,
        });
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Not connected",
        text2: "Please connect to a device first",
      });
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.deviceItem}>
      <Text>{item.name}</Text>
      <TouchableOpacity
        style={styles.modalButton}
        onPress={() => connectToDevice(item)}
        disabled={isConnecting}
      >
        <Text style={styles.modalButtonText}>Connect</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Bluetooth Control App</Text>
      </View>
      <View style={styles.container}>
        <Modal isVisible={isModalVisible}>
          <View style={styles.modalContent}>
            <View style={styles.pairedDevicesHeader}>
              <Text style={styles.title2}>Paired Devices</Text>
            </View>
            <TextInput
              style={styles.searchInput}
              placeholder="Search devices"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {isConnecting ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <FlatList
                data={filteredDevices}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
              />
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        {connectedDevice && (
          <ScrollView>
            <Text style={styles.connectedDeviceText}>
              Connected to {connectedDevice.name}
            </Text>
            <View style={styles.controlContainer}>
              <View style={styles.lightTextGroup}>
                <Text style={styles.lightText}>Light 1</Text>
              </View>
              <View style={styles.buttonGroup}>
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={() => sendCommand("A")}
                >
                  <Text style={styles.controlButtonText}>ON</Text>
                </TouchableOpacity>
                <View style={styles.buttonGap} />
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={() => sendCommand("a")}
                >
                  <Text style={styles.controlButtonText}>OFF</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.controlContainer}>
              <View style={styles.lightTextGroup}>
                <Text style={styles.lightText}>Light 2</Text>
              </View>
              <View style={styles.buttonGroup}>
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={() => sendCommand("B")}
                >
                  <Text style={styles.controlButtonText}>ON</Text>
                </TouchableOpacity>
                <View style={styles.buttonGap} />
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={() => sendCommand("b")}
                >
                  <Text style={styles.controlButtonText}>OFF</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.controlContainer}>
              <View style={styles.lightTextGroup}>
                <Text style={styles.lightText}>Light 3</Text>
              </View>
              <View style={styles.buttonGroup}>
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={() => sendCommand("C")}
                >
                  <Text style={styles.controlButtonText}>ON</Text>
                </TouchableOpacity>
                <View style={styles.buttonGap} />
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={() => sendCommand("c")}
                >
                  <Text style={styles.controlButtonText}>OFF</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        )}
        <TouchableOpacity
          style={styles.connectButton}
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={styles.connectButtonText}>
            Connect with Bluetooth Device
          </Text>
        </TouchableOpacity>
        <Toast />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  headerContainer: {
    padding: 20,
    backgroundColor: "#6200ee",
    alignItems: "center",
  },
  title: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  pairedDevicesHeader: {
    marginBottom: 10,
  },
  title2: {
    fontSize: 18,
    fontWeight: "bold",
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 20,
  },
  deviceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  connectedDeviceText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  controlContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  lightTextGroup: {
    flex: 1,
    alignItems: "center",
  },
  lightText: {
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "#FFA500",
    color: "#FFFFFF",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonGroup: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  controlButton: {
    backgroundColor: "#6200ee",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  controlButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonGap: {
    width: 10,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  closeButton: {
    backgroundColor: "#6200ee",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#ffffff",
    fontSize: 16,
  },
  connectButton: {
    backgroundColor: "#FFA500",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
  },
  connectButtonText: {
    color: "#ffffff",
    fontSize: 16,
  },
  modalButton: {
    backgroundColor: "#FFA500",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "#ffffff",
    fontSize: 16,
  },
});
