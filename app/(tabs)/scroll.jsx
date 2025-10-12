import React from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Horizontal Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.row}>
          <Text style={styles.text}>[Verse 1] Does it mean it's over now?</Text>
          <Text style={styles.text}>You never open up, would tell me we're okay</Text>
          <Text style={styles.text}>Understand I'm trying now</Text>
          <Text style={styles.text}>A momentary time of doubt</Text>
          <Text style={styles.text}>Is it really over now?</Text>
          <Text style={styles.text}>Sick to stomach saying I'm sorry</Text>
          <Text style={styles.text}>Maybe we can ride it out</Text>
          <Text style={styles.text}>Everything will quiet down</Text>
          <Text style={styles.text}>[Pre-Chorus] 'Cause I won't give up</Text>
          <Text style={styles.text}>A fork in the road</Text>
          <Text style={styles.text}>Under my skin you're a scent in my clothes</Text>
          <Text style={styles.text}>And i'm waiting every night praying that</Text>
          <Text style={styles.text}>[Chorus]I call and</Text>
          <Text style={styles.text}>maybe you'll pick up</Text>
          <Text style={styles.text}>I know that it's been</Text>
          <Text style={styles.text}>so long</Text>
          <Text style={styles.text}>Stay up all night if</Text>
          <Text style={styles.text}>You would just try this</Text>
          <Text style={styles.text}>Oh I really wanted</Text>
          <Text style={styles.text}>You to know</Text>
          <Text style={styles.text}>I miss you</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#172A6E',
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexDirection: 'cloumn', // makes it horizontal
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  row: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18,
    marginRight: 20,
    textAlign: 'center'
  },
});

export default App;
