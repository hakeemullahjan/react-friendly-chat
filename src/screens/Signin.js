import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'
import {signinUser, signupUser} from '../config/firebase'
import loaderImg from '../assets/EmptyDeliriousBluefish-small.gif'


class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            email:'',
            password:'',
            loader:false
         };
         this._signinUser=this._signinUser.bind(this);
    }

    async _signinUser(){
         
        try{
            const {email,password}=this.state;
            this.setState({loader:true})
            let a= await signinUser(email,password)
            alert(a.message)
            this.props.history.push('/chatlist')
            
        }
        catch(err){
            console.log('error is signup',err.message)
            alert(err.message)
                this.setState({loader:false})
        }
    }


    render() {
        return (
            <div className='container'  style={{textAlign:'center'}} >
   <br/>
   <h3 className='display-4'>SIGN IN</h3>
   <br/>
                <div style={{display:'inline-block'}} className='shadow-sm p-3 mb-5 bg-white rounded'>
                
      <TextField
        id="outlined-name"
        label="Email"
        type='email'
        // className={classes.textField}
        // value={values.name}
        // onChange={handleChange('name')}
        onChange={(e)=>this.setState({email:e.target.value})}
        margin="normal"
        variant="outlined"
      />

      <br/>

        <TextField
        id="outlined-name"
        label="Password"
        type='password'
        // className={classes.textField}
        // value={values.name}
        // onChange={handleChange('name')}
        onChange={(e)=>this.setState({password:e.target.value})}
        margin="normal"
        variant="outlined"
      />

      <br/>

      <Button variant="contained" size='small'  color='secondary' onClick={this._signinUser} >SIGN IN</Button>
 
 <br/>

 <p>Don't have an account? <Link to='/signup' >Sign up</Link></p> 
                </div>
                <br/>
                {this.state.loader &&
                <img  src={loaderImg} alt='loader' width='40' height='40' />
                }
            </div>
        );
    }
}

export default Signin;