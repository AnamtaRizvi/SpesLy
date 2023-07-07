import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, FlatList, ScrollView, Image, TouchableOpacity  } from "react-native"
import TextBox from "../components/TextBox"
import Btn from "../components/Btn"
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/firestore";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { disableErrorHandling } from 'expo';
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
    flexDirection:'column',
    width: '100%',
    height: 'fit-content',
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
  }, title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
   pcontainer: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  postContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#D3D3D3',
    justifyContent: 'space-around'
  },
  postImage: {
    width: 150,
    height: 150,
    margin: 20,
    borderRadius: 8,
  },
  postContent: {
    marginLeft: 10,
    flex: 1,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  postDescription: {
    fontSize: 16,
    marginBottom: 5,
  },
  postDate: {
    fontSize: 14,
    color: 'gray',
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
})

export default function Homescreen({ navigation } ) {

    const firestore = firebase.firestore;
    const auth = firebase.auth;
    const [user, setUser] = useState(null) // This user
    const [users, setUsers] = useState([]) // Other Users
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        firestore().collection("users").doc(auth().currentUser.uid).get()
            .then(user => {
                setUser(user.data())
            })
    }, [])
    

  useEffect(() => {
    // Fetch posts from Firebase Firestore
    const fetchPosts = async () => {
      try {
        const collectionRef = firebase.firestore().collection('posts');
        const snapshot = await collectionRef.get();
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const batch = firestore().batch();

        snapshot.forEach((postDoc) => {
        const postData = postDoc.data();
        const postDate = postData.date.toDate(); // Assuming `date` field is stored as a Firestore Timestamp

        if (postDate < today) {
        const postRef = firestore().collection('posts').doc(postDoc.id);
        batch.update(postRef, { status: 'Inactive' });
      }
    });

    await batch.commit();
        const fetchedPosts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

const addVolunteerToPostDoc = (postid) => {
  // Get the current user's ID (You can replace this with your user authentication logic)
  const userId = firebase.auth().currentUser.uid;
  
  // Firebase Firestore document reference
  const docRef = firebase.firestore().collection('posts').doc(postid);
  console.log(docRef.status)
  docRef.update({
    volunteers: firebase.firestore.FieldValue.arrayUnion(userId)
  })
  .then(() => {
    console.log('Volunteer added successfully!');
  })
  .catch((error) => {
    console.log('Error adding volunteer:', error);
  });
};
const handleVolunteer = (postId) => {
    navigation.navigate('Volunteers', { postId });
  };
const handleDonate= (postId) => {
    navigation.navigate('Donate', { postId });
  };
const checkValueInArray = (array) => {
console.log(user?.id)
console.log(array)
const userId = firebase.auth().currentUser.uid;
const filteredArray = array.filter(item => item === userId).length;
console.log(filteredArray)

  return filteredArray;
};
    return <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>SpesLy</Text>
            <Text style={{ color:'white',margin:10}}>Logged In as {user?.name}</Text>
        </View>
           
        <View style={styles.view}>
        <ScrollView contentContainerStyle={styles.pcontainer}>
      {posts.map((post) => (
        <View>
        {post.status==='Active'?
        <View key={post.id} style={styles.postContainer}>
          <Image source={{ uri: post?.poster }} style={styles.postImage} />
          <View style={styles.postContent}>
            <Text style={styles.postTitle}>Event name {post?.eventName}</Text>
            <Text style={styles.postDescription}> Event des {post?.eventDes}</Text>
            <Text style={styles.postDate}> Event date {post?.date && post?.date.toDate().toISOString().split('T')[0]}</Text>
            {post?.type==='Donation'?
            <Btn title="Donate Now" style={{ width: "fit-content",padding:10 ,backgroundColor: "#1a1a1a" }}  onClick={() => handleDonate(post.id)}/>:
            <>{user?.role==='Admin'?
            <Btn title="View Voluteers" style={{ width: "fit-content",padding:10, backgroundColor: "#1a1a1a" }}  onClick={() => handleVolunteer(post.id)} />:
            <>{checkValueInArray(post.volunteers)=== 0? 
            <Btn title="Volunteer" style={{ width: "fit-content",padding:10, backgroundColor: "#1a1a1a" }}  
            onClick={() => addVolunteerToPostDoc(post.id) } />:<><Btn title="Volunteered" style={{ width: "fit-content",padding:10, backgroundColor: "#1a1a1a" }}></Btn></>}</>
         }</>
            }
            
          </View>  
          </View>
            :<></>}
            
            
            
            
            
            
            
            </View>
      ))}
    </ScrollView>
        
        <Btn title="Log Out" style={{ alignSelf: "center" ,width:"20%"}} onClick={() => firebase.auth().signOut()} />
        </View>
     <View style={styles.tabBar}> 
       <TouchableOpacity style={styles.tabBarButton}>
          <FontAwesome name="home" size={20} color="#888" />
       </TouchableOpacity>
       <TouchableOpacity style={styles.tabBarButton}>
          <FontAwesome name="user" size={20} color="#888" onPress={() => navigation.navigate("Profile")}/>
       </TouchableOpacity>
       <TouchableOpacity style={styles.tabBarButton}>
          <FontAwesome name="camera-retro" size={20} color="#888" onPress={() => navigation.navigate("Memories")}/>
       </TouchableOpacity>
        {user?.role==='Admin'?<><TouchableOpacity style={styles.tabBarButton}>
         <FontAwesome name="user-plus" size={20} color="#888" onPress={() => navigation.navigate("Sign Up")} />
       </TouchableOpacity>
       <TouchableOpacity style={styles.tabBarButton}>
          <FontAwesome name="plus" size={20} color="#888" onPress={() => navigation.navigate("AddPost")} />
       </TouchableOpacity></>:<></>}
     </View>
        {user?.role==='Admin'?<></>:<></>}
    </View>
}/*<FlatList
                    data={users}
                    renderItem={({ item }) => <View style={{ borderBottomWidth: 1, borderBottomColor: "#b1b1b1", marginBottom: 20}}>
                        <Text style={{ fontSize: 18, fontWeight: "400", marginBottom: 8 }}>{item.name}</Text>
                    </View>}
                    keyExtractor={(item, index) => index.toString()}     style={{ padding: 10, backgroundColor: "#b1b1b1", paddingTop: 55 }}
                />*/ 