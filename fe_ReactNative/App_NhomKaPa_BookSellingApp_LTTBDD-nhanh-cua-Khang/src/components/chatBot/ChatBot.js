import React, { useEffect } from 'react';
import { View, Text } from 'react-native-web';
import { WebView } from 'react-native-webview';

export default function ChatBot() {
  useEffect(() => {
    setTimeout(() => {
      console.log("WebView is ready");
    }, 3000); 
  }, []);

  return (
      <WebView
        source={{ uri: 'https://www.chatbase.co/chatbot-iframe/R7SALcXsewXqOiHzuXHi8' }}
        flex={1}
        style={{ marginTop: 40}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        keyboardShouldPersistTaps="handled"
      />
  

  );
}
