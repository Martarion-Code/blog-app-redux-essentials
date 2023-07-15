import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'

import PostList from './features/posts/PostList'
import { AddPostForm } from './features/posts/AddPostForm'
import SinglePostPage from './features/posts/SinglePostPage'
import EditPostForm from './features/posts/EditPostForm'
function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              // <section>
              //   <h2>Welcome to the Redux Essentials example app!</h2>
              // </section>
              <>
                <AddPostForm></AddPostForm>
                <PostList />
              </>
            )}
          />
          <Route exact path="/posts/:postId" component={SinglePostPage}></Route>
          <Route exact path="/edit/:postId" component={EditPostForm}></Route>
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
