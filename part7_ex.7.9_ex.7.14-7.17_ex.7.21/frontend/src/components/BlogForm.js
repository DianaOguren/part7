import React from "react";
import { useState } from 'react';

const BlogForm = ({ addBlog }) => {
  const [newAuthor, setNewAuthor] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newUnvotes, setNewUnvotes] = useState('');

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  } 

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleUnvotesChange = (event) => {
    setNewUnvotes(event.target.value)
  }

  const addonSubmit = (event) => {
    event.preventDefault()
    addBlog({ author: newAuthor,
      title: newTitle,
      url: newUrl,
      likes: newUnvotes,
    })

    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')
    setNewUnvotes('')
  }

  return (
    <div className="blogForm">
      <h2>Create new</h2>
      <form onSubmit={addonSubmit}>
        <div>
          <span>Title:</span> 
          <input
            value={newTitle}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <span>Author:</span> 
          <input
            value={newAuthor}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          <span>URL:</span> 
          <input 
            value={newUrl} 
            onChange={handleUrlChange} />
        </div>
        <div>
          <span>Likes:</span> 
          <input
            value={newUnvotes}
            onChange={handleUnvotesChange}
          />
        </div>
        <div>
          <button id="addbutton" type="submit">
            add
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
