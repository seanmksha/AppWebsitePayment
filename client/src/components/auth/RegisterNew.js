//shows register form and review
import React, {Component} from 'react';
import RegisterForm from './RegisterForm';
import RegisterFormReview from './RegisterFormReview';
import {reduxForm} from 'redux-form';
class RegisterNew extends Component{
  
    state={showFormReview:false};
renderContent()
{
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
 form:'registerForm'   
})(RegisterNew);