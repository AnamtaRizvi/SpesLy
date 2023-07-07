import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from "react-native"
import TextBox from "../components/TextBox"
import Btn from "../components/Btn"
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/firestore";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const styles = StyleSheet.create({
    view: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    }, container: {
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
wrapper:{
    flexDirection:'row',
    justifyContent:'space-evenly',
},
inner:{
    width:12,
    height:12,
    backgroundColor:'gray',
    borderRadius:10,
},
outer:{
    width:20,
    height:20,
    borderWidth:1,
    borderRadius:15,
    justifyContent:'center',
    alignItems:'center',
},
mood:{
    marginHorizontal: 15,
    alignItems:'center',
},
rol:{
    fontSize:22,
    textTransform:'capitalize',
}

})

export default function SignUpScreen({ navigation }) {

    const auth = firebase.auth;
    const firestore = firebase.firestore;
    const [values, setValues] = useState({
        name: "",
        email: "",
        pwd: "",
        pwd2: "",
        role:"",
    });
    function handleChange(text, eventName) {
        setValues(prev => {
            return {
                ...prev,
                [eventName]: text
            }
        })
    }
    function SignUp() {

        const { email, pwd, pwd2, name,role} = values
        if (pwd == pwd2) {
            auth().createUserWithEmailAndPassword(email, pwd)
                .then(() => {
                    firestore().collection("users").doc(auth().currentUser.uid).set({
                        uid: auth().currentUser.uid,
                        name,
                        role,
                        email,
                        address:"",
                        contactno:"",
                        profilePicture:"http://cdn.onlinewebfonts.com/svg/img_529971.png",
                        badges:"",
                    })
                })
                .catch((error) => {
                    alert(error.message)
                    // ..
                });
       alert("User added Successfully") } 
       else {
            alert("Passwords are different!")
        }
    }

    return <View style={styles.container}>
    
    <View style={styles.header}>
            <Text style={styles.title}>Welcome</Text>
    </View>
    
    <View style={styles.view}>
        <Text style={{ fontSize: 34, fontWeight: "800", marginBottom: 20 }}>Add User</Text>
        <TextBox placeholder="Full Name" onChangeText={text => handleChange(text, "name")} />
         <TextBox placeholder="Role" onChangeText={text => handleChange(text, "role")} />
        <TextBox placeholder="Email Address" onChangeText={text => handleChange(text, "email")} />
        <TextBox placeholder="Password" secureTextEntry={true}  onChangeText={text => handleChange(text, "pwd")}/>
        <TextBox placeholder="Confirm Password" secureTextEntry={true}  onChangeText={text => handleChange(text, "pwd2")}/>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "92%", }}>
            <Btn onClick={() => SignUp()} title="Add User" style={{ width: "48%" }} />
        </View>
    </View>

    <View style={styles.tabBar}> 
       <TouchableOpacity style={styles.tabBarButton}>
          <FontAwesome name="home" size={20} color="#888" onPress={() => navigation.navigate("Home")}/>
       </TouchableOpacity>
       <TouchableOpacity style={styles.tabBarButton}>
          <FontAwesome name="user" size={20} color="#888" onPress={() => navigation.navigate("Profile")} />
       </TouchableOpacity>
       <TouchableOpacity style={styles.tabBarButton}>
          <FontAwesome name="camera-retro" size={20} color="#888" onPress={() => navigation.navigate("Memories")}/>
       </TouchableOpacity>
       <TouchableOpacity style={styles.tabBarButton}>
          <FontAwesome name="user-plus" size={20} color="#888"  />
       </TouchableOpacity>
     </View>
    
    </View>
}
/* 

<View style={styles.radioGroup}>
        <Text style={styles.radioLabel}>Role:</Text>
        <TouchableOpacity style={styles.radioOption} onPress={() => setRole('admin')}>
          <Text style={styles.radioLabel}>Admin</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.radioOption} onPress={() => setRole('volunteer')}>
          <Text style={styles.radioLabel}>Volunteer</Text>
        </TouchableOpacity>
        </View>

 <View style={styles.wrapper}>
           {['Admin','Volunteer'].map(rol => (
           <View key={rol} style={styles.mood}>
             <text style={styles.rol}>{rol}</text>
       <TouchableOpacity style={styles.outer} onClick={() => setRole(rol)}>
                    <roleView style={styles.inner}> </View>
       </TouchableOpacity>
       </View>
    )   )}
        </View>




         



<Btn onClick={() => navigation.replace("Login")} title="Login" style={{ width: "48%", backgroundColor: "#344869" }} /> */