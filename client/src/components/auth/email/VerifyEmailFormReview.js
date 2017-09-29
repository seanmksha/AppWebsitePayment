import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import formFields from './authFields';
import {withRouter} from 'react-router-dom';
import {Link} from 'react-router-dom';
import * as actions from '../../actions';
const VerifyEmailFormReview = ({ onCancel, formValues,error, submitLogin, history }) => {

    

    return(
        <div>
        <div className="red-text" style={{marginBottom:'20px'}}>
                 {error &&
                    <div className="red-text" style={{marginBottom:'20px'}}>
                        Error: {error}
                    </div>
                }
           
        </div>
        <div >
            <Link to="/surveys" className="red btn-flat white-text">
                Cancel
            </Link>
          
           
            <button
            onClick={()=>submitLogin(formValues, history)}
             className="green btn-flat right white-text">
                Login User
                <i className="material-icons right">email</i>
            </button>
        </div>
        </div>
    );
};
function mapStateToProps(state){
    console.log(state);
   
    return{
        error:state.error,
        formValues:state.form.loginForm.values};
}
export default connect(mapStateToProps,actions) (withRouter(VerifyEmailFormReview));