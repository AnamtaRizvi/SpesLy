import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, FlatList, Image,ScrollView, TouchableOpacity  } from "react-native"
import TextBox from "../components/TextBox"
import Btn from "../components/Btn"
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useNavigation } from '@react-navigation/native';
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

const VolunteersScreen = ({ route }) => {
  const [volunteers, setVolunteers] = useState([]);
  const [userNames, setUserNames] = useState([]);
  const navigation = useNavigation();
  const firestore = firebase.firestore;
  
  
  
  useEffect(() => {
    const fetchVolunteers = async () => {
      const postId = route.params.postId;
      const postRef = firestore().collection('posts').doc(postId);

      try {
        const postSnapshot = await postRef.get();

        if (postSnapshot.exists) {
          const { volunteers } = postSnapshot.data();
          setVolunteers(volunteers);
             const userPromises = volunteers.map((userId) =>
            firestore().collection('users').doc(userId).get()
          );
          const userSnapshots = await Promise.all(userPromises);
          const userDict = {};
         userSnapshots.forEach((snapshot) => {
            if (snapshot.exists) {
              const { name } = snapshot.data();
              userDict[snapshot.id]= { name, attended:false, id:snapshot.id};
            } });
          setUserNames(userDict);
        }
      } 
       
      catch (error) {
        console.log('Error fetching volunteers:', error);
      }
    };

    fetchVolunteers();
  }, [route.params.postId]);

  const handleAttendedChange = (volunteerId, attend) => {
    const updatedUserDict = { ...userNames };
    updatedUserDict[volunteerId.volunteerId].attended = attend;
    setUserNames(updatedUserDict);
  };


  const countAttended = () => {
  let attendedCount = 0;

  Object.values(userNames).forEach((user) => {
    if (user.attended === true) {
      attendedCount++;
    }
  });

  return attendedCount;
};

const attendedCount = countAttended();

  return (
    <View>
    <View style={styles.container}>
     <Text>Volunteers:</Text>
     <Text style={styles.counts}>{`Total: ${volunteers.length} | Attended: ${attendedCount} | Unattended: ${volunteers.length-attendedCount}`}</Text>
      {volunteers.map((volunteerId) => (
        <TouchableOpacity  style={styles.volunteerItem}>
        <Text key={volunteerId} style={styles.volunteerName}>{userNames[volunteerId]?.name || 'Unknown User'} </Text>
      <View style={styles.radioContainer}>
      
        <TouchableOpacity style={styles.radioOption} onPress={() => handleAttendedChange({volunteerId},true)}>
          <View style={[styles.radioCircle, userNames[volunteerId]?.attended && styles.radioSelected]} />
          <Text style={styles.radioLabel}>Attending</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.radioOption} onPress={() => handleAttendedChange({volunteerId},false)}>
          <View style={[styles.radioCircle, !userNames[volunteerId]?.attended && styles.radioSelected]} />
          <Text style={styles.radioLabel}>Not Attending</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
    ))}
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
export default VolunteersScreen;
/*<View>
      <Text>Volunteers:</Text>
      {volunteers.map((volunteer, index) => (
        <Text key={index.toString()}>{volunteer}</Text>
      ))}
    </View>{volunteers.map((volunteer, index) => (
        <Text key={index}>{volunteer}</Text>

 const updatedUserNames = {...userNames}
    console.log('fetched the existing',updatedUserNames)

 const user = userNames[volunteerId.volunteerId];
    console.log('before',user)
    const updateduser = {...user,attended:attend};
    console.log('after',updateduser);
    setUserNames(updateduser);
    console.log(userNames);
<ul><Text key={volunteerId}>
          {userNames[volunteerId]?.name || 'Unknown User'} {userNames[volunteerId]?.attended}
        </Text></ul>


      ))}*/
