import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS,LOGIN_ERROR} from './types';
export const fetchUser= ()=>
 async function(dispatch){
       const res=await axios.get('/api/current_user');
       dispatch({type:FETCH_USER, payload:res.data});
    };

export const handleToken = (token)=>
async function(dispatch){
    const res= await axios.post('/api/stripe', token);
    dispatch({type:FETCH_USER,payload:res.data});
};

export const submitSurvey = (values, history)=>
async function(dispatch){
    const res= await axios.post('/api/surveys', values);
    history.push('/surveys');
    dispatch({type:FETCH_USER, payload:res.data});  
};

export const fetchSurveys=()=>
async function (dispatch){
    const res = await axios.get('/api/surveys');
    dispatch({type:FETCH_SURVEYS,payload:res.data});
}

//
export const submitRegister = (values, history)=>
async function(dispatch){
    const res = await axios.post('/api/register',values);
    history.push('/login');
    dispatch({type:FETCH_USER, payload:res.data});
};

export const submitLogin =  (values, history)=>
async function(dispatch){
    console.log('login called');
    
    const res = await axios.post('/api/login',values);
    console.log(res.data.status);
    if(res.data.status!="fail")
        {
            dispatch({type:FETCH_USER, payload:res.data});
            history.push('/surveys');
        }
        else
            {
                dispatch({type:LOGIN_ERROR,error:res.data.message});
            }
        
    
};