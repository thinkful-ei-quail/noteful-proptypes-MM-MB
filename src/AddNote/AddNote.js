import React from 'react';
import {link, withRouter } from 'react-router-dom;'
import { FontAwesomeIcon } from '@fontawesome/react-fontawsome';
import ApiContext from '../ApiContext';
import config from '../config';
import CircleButton from '../CircleButton/CircleButton';

export default class AddNote extends React.Component{
    static contextType = ApiContext;
    constructor(props){
        super(props)
        this.state = {
                name:{value:'', touched: false},
                content: {value:'', touched: false},
                folder: {value: ''}

        }
    }
    updateName = (name) =>{
    this.setState({name:{value: name, touched: true}});
    }
    upDateContent = (content) => {
        this.setState({ content: { value: content, touched: true}});
    }
    updateFolder = (id) => {
        this.setState({folder: {value: id}});
    }
    renderFolderSelection = () => {
        return this.context.folders.map((folder) => {
            return <option key={folder.id} value={folder.id}>{folder.name}</option>;
        });
    };

    validateName() {
        const {value,touched} = this.state.name;
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const {name, content, folder} = this.state;
        let formNote = JSON.stringify(
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
            body: formNote
        };

        fetch(`${config.API_ENDPOINT}/notes`, requestOptions)
        .then((res) => res.json())
        .then((res => {
            console.log(res);
            this.context.addNote(res);
            this.props.history.push('/');
        });
    }
    render(){
        return(
            <div>
                <form>
                    <input id='new_note' type='text' value={this.state.value}
                    onChange={e => this.setState(e.target.value)}>
                    </input>
                </form>
                <button>submit</button>
            </div>
        )
    }
}