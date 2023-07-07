import React, { useState, useEffect } from 'react'
import { StyleSheet, Button,Platform, Text, TextInput,
  TouchableOpacity, View, Image  } from "react-native"
import TextBox from "../components/TextBox"
import Btn from "../components/Btn"
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/firestore";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';

export default function AddPostScreen({ navigation }) {
 const firestore = firebase.firestore;
    const auth = firebase.auth;
   const [eventName, setEventName] = useState('');
   const [eventDes, setEventdes] = useState('');
   const [date, setDate] = useState('');
   const [status, setStatus] = useState('');
   const [type, setType] = useState('');
   const [poster, setPoster] = useState(null);
   const isWeb = Platform.OS === 'web';
const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate) => {
    const currentDate = moment();
    const selectedMomentDate = moment(selectedDate);
    
    if (selectedMomentDate.isAfter(currentDate)) {
      setDate(selectedDate)
      setStatus("Active")
      alert(selectedDate)
    } 
    else {
      alert("Enter a valid date");
    }

    hideDatePicker();
  };
const Check = () => {
  const currentDate = moment();
    const selectedMomentDate = moment(selectedDate);
    
    if (selectedMomentDate.isAfter(currentDate)) {
      setDate(selectedDate)
      setStatus("Active")
      alert(selectedDate)
    } 
    else {
      alert("Enter a valid date");
    }
};
  const handlePosterUpload = async () => {
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
      
      setPoster(result.assets[0].uri);
    }
  };


 const handleAddPost = () => {
    // Check if posts collection exists in Firebase
    const posts = firebase.firestore().collection('posts');
    posts.get()
      .then(() => {
        // Add the new post to the posts collection
        posts.add({
          eventName,
          date,
          poster,
          eventDes,
          status,
          type,
          volunteers:[],
        });alert('post added successfully')
      })
      .catch((error) => {
        console.log(error);
      });
  };

return (
<View style={styles.container}>
      <View style={styles.imageContainer}>
        {
          <Image source={{ uri:"https://icons.iconarchive.com/icons/designbolts/free-multimedia/1024/Photo-icon.png" }} style={styles.image} />
       }
      </View>
       <TouchableOpacity style={styles.saveButton} onPress={handlePosterUpload}>
            <Text style={styles.saveButtonText}>Add Poster</Text>
      </TouchableOpacity>
      {!isWeb?<View> 
      
      
      <TouchableOpacity style={styles.saveButton} onPress={showDatePicker}><Text>Select Date</Text></TouchableOpacity>
      <View style={styles.text}><DateTimePickerModal 
        isVisible={isDatePickerVisible}
        mode="date"
        format="YYYY-MM-DD"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      /></View>

      </View>:<TextInput style={styles.input} placeholder="Enter date" onChangeText={() => Check(text)} />}
        
        <TextInput style={styles.input} placeholder="Event Name" onChangeText={(text) => setEventName(text)}/>
        <TextInput style={styles.input} placeholder="Donation/volunteers" onChangeText={(text) => setType(text)}/>
        <TextInput
        style={styles.input}
        placeholder="description"
        onChangeText={(text) => setEventdes(text)}
        />
       <View>
    </View>
      
      <TouchableOpacity style={styles.saveButton} onPress={handleAddPost}>
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
       <TouchableOpacity style={styles.tabBarButton}>
          <FontAwesome name="user-plus" size={20} color="#888" onPress={() => navigation.navigate("Sign Up")} />
       </TouchableOpacity>
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
    borderRadius: 20,
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
  text:{
   backgroundColor:'#1a1a1a'
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
});
        
        
        
        
        
        
        
        
        
        
    /* .then((querySnapshot) => {
        if (querySnapshot.empty) {
          // Create the posts collection if it doesn't exist
          posts.doc('init').set({});<TouchableOpacity onPress={showDatePicker}> <Text> select date</Text> </TouchableOpacity> 
        }   
      })*/    
        
        
        
        
        
        
        
        
       
