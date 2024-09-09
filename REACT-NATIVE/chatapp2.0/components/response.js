import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Markdown from "react-native-markdown-display";

const API_KEY = "AIzaSyAPyDffhENILHBKKmG3OclS1MAzAVP1CW0";
const genAI = new GoogleGenerativeAI(API_KEY);

export default function Response({ prompt, timestamp }) {
  const [generatedText, setGeneratedText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();
      setGeneratedText(text);
    };
    fetchData();
  }, [prompt]);

  return (
    <View style={styles.responseWrapper}>
      <View style={styles.response}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image source={require("../assets/icons/robot.png")} style={styles.icon} />
            <Text style={styles.headerText}>Gemini</Text>
          </View>
          <Text style={styles.timestamp}>
            {timestamp}
          </Text>
        </View>
        <View style={styles.content}>
          <Markdown style={styles.markdown}>{generatedText}</Markdown>
        </View>
        <View style={styles.tail} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  responseWrapper: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 8,
  },
  response: {
    flexDirection: "column",
    backgroundColor: "#ffffff", // White background for response
    padding: 16,
    borderRadius: 16,
    borderBottomWidth: 4, // Thicker bottom border
    borderBottomColor: "#007bff", // Blue color for the bottom border
    maxWidth: '80%', // Set a maximum width to avoid stretching too much
    alignSelf: 'flex-start', // Align to the left
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 4 }, // Shadow offset to create shadow below
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 8, // Shadow blur radius
    elevation: 5, // Elevation for Android shadow
    position: 'relative', // Ensure relative positioning for the tail
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  icon: {
    width: 28,
    height: 28,
  },
  headerText: {
    fontWeight: "600",
    fontSize: 16,
    color: "#007bff", // Blue color for header text
  },
  timestamp: {
    fontSize: 10,
    fontWeight: "600",
    color: "#007bff", // Blue color for timestamp
  },
  content: {
    flex: 1,
  },
  markdown: {
    fontSize: 18, // Increased font size for Markdown content
    color: "#333", // Text color
  },
  tail: {
    position: "absolute",
    top: 16, // Adjust this if needed to align with the message box
    left: -12, // Position the tail outside the left edge of the message box
    width: 0,
    height: 0,
    borderStyle: "solid",
    borderWidth: 12,
    borderColor: "transparent",
    borderRightWidth: 12,
    borderRightColor: "#ffffff", // Same as the background color for the response
    borderTopWidth: 12,
    borderTopColor: "transparent",
    borderBottomWidth: 0,
    borderLeftWidth: 0, // No border on the left
  },
});
