import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const DonateScreen = () => {
  const [amount, setAmount] = useState('');

  const handleDonate = () => {
    if (amount === '') {
      Alert.alert('Error', 'Please enter the donation amount.');
      return;
    }

    // Process the donation or perform necessary actions
    // You can add your logic here

    Alert.alert('Thank You', 'Your donation has been processed successfully!');
    setAmount('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Donate</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter donation amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Donate Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
};

export default DonateScreen;
/*import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, FlatList, Image,ScrollView, TouchableOpacity  } from "react-native"
import TextBox from "../components/TextBox"
import Btn from "../components/Btn"
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RazorpayCheckout from 'react-native-razorpay';
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
 volunteerList: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  volunteerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    height:100,
  },
  volunteerName: {
    flex: 1,
    fontSize: 16,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
},
radioSelected: {
  backgroundColor: '#1a1a1a',
},
radioLabel: {
  marginLeft: 8,
  fontSize: 16,
},
})
const DonateScreen = ({ route }) => {
    const auth = firebase.auth;
  const [post, setPost] = useState([]);
  const [userNames, setUserNames] = useState([]);
  const navigation = useNavigation();
  const firestore = firebase.firestore;
  const [user, setUser] = useState(null)
  const [amount, setAmount] = useState()
  useEffect(() => {
        firestore().collection("users").doc(auth().currentUser.uid).get()
            .then(user => {
                setUser(user.data())
            })
    }, [])

  useEffect(() => {
    const fetchPosts = async () => {
      const postId = route.params.postId;
      const postRef = firestore().collection('posts').doc(postId);

      try {
        const postSnapshot = await postRef.get();

        if (postSnapshot.exists) {
         postSnapshot.data();
          setPost(postSnapshot.data());
        }
      } 
       
      catch (error) {
        console.log('Error fetching post:', error);
      }
    };

    fetchPosts();
  }, [route.params.postId]);


  return (
    <View>
    <View>
        <Text style={styles.postTitle}>Event name {post?.eventName}</Text>
        <Text style={styles.postDescription}> Event description {post?.eventDes}</Text>
        <Text style={styles.postTitle}>User {user?.name}</Text>
        <TextBox style={styles.input} placeholder="Donation Amount" onChangeText={(text) => setAmount(text)}/>
        <TouchableOpacity><Text>pay now</Text></TouchableOpacity>
    </View>

      <View style={styles.tabBar}> 
       <TouchableOpacity style={styles.tabBarButton}>
          <FontAwesome name="home" size={20} color="#888" onPress={() => navigation.navigate("Home")}/>
       </TouchableOpacity>
       <TouchableOpacity style={styles.tabBarButton}>
          <FontAwesome name="user" size={20} color="#888" onPress={() => navigation.navigate("Profile")} />
       </TouchableOpacity>
       <TouchableOpacity style={styles.tabBarButton}>
          <FontAwesome name="camera-retro" size={20} color="#888" />
       </TouchableOpacity>
       <TouchableOpacity style={styles.tabBarButton}>
          <FontAwesome name="user-plus" size={20} color="#888" onPress={() => navigation.navigate("Sign Up")} />
       </TouchableOpacity>
     </View>
</View>
  );
}
export default DonateScreen;*/