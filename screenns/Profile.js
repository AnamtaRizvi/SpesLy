import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity  } from "react-native"
import TextBox from "../components/TextBox"
import Btn from "../components/Btn"
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/firestore";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const styles = StyleSheet.create({
    view: {
         flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10
    },
     container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
    header: {
    width: '100%',
    height: 50,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center'
  }, title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  },
  tabBar: {
flexDirection: 'row',
justifyContent: 'space-around',
alignItems: 'center',
width: '100%',
height: 50,
borderTopWidth: 1,
borderTopColor: '#ddd'
},
tabBarButton: {
alignItems: 'center',
justifyContent: 'center'
},
 imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 18,
    marginBottom: 5,
  },
  editButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,width: 90,
  },
  editButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
})
export default function ProfileScreen({ navigation }) {
    const firestore = firebase.firestore;
    const auth = firebase.auth;

    const [user, setUser] = useState(null) // This user
    const [users, setUsers] = useState([]) // Other Users

    useEffect(() => {
        firestore().collection("users").doc(auth().currentUser.uid).get()
            .then(user => {
                setUser(user.data())
            })
    }, [])
return <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>Welcome {user?.name}</Text>
        </View>
        
        <View style={styles.view}> 
         
         
        <View style={styles.imageContainer}>
          <Image source={{ uri: user?.profilePicture }} style={styles.image} />
        </View>
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.info}>Contact {user?.contactno}</Text>
        <Text style={styles.info}>Badges{user?.badges}</Text>
        <Text style={styles.info}>{user?.address}</Text>
        <Text style={styles.info}>{user?.role}</Text>
        <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate("Editprofile")}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
        
        
        </View>




        <View style={styles.tabBar}> 
       <TouchableOpacity style={styles.tabBarButton}>
          <FontAwesome name="home" size={20} color="#888" onPress={() => navigation.replace("Home")}/>
       </TouchableOpacity>
       <TouchableOpacity style={styles.tabBarButton}>
          <FontAwesome name="user" size={20} color="#888" />
       </TouchableOpacity>
       <TouchableOpacity style={styles.tabBarButton}>
          <FontAwesome name="camera-retro" size={20} color="#888" onPress={() => navigation.navigate("Memories")}/>
       </TouchableOpacity>
       <TouchableOpacity style={styles.tabBarButton}>
          <FontAwesome name="user-plus" size={20} color="#888" onPress={() => navigation.navigate("Sign Up")} />
       </TouchableOpacity>
     </View>
        
        
        
        </View>
}