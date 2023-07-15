import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import PostAuthor from '../users/PostAuthor'
import { TimeAgo } from './TimeAgo'
import ReactionButton from './ReactionButton'


function SinglePostPage({ match }) {
  const { postId } = match.params

  const post = useSelector((state) =>
    state.posts.find((post) => post.id === postId)
  )

  
  if (!post) {
    return (
      <section>
        <h2>Post Not Found!</h2>
      </section>
    )
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <PostAuthor userId={post.id}></PostAuthor>
        <TimeAgo timestamp = {post.date}></TimeAgo>
        <p className="post-content">{post.content}</p>
        <ReactionButton post={post}></ReactionButton>
        <Link to={`/edit/${post.id}`} className="button">
            Edit Post
        </Link>
      </article>
    </section>
  )
}

export default SinglePostPage