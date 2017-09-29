//shows register form and review
import React, {Component} from 'react';
import LoginForm from './LoginForm';

import {reduxForm, formValues} from 'redux-form';
import * as actions from '../../actions';
import LoginFormReview from './LoginFormReview';
class LoginNew extends Component{
  
    state={showForm:false};
renderContent()
{
   // if(this.state.showForm)
    //{
       /* return(
            
    <LoginForm
        onLoginSubmit={()=>{this.setState({showForm:false})}}
        />
        );*/
        if(!this.props.auth)
            {
        return(
        <div>
            <LoginForm
            onLoginSubmit={()=>this.setState({showForm:true})}
             />
             <LoginFormReview
             onCancel={()=>this.setState({showForm:false})}
                />;
            </div>
        );
    }
    return (
    <div>

    </div>
    );
    //}
    /*

     if(this.state.showFormReview)
    {
        return <RegisterFormReview
        onCancel={()=>this.setState({showFormReview:false})}
        />;
    }
   return(
        <RegisterForm
        onRegisterSubmit={()=>this.setState({showFormReview:true})}
         />
   );*/
   
}
render()
{
    return(
        <div>
        { this.renderContent()}
  </div>
    );
}
}


export default reduxForm({
 form:'loginForm'   
})(LoginNew);