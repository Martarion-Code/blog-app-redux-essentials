import React from 'react'
import { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { postUpdated } from './postSlice'
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

function EditPostForm( {match}) {
  const postId = match.params.postId;
  const post = useSelector((state) =>
    state.posts.find((post) => post.id === postId)
  )

  const dispatch = useDispatch()
    const history = useHistory();
//   if (!post) {
//     return (
//       <section>
//         <h2>Post Not Found!</h2>
//       </section>
//     )
//   }
  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)
  const onTitleChange = (e) => setTitle(e.target.value)
  const onContentChange = (e) => setContent(e.target.value)

  function onClickSave() {
    if (title && content) {
      dispatch(postUpdated({ id: postId, title: title, content: content }))
      history.push(`/posts/${post.id}`);
    }
  }

  return (
    <section>
      <h2>Edit new post</h2>
      <form>
        <label htmlFor="postTitle">Post Title : </label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChange}
        />
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

export default EditPostForm
