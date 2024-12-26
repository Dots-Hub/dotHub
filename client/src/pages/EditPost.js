import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor";

export default function EditPost() {
  const { id } = useParams();
  const [company, setCompany] = useState('');
  const [season, setSeason] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    // Fetch data for the post
    fetch(`http://localhost:4000/post/${id}`)
      .then(response => response.json())
      .then(postInfo => {
        setCompany(postInfo.company);
        setSeason(postInfo.season);
        setTitle(postInfo.title);
        setSummary(postInfo.summary);
        setContent(postInfo.content);  // Assuming content is also returned from the backend
      });
  }, [id]); // Fetch data when the id changes

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set('company',company);
    data.set('season',season);
    data.set('title',title);
    data.set('summary',summary);
    data.set('content',content);
    data.set('id',id);
    if(files?.[0]){
        data.set('file',files?.[0])
    }
    // Logic for updating the post goes here
    // After successful update, you can set redirect to true
    const response= await fetch('http://localhost:4000/post',{
        method: 'PUT',
        body: data,
        credentials: 'include',
    });
    if(response.ok){
        setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/post/"+id} />;
  }

  return (
    <div className="share-sphere-container">
    <div className="share-sphere-header">
      <div className="image-shakesphere">
        <img 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLuxp51ss2loY0wpNoIF7m51NhrWi7tvXuRw&s" 
          alt="William Shakespeare Silhouette" 
          style={{ width: '100%', height: '100%', objectFit: 'cover', }} 
       />
      </div>
      <h1 className="Share-Sphere">
        Share Sphere
      </h1>
    </div>
    <p className="tag-line">
      "Your story, your dot—connect with us and inspire others."
    </p>

    
      <form onSubmit={updatePost}>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
          <input className="placeholder"
            type="text"
            placeholder="Company"
            value={company}
            onChange={ev => setCompany(ev.target.value)}
          />
          <input className="placeholder"
            type="text"
            placeholder="Season"
            value={season}
            onChange={ev => setSeason(ev.target.value)}
            
          />
        </div>

        <input className="placeholder"
          type="text"
          placeholder="Title"
          value={title}
          onChange={ev => setTitle(ev.target.value)}
          
        />

        <input className="placeholder"
          type="text"
          placeholder="Summary"
          value={summary}
          onChange={ev => setSummary(ev.target.value)}
        />

        <Editor value={content} onChange={setContent} />

        <input
          type="file"
          onChange={ev => setFiles(ev.target.files)}
          style={{ marginTop: '20px' }}
        />
        <button style={{ marginTop: '20px' }}>Update Post</button>
      </form>
    </div>
  );
}
