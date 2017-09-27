import _ from 'lodash';
import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {Link} from 'react-router-dom';
import SurveyField from './SurveyField';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields.js';
class SurveyForm extends Component{
renderFields()
{
  return _.map(formFields, field=>{
    return (
    <Field key={field.name} component={SurveyField} type="text" label={field.label} name={field.name}/>
    );
  });
}

render()
{
    return(
        <div>
            <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
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
    errors.recipients= validateEmails(values.recipients||'');
    
    _.each(formFields,({name})=>
    {
        if(!values[name])
        {
            if(name==='emails')
                {
                    errors[name]='You must provide '+name;
                }
                else
                    {
            errors[name]='You must provide a '+name;
                    }
        }
    });
     return errors;
}
export default reduxForm({
    validate,
    form:'surveyForm',
    destroyOnUnmount:false
})(SurveyForm);