import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Response from "./components/response";
import Message from "./components/message";
import ImagePicker from 'react-native-image-picker'; // Ensure you have this installed
import EmojiSelector from 'react-native-emoji-selector'; // Ensure you import the emoji picker library
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import Signup from './screens/Signup';

const Stack = createStackNavigator();

const App = () => {
  const [inputText, setInputText] = useState("");
  const [listData, setListData] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication state

  useEffect(() => {
    // Load messages from AsyncStorage when the component mounts
    const loadMessages = async () => {
      try {
        const storedMessages = await AsyncStorage.getItem('messages');
        if (storedMessages) {
          setListData(JSON.parse(storedMessages));
        }
      } catch (error) {
        console.error("Failed to load messages from AsyncStorage:", error);
      }
    };
    loadMessages();
  }, []);

  useEffect(() => {
    // Save messages to AsyncStorage whenever listData changes
    const saveMessages = async () => {
      try {
        await AsyncStorage.setItem('messages', JSON.stringify(listData));
      } catch (error) {
        console.error("Failed to save messages to AsyncStorage:", error);
      }
    };
    saveMessages();
  }, [listData]);

  const handleSend = () => {
    if (inputText.trim()) {
      const timestamp = new Date().toLocaleString(); // Current date and time
      const newMessage = { sender: 'user', message: inputText, timestamp };
      setListData((prevList) => [...prevList, newMessage]);
      setInputText("");
    }
  };

  const handleImagePick = () => {
    ImagePicker.launchImageLibrary({}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const timestamp = new Date().toLocaleString();
        const newMessage = {
          sender: 'user',
          message: response.uri,
          timestamp,
          type: 'image'
        };
        setListData((prevList) => [...prevList, newMessage]);
      }
    });
  };

  const handleEmojiPick = (emoji) => {
    setInputText((prevText) => prevText + emoji);
    setShowEmojiPicker(false);
  };

  const handleInputSubmit = () => {
    handleSend();
  };

  const handleLogin = (navigation) => {
    // Simulate login
    setIsAuthenticated(true);
    navigation.navigate("Main");
  };

  const handleSignup = (navigation) => {
    // Simulate signup
    setIsAuthenticated(true);
    navigation.navigate("Main");
  };

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator>
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Login">
              {({ navigation }) => <Login navigation={navigation} onLogin={() => handleLogin(navigation)} />}
            </Stack.Screen>
            <Stack.Screen name="Signup">
              {({ navigation }) => <Signup navigation={navigation} onSignup={() => handleSignup(navigation)} />}
            </Stack.Screen>
          </>
        ) : (
          <Stack.Screen name="Main">
            {props => (
              <View style={styles.container}>
                <View style={styles.header}>
                  <Text style={styles.headerText}>Gemini AI</Text>
                </View>
                <FlatList
                  style={styles.list}
                  data={listData}
                  renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                      <Message sender={item.sender} message={item.message} timestamp={item.timestamp} type={item.type} />
                      <Response prompt={item.message} timestamp={item.timestamp} />
                    </View>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
                {showEmojiPicker && (
                  <View style={styles.emojiPicker}>
                    <EmojiSelector onEmojiSelected={handleEmojiPick} />
                  </View>
                )}
                <View style={styles.searchBar}>
                  <TouchableOpacity onPress={handleImagePick}>
                    <Text style={styles.iconText}>📷</Text>
                  </TouchableOpacity>
                  <TextInput
                    placeholder="Ask Gemini AI..."
                    style={styles.input}
                    value={inputText}
                    onChangeText={(text) => setInputText(text)}
                    selectionColor="#0079"
                    onSubmitEditing={handleInputSubmit}
                  />
                  <TouchableOpacity onPress={() => setShowEmojiPicker((prev) => !prev)}>
                    <Text style={styles.iconText}>😊</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleSend}>
                    <Text style={styles.sendText}>Send</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e3f2fd",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#007bff",
    borderBottomWidth: 1,
    borderBottomColor: "#007bff",
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 24,
    fontWeight: "800",
    color: "#ffffff",
  },
  searchBar: {
    backgroundColor: "#ffffff",
    width: "100%",
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#b0bec5",
  },
  input: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 24,
    borderWidth: 0.5,
    borderColor: "#b0bec5",
  },
  sendText: {
    fontSize: 16,
    color: "#007bff",
  },
  iconText: {
    fontSize: 24,
    color: "#007bff",
  },
  list: {
    paddingHorizontal: 16,
    marginBottom: 80,
  },
  itemContainer: {
    marginBottom: 8,
  },
  emojiPicker: {
    position: 'absolute',
    bottom: 80,
    width: '100%',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#b0bec5',
  }
});

export default App;
