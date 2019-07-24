import React, { Component } from 'react';
import {getAllUsers,createChatRoom} from '../config/firebase'
import loaderImg from '../assets/EmptyDeliriousBluefish-small.gif'
import Button from '@material-ui/core/Button';


class ChatList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            users:[]
         };
         this._createChatRoom=this._createChatRoom.bind(this);
    }

     componentDidMount(){
         this.getUserData();
    }

    async getUserData(){
        let a=await getAllUsers();
        console.log(a) 
        this.setState({users:a})
    }

   async _createChatRoom(friendID){
       try{
           let a=await createChatRoom(friendID);
           console.log('return promise resolved data--------->',a.data);
           console.log(a.chatroomID);
        this.props.history.push(`/chat/${a.chatroomID}`);
       }
       catch(err){
           console.log('error in creating chatroom',err.message)
           alert(err.message);
       }
    }

    render() {
        const {users}=this.state;
        return (
            <div className='container'  style={{textAlign:'center'}} >
            <br/>
            <h3 className='display-4'>CHAT LIST</h3>
            <br/>
{
    !users.length ?
    <img  src={loaderImg} alt='loader' width='100' height='100' />   
    :
<div style={{display:'inline-block'}} className='shadow-sm p-3 mb-5 bg-white rounded'>
    <ul  >
        {users.map((item,key)=>{
            return(
                <li key={key} >{item.email}  
      <Button variant="contained" size='small'  color='secondary' onClick={()=>this._createChatRoom(item._id)}  >CHAT</Button>
      </li>
            )
        })}
    </ul>
</div>
}
            
            </div>
        );
    }
}

export default ChatList;