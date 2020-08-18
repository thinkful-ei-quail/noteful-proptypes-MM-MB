import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import NotePageMain from './NotePageMain'

describe(`NotePageMain component`, () => {
  const props = {
    match:{
      params: {"noteId": "cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1"}
    },
    note: {
      "id": "cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1",
      "name": "Dogs",
      "modified": "2019-01-03T00:00:00.000Z",
      //"folderId": "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
      "content": "Corporis accusamus placeat.\n \rUnde."
    }
  }

  it('renders a .NotePageMain by default', () => {
    const wrapper = shallow(<NotePageMain {...props}/>)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders a Note with note prop', () => {
    const note = shallow(<NotePageMain {...props} />)
      .find('Note')
    expect(toJson(note)).toMatchSnapshot()
  })

  it(`splits the content by \\n or \\n\\r, with a p foreach`, () => {
    [{
      ...props,
      note: { ...props.note, "content": "Content with n r.\n \rafter n r." }
    }, {
      ...props,
      note: { ...props.note, "content": "Content with n.\nafter." }
    }].forEach(props => {
      const content = shallow(<NotePageMain {...props} />)
        .find('NotePageMain__content')
      expect(toJson(content)).toMatchSnapshot()
    })
  })
})
