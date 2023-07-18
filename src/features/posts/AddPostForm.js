import { useState } from 'react'



import { addNewPost } from './postSlice'
import { useDispatch, useSelector } from 'react-redux'
export const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')
  
  const onTitleChange = (e) => setTitle(e.target.value)
  const onContentChange = (e) => setContent(e.target.value);
  const onUserIdChanged = (e) => setUserId(e.target.value);
  const [addRequestStatus, setAddRequestStatus] = useState('idle')
  
  const dispatch = useDispatch()
  const users = useSelector(state => state.users);
  
  //before using thunk
  // function onClickSave() {
  //   if(title && content){
  //       // dispatch(postAdded({ id: nanoid(), title: title, content: content }))
  //        dispatch(addNewPost({title, content, user: userId}));
  //       console.log('asdsad')
  //   }

  //   setTitle('');
  //   setContent('');
  // }
  
  async function onSavePostClicked(){
    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle'
    if(canSave){
      try {
        setAddRequestStatus('pending');
        await dispatch(addNewPost({title, content, user:userId})).unwrap()
        setTitle('');
        setContent('');
        setUserId('');
      } catch (err) {
        console.error('Failed to save the post: ', err);
      }finally{
        setAddRequestStatus('idle');
      }
    }
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
         <label htmlFor="postuserId">Author:</label>
        <select id="postuserId" value={userId} onChange={onUserIdChanged}>
          <option value=""></option>
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
        <button type="button" onClick={onSavePostClicked}>
          Save Post
        </button>
      </form>
    </section>
  )
}
