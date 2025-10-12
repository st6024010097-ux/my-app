import React from 'react'; 
import { View, Text, Image, StyleSheet } from 'react-native'; 
 
const Card = (props) => { 
  return ( 
    <View style={styles.card}> 
      <Image source={props.photo} style={styles.image} /> 
      <Text style={styles.name}>Name: {props.name}</Text> 
      <Text>Age: {props.age}</Text> 
      <Text>Bio: {props.bio}</Text> 
      <Text>Email: {props.email}</Text> 
    </View> 
  ); 
}; 
 
export default Card; 
 
const styles = StyleSheet.create({ 
  card: { 
    alignItems: 'center', 
    backgroundColor: 'white', 
    padding: 20, 
    margin: 10, 
    borderRadius: 30, 
    width: 280, 
    shadowColor: 'pink', 
    shadowOffset: { width: 0, height: 2 }, 
    elevation: 3, 
  }, 
  image: { 
    width: 150, 
    height: 150, 
    borderRadius: 75, 
    marginBottom: 10, 
  }, 
  name: { 
    fontWeight: 'bold', 
    fontSize: 18, 
    textAlign: 'center', 
    alignItems: 'center', 
    marginBottom: 5, 
  }, 
});