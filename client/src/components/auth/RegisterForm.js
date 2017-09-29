import _ from 'lodash';
import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {Link} from 'react-router-dom';
import AuthField from './AuthField';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import validateEmails from '../../utils/validateEmails';
import authFields from './authFields.js';
class RegisterForm extends Component{
renderFields()
{
  return _.map(authFields, field=>{

    return (
    <Field key={field.name} component={AuthField} type={field.type} label={field.label} name={field.name}/>
    );
  });
}

render()
{
    return(
        <div>
            <form onSubmit={this.props.handleSubmit(this.props.onRegisterSubmit)}>
            {this.renderFields()}
            <Link to="/surveys" className="red btn-flat white-text">
                Cancel
            </Link>
            <button type ="submit" className="teal btn-flat right white-text"> 
                Next
                <i className="material-icons right">done</i>
                </button>
            </form>
        </div>
    );
    }
}

function validate(values)
{
    const errors={};
    errors.email= validateEmails(values.email||'');
    if(values.password!=values.password2)
        {
            errors['password']='The password you inputted does not match your confirmation password';
        }
    _.each(authFields,({name})=>
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
    form:'registerForm',
    destroyOnUnmount:false
})(RegisterForm);