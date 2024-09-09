import React from "react";
import { StyleSheet, View, Text } from "react-native";

const Message = ({ sender, message, timestamp }) => {
  const isUser = sender === "user";

  return (
    <View
      style={[
        styles.message,
        isUser ? styles.userMessage : styles.botMessage,
      ]}
    >
      <View style={styles.messageHeader}>
        <Text style={styles.timestamp}>
          {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
      <Text style={styles.messageText}>{message}</Text>
      {!isUser && <View style={styles.tail} />}
    </View>
  );
};

const styles = StyleSheet.create({
  message: {
    flexDirection: "column",
    padding: 16,
    borderRadius: 16,
    marginBottom: 8,
    maxWidth: "75%",
    opacity: 0.85,
    position: 'relative',
  },
  userMessage: {
    backgroundColor: "#007BFF",
    alignSelf: "flex-end",
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  botMessage: {
    backgroundColor: "#FFFFFF",
    alignSelf: "flex-start",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderTopRightRadius: 16,
  },
  messageHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 10,
    color: "#666",
  },
  messageText: {
    fontSize: 14,
    color: "#000",
  },
  tail: {
    position: "absolute",
    top: 16,
    left: -10,
    width: 0,
    height: 0,
    borderStyle: "solid",
    borderWidth: 10,
    borderColor: "transparent",
    borderRightWidth: 10,
    borderRightColor: "#FFFFFF",
    borderTopWidth: 10,
    borderTopColor: "transparent",
    borderLeftWidth: 10,
    borderLeftColor: "transparent",
  },
});

export default Message;
