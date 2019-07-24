import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import {sendMessagesToDB, db,auth} from '../config/firebase'
import moment from 'moment';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            text:'',
            messages:[],
         };
         this._sendMessage=this._sendMessage.bind(this);
    }

    componentDidMount(){
        this._getAllMessages()
    }

    async _getAllMessages(){
        const chatroomID=this.props.match.params.chatroomID;
        console.log('componentDidMount--chatroomID',chatroomID);

        db.collection('chatrooms').doc(chatroomID).collection('messages')
        .orderBy('timestamp')
        .onSnapshot(snapshot=>{
            const messages=[];

            snapshot.forEach(elem=>{
                messages.push({data:elem.data(),id:elem.id})
            })
            console.log('messages------>',messages)

            this.setState({messages:messages},()=>{
                const scroolHeight=this.messageList.scroolHeight;
                const height=this.messageList.clientHeight;
                const maxScroolTop=scroolHeight-height;
                this.messageList.scroolTop=maxScroolTop>0?maxScroolTop:0;
            });

        })
    }

    _sendMessage(){
        const chatroomID=this.props.match.params.chatroomID;
        // console.log(chatroomID);
        sendMessagesToDB(chatroomID,this.state.text)
        this.setState({text:''})
    }

    render() {
        const {messages}=this.state;
        // console.log('this.props.match.params.chatroomID---------->',this.props.match.params.chatroomID)
        return (
            <div  style={{widows:'100vw'}}>


                <div
                ref={(el)=>{this.messageList=el;}}
                style={{paddingBottom:50,height:'100vh',overflow:'scroll'}}
                >
                    {
                        messages.map((message,key)=>{
                            const messageStyle=message.data.userID === auth.currentUser.uid ?
                            {marginBottom:48,marginLeft:'70vw' } :
                            {marginBottom:48,marginRight:'50vw' }
                            
                            return(
                            <div style={messageStyle} key={key} >
                                <h3>{message.data.message}</h3>
                                <p>{moment(message.data.timestamp).fromNow()}</p>
                            </div>)
                        })
                    }
                    
                </div>


                    <input
                    type='text'
                    value={this.state.text}
                    onChange={(e)=>this.setState({text:e.target.value})}
                    style={{width:'100%',height:80,fontSize:28,position:'fixed',bottom:0,left:0}}
                    placeholder='Type here to chat' 
                    />

                    <Button onClick={this._sendMessage} 
                    style={{position:'fixed',bottom:15,right:10}}
                    color='secondary'
                    variant="contained" size='large'
                    >Send</Button>
            </div>
        );
    }
}

export default Chat;