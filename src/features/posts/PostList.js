import React from 'react'
import {Spinner} from '../../components/Spinner';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom/cjs/react-router-dom';
import PostAuthor from '../users/PostAuthor';
import { TimeAgo } from './TimeAgo';
import ReactionButton from './ReactionButton';
import { fetchPosts, selectAllPosts } from './postSlice';
import { useEffect } from 'react';

const PostExcerpt = ({post}) =>{

  return (
    <article className="post-excerpt">
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user}>

        </PostAuthor>
        <TimeAgo timestamp={post.date}></TimeAgo>
      </div>
      <p className='post-content'>{post.content.substring(0, 100)}</p>
      <ReactionButton post={post}></ReactionButton>
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  )
}

function PostList() {
  const dispatch = useDispatch();
    const posts = useSelector(selectAllPosts);
    const postStatus = useSelector(state => state.posts.status);
    const error = useSelector(state => state.posts.error);
    useEffect(() => {
      if(postStatus === 'idle'){
        dispatch(fetchPosts());
      }
    }, [postStatus, dispatch]);
    
    let content;
    if(postStatus ==='loading'){
      content = <Spinner text="Loading..."></Spinner>
    }else if(postStatus === 'succeded'){
      const orderedPosts = posts.slice().sort((a,b) => b.date.localeCompare(a.date))
      content = orderedPosts.map(post =>(
         <PostExcerpt key={post.id} post={post}/>
      ))
    }else if(postStatus ==='error'){
      content = <div>{error}</div>
    }
  
  return (
    <section className='posts-list'>
        <h2>Posts</h2>
        {content}
    </section>
  )
}

export default PostList