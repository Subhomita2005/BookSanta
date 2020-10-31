import React ,{Component} from 'react'
import {View, Text,TouchableOpacity,ScrollView,FlatList,StyleSheet} from 'react-native';
import {Card,Icon,ListItem} from 'react-native-elements'
import MyHeader from '../components/MyHeader.js'
import firebase from 'firebase';
import db from '../config.js'

export default class NotificationScreen extends Component{
    constructor(props){
        super(props)
        this.state={
            userId:firebase.auth().currentUser.email,
            allNotifications:[]
        }
        this.notificationRef=null
    }
    getnotifications =()=>{
        this.notificationRef = db.collection("all_notifications").where("notification_status" ,'==', "unread").where("targeted_used_id","==",this.state.userId)
        .onSnapshot((snapshot)=>{
          var allNotifications = []
          snapshot.docs.map((doc) =>{
            var notification = doc.data()
            notification["doc_id"] = doc.id
            allNotifications.push(notification)
          });
          this.setState({
            allNotifications : allNotifications
          });
          
        })
      }
      componentDidMount(){
          this.getnotifications

      }
      componentWillUnmount(){
          this.notificationRef()
      }
      keyExtractor = (item, index) => index.toString()
      renderItem = ( {item, i} ) =>(
        <ListItem
          key={i}
          title={item.book_name}
          subtitle={item.message}
          leftElement={<Icon name="book" type="font-awesome" color ='#696969'/>}
          titleStyle={{ color: 'black', fontWeight: 'bold' }}
          
          bottomDivider
        />
      )
      render(){
        return(
          <View style={{flex:1}}>
              <View style={{flex:0.1}}>
            <MyHeader navigation={this.props.navigation} title="MyNotifications"/>
            </View>
            <View style={{flex:0.9}}>
              {
                this.state.allNotifications.length === 0
                ?(
                  <View style={{flex:1,justifyContent:"center", alignItems:"center"}}>
                    <Text style={{ fontSize: 20}}>You have no notifications</Text>
                  </View>
                )
                :(
                  <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.state.allNotifications}
                    renderItem={this.renderItem}
                  />
                )
              }
            </View>
          </View>
        )
      }
      }
