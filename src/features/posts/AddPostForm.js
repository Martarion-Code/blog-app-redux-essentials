import { useState } from 'react'



import { postAdded } from './postSlice'
import { useDispatch, useSelector } from 'react-redux'
export const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const dispatch = useDispatch()

  const users = useSelector(state => state.users);
  const onTitleChange = (e) => setTitle(e.target.value)
  const onContentChange = (e) => setContent(e.target.value)
  const onAuthorChanged = (e) => setAuthor(e.target.value);

  function onClickSave() {
    if(title && content){
        // dispatch(postAdded({ id: nanoid(), title: title, content: content }))

         dispatch(postAdded(title, content, author));
        console.log('asdsad')
    }

    setTitle('');
    setContent('');
  }

  const usersOptions = users.map(user =>(
    <option key={user.id} value={user.id}>{user.name}</option>
  ))
  return (
    <section>
      <h2>Add new post</h2>
      <form>
        <label htmlFor="postTitle">Post Title : </label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChange}
        />
         <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={author} onChange={onAuthorChanged}>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content : </label>
        <input
          type="text"
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChange}
        />
        <button type="button" onClick={onClickSave}>
          Save Post
        </button>
      </form>
    </section>
  )
}
