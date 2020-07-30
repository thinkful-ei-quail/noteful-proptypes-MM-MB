/*Create a new component AddFolder that implements a form to capture the name
 of a new folder from the user. This form should submit the name of the new 
 folder to the POST /folders endpoint on the server. Ensure that any errors 
 are properly handled. Add a button to the navigation to invoke the new form. */


import React from 'react';

export default class AddFolder extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name:{value:'', touched: false}
        }
    };

    updateName = (name) =>{
    this.setState({name:{value: name, touched: true}});
    };
    
    validateName() {
        const {value,touched} = this.state.name;
        return ( 
            typeof value === 'string' &&
            value.length > 0 &&
            touched
        );
    };

        handleSubmit = (e) => {
        e.preventDefault()
        const {name, content, folder} = this.state;
        let newFolder= JSON.stringify(
            {
                name: name.value,
                content: content.value,
                folderId: folder.value,
                modified: new Date(date.now())
            }
        );

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: newFolder
        };

        fetch(`${config.API_ENDPOINT}/folder`, requestOptions)
        .then((res) => res.json())
        .then((res => {
            console.log(res);
            this.context.addFolder(res);
            this.props.history.push('/');
        }));
    }


      

      
    render(){
        return(
            <div>
                <form onSubmit = {(e) => this.handleSubmit(e)}>
                    <label htmlFor='new_folder'>Enter Folder Name</label>
                    <input id='name' type = 'text' className="add-folder-name-input" name="name"  
                    onChange={e => this.updateName(e.target.value)}>
                    </input>
                </form>
                <button 
                disabled = {
                    !this.validateName()}
                    type="submit"
                    className="submit-new-folder"
                   >Submit</button>
            </div>
        )
    };
}