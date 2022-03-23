import React,{useState} from 'react';
import { View, Text, Image,StyleSheet,KeyboardAvoidingView,Alert } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

const LoginScreen = ({navigation}) => {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

  const userSignin = async ()=>{
    if(!email||!password){
      Alert.alert("please all all the fields")  
      console.log("first")
      return
    }
    try{
        await auth().signInWithEmailAndPassword(email,password)
        // messaging().getToken().then(token=>{
        //     firestore().collection('usertoken').add({
        //         token:token
        //     })
        //   })
       
    }catch(err){
        console.log(err)
        Alert.alert("something went wrong please try different password")
    }
}
  return (
    <KeyboardAvoidingView behavior='position' style={styles.box} >
    <View style={styles.box1}>
      <Image style={{height:200,width:200}} source={require('../assets/cnqlogo.png')}/>
      <Text style={styles.text}>Please login to continue!</Text>
    </View>
    <View style={styles.box2}>
      <TextInput
      style={styles.botton} 
      label="Email"
      value={email}
      mode='outlined'
      onChangeText={text=>setEmail(text)}
      />
      <TextInput
      style={styles.botton} 
      label="Password"
      value={password}
      mode='outlined'
      secureTextEntry={true}
      onChangeText={text=>setPassword(text)}
      />
       <Button mode="contained"  style={styles.botton} onPress={userSignin}>
     Login
       </Button>
       <TouchableOpacity onPress={()=>{
         navigation.navigate('signup')
       }}>
       <Text>
         Do not have account signup
       </Text>
       </TouchableOpacity>
     </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  box:{
    alignItems:'center',
  },
  box1:{
    display: 'flex',
    justifyContent:'center',
    alignItems:'center',
  },
  box2:{
    display: 'flex',
    paddingTop:50,
    width: 350,
    justifyContent:'space-evenly',
    height: "55%",
  },
  text:{
    fontSize:22,
  },
  botton:{
    height: 50,
    marginTop:12,
    justifyContent:"center"
  }
});

export default LoginScreen;