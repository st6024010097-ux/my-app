import React, { useState } from 'react'; 
import { View, Button, ScrollView, StyleSheet } from 'react-native'; 
//import * as todoService from '../services/todoService'
import Cat from '../prop';
import curry from '../../assets/images/curry.jpg';
import jimmy from '../../assets/images/butler.jpg';
 
const App = () => { 
  const user1 = { 
    name: "Stephen Curry", 
    age: 39, 
    email: "stephcurry@example.com", 
    bio: "Greatest Shooter of all time", 
    photo: curry
  }; 
 
  const user2 = { 
    name: "Jimmy Butler", 
    age: 36, 
    email: "butler@example.com", 
    bio: "Playoff Jimmy", 
    photo: jimmy, 
  }; 
   
  const allUsers = [user1, user2]; 
   
  const [activeUser, setActiveUser] = useState(user1); 
 
  const toggleUser = () => { 
    setActiveUser(prevUser => { 
      let currentIndex = allUsers.findIndex(user => user.photo === prevUser.photo); 
      let nextIndex = (currentIndex + 1) % allUsers.length; 
      return allUsers[nextIndex]; 
    }); 
  }; 
 
  const incrementAge = () => { 
    setActiveUser(prev => ({ ...prev, age: prev.age + 1 })); 
  }; 
 
  const resetUser = () => { 
    setActiveUser(user1); 
  }; 
 
  return ( 
    <ScrollView contentContainerStyle={styles.container}> 
      <Cat 
        name={activeUser.name} 
        age={activeUser.age} 
        email={activeUser.email} 
        bio={activeUser.bio} 
        photo={activeUser.photo}  
      /> 
 
      <View style={styles.buttons}> 
        <View style={styles.buttonWrapper}> 
          <Button title="Toggle User " onPress={toggleUser} color="#AAECFC" /> 
        </View> 
        <View style={styles.buttonWrapper}> 
          <Button title="Increment Age" onPress={incrementAge} color="#008CDB"/> 
        </View> 
        <View style={styles.buttonWrapper}> 
          <Button title="Reset to Curry" onPress={resetUser} color="#086CB4"/> 
        </View> 
      </View> 
    </ScrollView> 
  ); 
}; 
 
export default App; 
 
const styles = StyleSheet.create({ 
    container: { 
        flex: 1, 
        backgroundColor: '#13678A', 
        alignItems: 'center', 
        justifyContent: 'center', 
      }, 
      scrollArea: { 
        alignItems: 'center', 
        paddingVertical: 20, 
      }, 
      buttons: { 
        flexDirection: 'column', 
        justifyContent: 'space-around', 
        marginTop: 20, 
        gap: 10, 
        width: '40%', 
        borderRadius: 10, 
        padding: 20, 
      }, 
      buttonWrapper: { 
        borderRadius: 25,  
        overflow: 'hidden', 
        elevation: 3,  
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.2, 
        shadowRadius: 3, 
      }, 
});
