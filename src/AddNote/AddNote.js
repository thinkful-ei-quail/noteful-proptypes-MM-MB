import React from 'react';

export default class AddNote extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            newNote: {
                name:' ',

        }
    }
    function handleAddFolder = e => {
        e.preventDefault()
        let formData = new FormData();

        let requestOptions = {
            method: 'POST',
            body: formData
        };

        fetch(`${config.API_ENDPOINT}/notes`, requestOptions)
        .then(res =>{
            if(!res.ok)
                return res.json().then(e => Promise.reject(e))
            return res.json()
        })
        .then(res => {
            this.context.AddNote(note.id)
        })
        .catch(error => {
            console.error({error})
        })
    };
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