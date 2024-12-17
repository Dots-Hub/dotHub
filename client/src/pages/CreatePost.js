   import ReactQuill from "react-quill";
   import 'react-quill/dist/quill.snow.css';
   import {useState} from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";

   const modules = {
    toolbar: [
      // Formatting options
      [{ header: [1, 2, 3, false] }], // Header levels
      ['bold', 'italic', 'underline', 'strike'], // Text formatting
      [{ color: [] }, { background: [] }], // Text color and background color
      [{ script: 'sub' }, { script: 'super' }], // Subscript/superscript
      [{ list: 'ordered' }, { list: 'bullet' }], // Lists
      [{ indent: '-1' }, { indent: '+1' }], // Indentation
      [{ align: [] }], // Text alignment
  
      // Media
      ['image', 'video'], // Insert images and videos
  

      // Clear formatting
      ['clean'], // Remove all formatting
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'color',
    'background',
    'script',
    'list',
    'bullet',
    'indent',
    'align',
    'image',
    'video',
  ];
     
export default function CreatePost() {
  const [company, setCompany] = useState('');
  const [season, setSeason] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState('');

  async function createNewPost(ev) {
    ev.preventDefault();
    setError('');

    // Validation checks
    if (!company.trim()) {
      setError('Company field is required');
      return;
    }
    if (!season.trim()) {
      setError('Season field is required');
      return;
    }
    if (!title.trim()) {
      setError('Title field is required');
      return;
    }
    if (!summary.trim()) {
      setError('Summary field is required');
      return;
    }
    if (!content.trim()) {
      setError('Content field is required');
      return;
    }
    if (!files || files.length === 0) {
      setError('Please upload a photo of the company');
      return;
    }

    try {
      const data = new FormData();
      data.set('company', company.trim());
      data.set('season', season.trim());
      data.set('title', title.trim());
      data.set('summary', summary.trim());
      data.set('content', content);
      data.set('file', files[0]);

      const response = await fetch('http://localhost:4000/post', {
        method: 'POST',
        body: data,
        credentials: 'include',
      });

      if (response.ok) {
        setRedirect(true);
      } else {
        // Handle server errors
        const errorData = await response.json();
        setError(errorData.message || 'An error occurred while creating the post');
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
      console.error('Post submission error:', err);
    }
  }


    if(redirect){
       return <Navigate to={'/'}/>
    }
      
        return (
          /*<div style={{ maxWidth: '1000px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#ddd', marginRight: '10px' }}></div>
              <h1 style={{ margin: '0', alignItems: 'center' }}>Share Sphere</h1>
            </div>
            <p style={{ marginBottom: '20px'  }}>Your story, your dot—connect with us and inspire others</p>   */

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
            
            
              {error && (
        <div style={{
          backgroundColor: '#ffdddd',
          color: '#ff0000',
          padding: '10px',
          borderRadius: '5px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}














            <form onSubmit={createNewPost}>
              <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>

                <input type="company" 
                placeholder="Company*" 
                value = {company}
                onChange={ev=>setCompany(ev.target.value)}
                style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />

                <input type="season" 
                placeholder="Season" 
                value={season}
                onChange={ev=>setSeason(ev.target.value)}
                style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
              </div>

              <input type="title" 
              placeholder="Title" 
              value = {title}
              onChange={ev=>setTitle(ev.target.value)}
              style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}/>

              <input type="summary" 
              placeholder="Summary" 
              value={summary}
              onChange={ev=>setSummary(ev.target.value)}
              style={{marginTop:'20px', flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}/>

              
              <Editor value={content} onChange={setContent} />

              <input type="file" 
              onChange={ev=>setFiles(ev.target.files)}
              style={{marginTop:'20px'}}/>
              <button style ={{marginTop:'20px'}}>Submit</button>
            </form>
          </div>
        );
      }
