import _ from 'lodash';
import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';

import AuthField from '../AuthField';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import validateEmails from '../../../utils/validateEmails';
import verifyFields from './verifyFields.js';

class LoginForm extends Component{
    state={showFormReview:false};
renderFields()
{
  return _.map(loginFields, field=>{

    return (
    <Field key={field.name} component={AuthField} type={field.type} label={field.label} name={field.name}/>
    );
  });
}

render()
{
    return(
        <div>
            <form onSubmit={this.props.handleSubmit(this.props.onLoginSubmit)}>
            {this.renderFields()}
            
           
            </form>
        </div>
    );
    }
}

function validate(values)
{
    const errors={};
   
    _.each(loginFields,({name})=>
    {
        if(!values[name])
        {
            /*if(name==='emails')
                {
                    errors[name]='You must provide '+name;
                }
                else
                    {*/
            errors[name]='You must provide a '+name;
                  //  }
        }
    });
     return errors;
}
export default reduxForm({
    validate,
    form:'verifyForm',
    destroyOnUnmount:false
})(VerifyEmailForm);