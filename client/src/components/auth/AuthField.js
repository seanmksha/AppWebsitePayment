//AuthField contains logic to render a single label and text input
import React from 'react';
export default  ({input, type, label, meta:{error,touched}}) =>{

    return (
        <div>
            <label>{label}</label>
           <input {...input} type={type} style={{marginBottom:'5px'}}/>
           <div className="red-text" style={{marginBottom:'20px'}}>
           {touched && error}
           </div>
        </div>

    );
};