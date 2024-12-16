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
    <div style={{ 
      maxWidth: '1000px', 
      margin: '0 auto', 
      fontFamily: 'Arial, sans-serif', 
      padding: '20px',
      backgroundColor: '#f4f8fb',
      borderRadius: '12px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginBottom: '20px',
      }}>
        <div style={{ 
          width: '60px', 
          height: '60px', 
          borderRadius: '50%', 
          overflow: 'hidden', 
          marginRight: '10px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        }}>
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLuxp51ss2loY0wpNoIF7m51NhrWi7tvXuRw&s" 
            alt="William Shakespeare Silhouette" 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
            }} 
          />
        </div>
        <h1 style={{ 
          margin: '0', 
          fontSize: '2.5rem', 
          color: '#333', 
          fontWeight: '700',
          letterSpacing: '0.5px',
        }}>
          Share Sphere
        </h1>
      </div>
      <p style={{ 
        marginBottom: '20px', 
        fontSize: '1.2rem', 
        color: '#555', 
        lineHeight: '1.6', 
        fontStyle: 'italic',
      }}>
        "Your story, your dot—connect with us and inspire others."
      </p>

      <form onSubmit={updatePost}>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Company"
            value={company}
            onChange={ev => setCompany(ev.target.value)}
            style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <input
            type="text"
            placeholder="Season"
            value={season}
            onChange={ev => setSeason(ev.target.value)}
            style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={ev => setTitle(ev.target.value)}
          style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />

        <input
          type="text"
          placeholder="Summary"
          value={summary}
          onChange={ev => setSummary(ev.target.value)}
          style={{ marginTop: '20px', flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
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
