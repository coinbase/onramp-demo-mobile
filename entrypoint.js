// Import required polyfills first
// IMPORTANT: react-native-get-random-values must be imported first
import 'react-native-get-random-values';
import '@ethersproject/shims';
import 'fast-text-encoding';

// Add DevTools setup
if (__DEV__) {
    require('react-devtools-core').connectToDevTools({
      host: 'localhost',
      port: 8097,
    });
  }

  
// Then import the expo router
import 'expo-router/entry';
