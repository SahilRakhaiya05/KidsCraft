import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { TextInput, TouchableOpacity, View, Text, StyleSheet, ScrollView } from 'react-native';

const API_KEY = 'YOUR_API_KEY';

interface GeminiChatbotProps {
  isVisible: boolean;
  onClose: () => void;
}

interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

const GeminiChatbot: React.FC<GeminiChatbotProps> = ({ isVisible, onClose }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [genAI, setGenAI] = useState<GoogleGenerativeAI | null>(null);
  const [model, setModel] = useState<any | null>(null);

  // Initialize generative AI and model when the component mounts
  React.useEffect(() => {
    const initializeGenerativeAI = async () => {
      const generativeAI = new GoogleGenerativeAI(API_KEY);
      const geminiModel = generativeAI.getGenerativeModel({ model: 'gemini-pro' });
      setGenAI(generativeAI);
      setModel(geminiModel);
    };

    initializeGenerativeAI();
  }, []);

  const sendMessage = async () => {
    if (!genAI || !model) return;

    try {
      const result = await model.generateContent(input);
      const response = await result.response;
      const text = response.text();

      setMessages((prevMessages) => [...prevMessages, { id: Date.now(), text: input, isUser: true }]);
      setMessages((prevMessages) => [...prevMessages, { id: Date.now() + 1, text, isUser: false }]);

      setInput('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return isVisible ? (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerItem}>
          <View style={styles.botLogo} />
          <Text style={styles.headerText}>KidGemi</Text>
        </View>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.chatContainer}
        contentContainerStyle={styles.chatContentContainer}
        ref={(scrollView) => scrollView?.scrollToEnd({ animated: true })}
      >
        {messages.map((message) => (
          <View key={message.id} style={message.isUser ? styles.userMessageContainer : styles.botMessageContainer}>
            <Text style={message.isUser ? styles.userMessageText : styles.botMessageText}>{message.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          value={input}
          onChangeText={setInput}
          style={styles.input}
          placeholder="Type a message..."
          multiline
          numberOfLines={3}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#ece5dd',
    justifyContent: 'flex-end',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
    paddingHorizontal: 20,
    backgroundColor: '#128C7E',
  },
  headerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  botLogo: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#fff', 
    marginRight: 10,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#128C7E',
    padding: 20,
    borderRadius: 50,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 24,
  },
  chatContainer: {
    maxHeight: '80%',
  },
  chatContentContainer: {
    padding: 10,
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#dcf8c6',
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  botMessageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  userMessageText: {
    padding: 8,
    fontSize: 16,
    color: '#000',
  },
  botMessageText: {
    padding: 8,
    fontSize: 16,
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 8,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#128C7E',
    padding: 15,
    borderRadius: 50,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GeminiChatbot;
