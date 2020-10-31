import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';

export default class SettingScreens extends Component{
    constructor(){
        super()
        this.state={
            emailId:'',
            firstName:'',
            lastName:'',
            address:'',
            contact:'',
            docId:'',
        }
    }
    getUserDetails=()=>{
        var email=firebase.auth().currentUser.email
        db.collection("users").where("email_id","==",email).get().then((snapshot)=>{
            snapshot.forEach((doc)=>{
                var data= doc.data()
                this.setState({
                    emailId:data.email_id,
                    firstName:data.first_name,
                    lastName:data.last_name,
                    address:data.address,
                    contact:data.contact,
                    docId:doc.id
                })
            })
        })
    }
    componentDidMount(){
        this.getUserDetails()
    }
    updateUserDetails=()=>{
        db.collection("users").doc(this.state.docId).update({
            first_name:this.state.firstName,
            last_name:this.state.lastName,
            contact:this.state.contact,
            address:this.state.address
        })
        Alert.alert("Profile Updated Succesfully")
        
    }
    render(){
        return(
            <View style={styles.container}>
                <MyHeader title={"Settings"} navigation={this.props.navigation}>

                </MyHeader>
                <View style={styles.formContainer}>
                <TextInput
          style={styles.formTextInput}
          placeholder ={"First Name"}
          maxLength ={8}
          onChangeText={(text)=>{
            this.setState({
              firstName: text
            })
          }}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Last Name"}
          maxLength ={8}
          onChangeText={(text)=>{
            this.setState({
              lastName: text
            })
          }}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Contact"}
          maxLength ={10}
          keyboardType={'numeric'}
          onChangeText={(text)=>{
            this.setState({
              contact: text
            })
          }}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Address"}
          multiline = {true}
          onChangeText={(text)=>{
            this.setState({
              address: text
            })
          }}
        />
        <TouchableOpacity style={styles.button} onPress={()=>{this.updateUserDetails()}}>
            <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles= StyleSheet.create({
    formContainer:{
        flex:1,
        width:"100%",
        alignItems: 'center',
        
      },
      container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
      },
      formTextInput:{
        width:"75%",
        height:35,
        alignSelf:'center',
        borderColor:'#ffab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10
      },
      button:{
        width:300,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25,
        backgroundColor:"#ff9800",
        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 8,
        },
        shadowOpacity: 0.30,
        shadowRadius: 10.32,
        elevation: 16,
        padding: 10
      },
      buttonText:{
        color:'#ffff',
        fontWeight:'200',
        fontSize:20
      }
})