import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import * as ImagePicker from 'expo-image-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export default function EditprofileScreen() {
  
   

    const firestore = firebase.firestore;
    const auth = firebase.auth;

    const [user, setUser] = useState(null) // This user


    const [name, setName] = useState('');
   const [contactno, setContactno] = useState('');
   const [address, setAddress] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
 

    useEffect(() => {
        firestore().collection("users").doc(auth().currentUser.uid).get()
            .then(user => {
                setUser(user.data())
            })
    }, [])



  const handleProfilePictureUpload = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePicture(result.assets[0].uri);
    }
  };

  const handleSaveProfile = async () => {
    try {
      const user = firebase.auth().currentUser;
      await firebase.firestore().collection('users').doc(user.uid).update({
        profilePicture,
      });
      alert('Profile saved successfully!');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {
          <Image source={{ uri: user?.profilePicture }} style={styles.image} />
       }
      </View>
       <TouchableOpacity style={styles.saveButton} onPress={handleProfilePictureUpload}>
            <Text style={styles.saveButtonText}>Change Profile Picture</Text>
          </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Name"
         value={user?.name}
        onChangeText={(text) => setName(text)}
       
      />
       <TextInput
        style={styles.input}
        placeholder="Contact Number"
        onChangeText={(text) => setContactno(text)}
        value={contactno}
      />
       <TextInput
        style={styles.input}
        placeholder="address"
        onChangeText={(text) => setAddress(text)}
        value={address}
      />
    
  
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
        <Text style={styles.saveButtonText}>Save Profile</Text>
      </TouchableOpacity>
      
      
      
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
       {user?.role==='Admin'?<><TouchableOpacity style={styles.tabBarButton}>
          <FontAwesome name="user-plus" size={20} color="#888" onPress={() => navigation.navigate("Sign Up")} />
       </TouchableOpacity></>:<></>}
     </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
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
  uploadButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ddd',
  },
  uploadButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
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
});
