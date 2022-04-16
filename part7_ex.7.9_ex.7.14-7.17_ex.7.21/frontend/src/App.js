import { useState, useEffect } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import ErrorNotification from './components/ErrorNotification';
import SuccessNotification from './components/SuccessNotification'
import usersService from './services/users';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import { useRef } from 'react';

import {
  Routes,
  Route,
  Link,
  useNavigate,
  useMatch,
} from 'react-router-dom';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null)

  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loguser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const navigate = useNavigate()
  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loguser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
      usersService.getAll().then((users) => setUsers(users))
      setUser(user)
      setUsername('')
      setPassword('')
      navigate('/')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const logoutUser = async () => {
    window.localStorage.removeItem('loguser')
    document.location.reload()
  }

//Menu
  const Menu = () => {
    const padding = {
      padding: '10px'
    }
    return (
      <div>
        <div className='menuStyle'>
          <Link style={padding} to="/">blogs</Link>
          <Link style={padding} to="/users">users</Link>
          <span style={padding}>{user.name} logged in <button onClick={() => logoutUser()}>logout</button></span>
        </div>
        <h2 style={padding}>Blog App</h2>
        <SuccessNotification message={successMessage}/>
      </div>
    )
  }

//Component for showing all users
  const ShowUsers = ({ users }) => {
    const tdStyle = {
      width: '80px'
    }
    return (
      <div className='container1'>
        <h2>Users</h2>
        <table>
          <thead>
            <tr>
              <th> </th>
              <th>blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.name}>
                <td style={tdStyle}><Link to={`/users/${user.id}`}>{user.username}</Link></td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

//Match address
  const match = useMatch('/users/:id')
  const listuser = match ? users.find(user => user.id === match.params.id) : null

//Componet for showing blogs of one user 
  const UserBlogs = ( {listuser} ) => {
    if (!listuser) {
      return null
    } else {return (
      <div className='container1'>
        <h1>{listuser.username}</h1>
        <h3>added blogs</h3>
        <ul>
          {listuser.blogs.map(blog =>
          <li key={blog.id}>{blog.title}</li>   
        )}
        </ul>
        
      </div>
    )}
  }

//Add blog function
  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog))
      setSuccessMessage(
        `A new blog '${blogObject.title}' by ${blogObject.author} is added to the list`
      )
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    })
  } 

//Component for listing all blogs
  const AllBlogs = ( {blogs, blogFormRef} ) => {
    
    return (
      <div>
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <BlogForm blogs={blogs} addBlog={addBlog}/>
        </Togglable>
        
        <ul>
          {blogs.map(blog =>
          <li className='blogsStyle' key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li>   
        )}
        </ul>
        
      </div>
    )
  }

//Function for increasing likes
  const handleincreaseLike = (blog) => {
    const blogtoChange = blogs.find((n) => n.title === blog.title)
    const changedBlog = { ...blogtoChange, likes: blog.likes + 1 }
    blogService.update(changedBlog.id, changedBlog)
    setBlogs(
      blogs.map((blog) =>
        blog.title !== changedBlog.title ? blog : changedBlog
      )
    )
    setSuccessMessage(`Likes of ${changedBlog.title} are increased`)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000) 
  }

//Match address
const match2 = useMatch('/blogs/:id')
const myBlog = match2 ? blogs.find(blog => blog.id === match2.params.id) : null

//Component for showing one blog
  const OneBlog = ( {myBlog} ) => {
    return (
      <div className='container1'>       
        <h2>{myBlog.title}</h2>
        <p><a href={myBlog.url}>{myBlog.url}</a></p>
        <p>{myBlog.likes} likes
          <button id="likebutton" onClick={() => handleincreaseLike(myBlog)}>
            Like
          </button>
        </p>
        <p>added by {myBlog.author}</p>
      </div>
    )
  }

  if (user === null) {
    return (
      <div>
        <ErrorNotification message={errorMessage}/>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div>
    )
    } else {
      return (
        <div>
        <Menu />

        <Routes>
          <Route path="/users/:id" element={<UserBlogs listuser={listuser}/>} />
          <Route path="/blogs/:id" element={<OneBlog myBlog={myBlog}/>} />  
          <Route path="/users" element={<ShowUsers users={users}/>} />
          <Route path="/" element={<AllBlogs blogs={blogs} blogFormRef={blogFormRef}/>} />
        </Routes>
      </div>
    )}  
}

export default App
