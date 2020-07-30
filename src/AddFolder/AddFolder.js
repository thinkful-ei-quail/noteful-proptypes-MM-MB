/*Create a new component AddFolder that implements a form to capture the name
 of a new folder from the user. This form should submit the name of the new 
 folder to the POST /folders endpoint on the server. Ensure that any errors 
 are properly handled. Add a button to the navigation to invoke the new form. */


import React from 'react';

export default class AddFolder extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            folder:''
        }
    };
    function handleAddFolder = e => {
        e.preventDefault()
        let formData = new FormData();

        let requestOptions = {
            method: 'POST',
            body: formData,
        };

        fetch(`${config.API_ENDPOINT}/folders`, requestOptions)
        .then(res =>{
            if(!res.ok)
                return res.json().then(e => Promise.reject(e))
            return res.json()
        })
        .then(res => {
            this.context.addFolder(folder.id)
        })
        .catch(error => {
            console.error({error})
        })
    };
    render(){
        return(
            <div>
                <form>
                    <label htmlFor='new_folder'>Enter Folder Name</label>
                    <input id='new-folder' type = 'text' value='this.state.folder.value'
                    onChange={e => this.setState(e.target.value)}>
                    </input>
                </form>
                <button onClick={e => this.handleAddFolder()}>Submit</button>
            </div>
        )
    };
}