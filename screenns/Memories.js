import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, FlatList, Image,ScrollView, TouchableOpacity  } from "react-native"
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
   pcontainer: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  postContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#D3D3D3'
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
export default function MemoriesScreen({ navigation }) {

   const firestore = firebase.firestore;
    const auth = firebase.auth;
    const [user, setUser] = useState(null) // This user
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

return <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>Memories</Text>
        </View>
           
        <View style={styles.view}>
        <ScrollView contentContainerStyle={styles.pcontainer}>
      {posts.map((post) => (
        <View>
        {post.status==='Inactive'?
        <View key={post.id} style={styles.postContainer}>
          <Image source={{ uri: post?.poster }} style={styles.postImage} />
          <View style={styles.postContent}>
            <Text style={styles.postTitle}>Event name {post?.eventName}</Text>
            <Text style={styles.postDescription}> Event des {post?.eventDes} {post?.volunteers}</Text>
            <Text style={styles.postDate}> Event date {post?.date && post?.date.toDate().toISOString().split('T')[0]}</Text>
            {user?.role==='Admin'?
            <Btn title="View Voluteers" style={{ width: "fit-content",padding:10, backgroundColor: "#1a1a1a" }}  onClick={() => handleVolunteer(post.id)} />:
            <></>}
          </View>  
          </View>
            :<></>}</View>
      ))}
    </ScrollView>



        <View style={styles.tabBar}> 
       <TouchableOpacity style={styles.tabBarButton}>
          <FontAwesome name="home" size={20} color="#888" onPress={() => navigation.navigate("Home")}/>
       </TouchableOpacity>
       <TouchableOpacity style={styles.tabBarButton}>
          <FontAwesome name="user" size={20} color="#888" onPress={() => navigation.navigate("Profile")} />
       </TouchableOpacity>
       <TouchableOpacity style={styles.tabBarButton}>
          <FontAwesome name="camera-retro" size={20} color="#888" />
       </TouchableOpacity>{user?.role==='Admin'?<>
       <TouchableOpacity style={styles.tabBarButton}>
          <FontAwesome name="user-plus" size={20} color="#888" onPress={() => navigation.navigate("Sign Up")} />
       </TouchableOpacity></>:<></>}
     </View>
        
        
        </View>
        </View>
}
/*  
fetching the user details can be used to fetch post details

    const [user, setUser] = useState(null) // This user
    const [users, setUsers] = useState([]) // Other Users

    useEffect(() => {
        firestore().collection("users").doc(auth().currentUser.uid).get()
            .then(user => {
                setUser(user.data())
            })
    }, [])  
    
*/