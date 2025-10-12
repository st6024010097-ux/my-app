import React from 'react';
import { View, FlatList, StyleSheet, Text, StatusBar, Image } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

// Import local images
import curry from '../../assets/images/curry.jpg';
import jimmy from '../../assets/images/butler.jpg';
import green from '../../assets/images/green.jpg';

const DATA = [
  {
    id: 'Curry',
    title: 'Stephen Curry',
    photo: curry,
    bio: 'The greatest shooter of all time',
  },
  {
    id: 'Butler',
    title: 'Jimmy Butler',
    photo: jimmy,
    bio: 'Playoff Jimmy',
  },
  {
    id: 'Green',
    title: 'Draymond Green',
    photo: green,
    bio: 'Defensive Anchor',
  },
];

const Item = ({ title, photo, bio }) => (
  <View style={styles.item}>
    <Image source={photo} style={styles.image} />
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.bio}>{bio}</Text>
  </View>
);

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <Item title={item.title} photo={item.photo} bio={item.bio} />
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#fff',
  },
  item: {
    backgroundColor: '#172A6E',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginTop: 10,
  },
  bio: {
    fontSize: 16,
    color: '#ccc',
    marginTop: 5,
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 80,
  },
});

export default App;