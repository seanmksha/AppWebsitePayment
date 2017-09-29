//shows register form and review
import React, {Component} from 'react';
import VerifyEmailForm from './VerifyEmailForm';

import {reduxForm, formValues} from 'redux-form';
import * as actions from '../../../actions';
import VerifyEmailFormReview from './VerifyEmailFormReview';
class VerifyEmailNew extends Component{
  
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