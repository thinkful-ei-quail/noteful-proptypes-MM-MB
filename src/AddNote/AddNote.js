import React from 'react';

export default class AddNote extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            newNote: {
                name:' ',

        }
    }
    function handleAddNote = e => {
        e.preventDefault()
        <Note props = {name,id,modified}/>
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