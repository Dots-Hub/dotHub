   import ReactQuill from "react-quill";
   import 'react-quill/dist/quill.snow.css';
   import {useState} from "react";
import { Navigate } from "react-router-dom";

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
    const[company,setCompany] = useState('');
    const[season,setSeason] = useState('');
    const[title,setTitle] = useState('');
    const[summary,setSummary] = useState('');
    const[content,setContent] = useState('');
    const[files,setFiles] = useState('');
    const[redirect,setRedirect]= useState(false);
   async function createNewPost(ev){
        ev.preventDefault();
        const data = new FormData();
        data.set('company',company);
        data.set('season',season);
        data.set('title',title);
        data.set('summary',summary);
        data.set('content',content);
        data.set('file',files[0])
       const response = await fetch('http://localhost:4000/post',{
          method: 'POST',
           body : data,
           credentials:'include',
       });
       if(response.ok){
           setRedirect(true);
       }
    }

    if(redirect){
       return <Navigate to={'/'}/>
    }
      
        return (
            <div style={{ maxWidth: '1000px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#ddd', marginRight: '10px' }}></div>
              <h1 style={{ margin: '0' }}>Share Sphere</h1>
            </div>
            <p style={{ marginBottom: '20px' }}>Your story, your dot—connect with us and inspire others</p>
            
            <form onSubmit={createNewPost}>
              <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>

                <input type="company" 
                placeholder="Company" 
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

              <ReactQuill 
              value={content}
              onChange={newValue=>setContent(newValue)}
              style={{marginTop:'20px'}}  modules={modules} formats={formats}/>

              <input type="file" 
              onChange={ev=>setFiles(ev.target.files)}
              style={{marginTop:'20px'}}/>
              <button style ={{marginTop:'20px'}}>Submit</button>
            </form>
          </div>
        );
      }
