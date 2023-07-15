import React from 'react'

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom/cjs/react-router-dom';
import PostAuthor from '../users/PostAuthor';
import { TimeAgo } from './TimeAgo';
import ReactionButton from './ReactionButton';

function PostList() {
    const posts = useSelector(state => state.posts);
    const orderedPosts = posts.slice().sort((a,b) => b.date.localeCompare(a.date))
    const renderedPost = orderedPosts.map(post =>(
        <article className='post-excerpt' key={post.id}>
            <h3>{post.title}</h3>
            <PostAuthor userId={post.user}></PostAuthor>
            <TimeAgo timestamp = {post.date}></TimeAgo>
            <p className='post-content'>{post.content.substring(0,100)}</p>
            <ReactionButton post={post}></ReactionButton>
            <Link to={`/posts/${post.id}`} className="button muted-button">View Post</Link>
        </article>
    ))
  return (
    <section className='posts-list'>
        <h2>Posts</h2>
        {renderedPost}
    </section>
  )
}

export default PostList