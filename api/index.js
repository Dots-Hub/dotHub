const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer  = require('multer');
const uploadMiddleWare = multer({ dest: 'uploads/' });
const fs = require('fs');
const path = require('path');


const salt = bcrypt.genSaltSync(10);
const secret = 'asjddjfj1k3ckdl';

app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads',express.static(__dirname+'/uploads'));

mongoose.connect('mongodb+srv://dotHub:dotHub123@cluster0.xs1wm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

// Correcting the route definition
app.post('/register', async (req, res) => {
    const{username,password} = req.body;
    try{
        const userDoc = await User.create({
            username,
            password: bcrypt.hashSync(password,salt),
        });
        res.json(userDoc);
    }
    catch(e)
    {
        console.log(e);
         res.status(400).json(e);
    }
});

app.post('/login',async (req,res) => {
    const {username,password} = req.body;
    const userDoc = await User.findOne({username});
    const passOk =bcrypt.compareSync(password, userDoc.password);
    if(passOk)
    {
       //logged in
       jwt.sign({username,id:userDoc._id},secret, {}, (err,token) =>{
          if (err) throw (err);
          res.cookie('token',token).json({
             id:userDoc._id,
             username,
          });
       });
    }else{
        res.status(400).json('wrong credentials');
    }
});

//profile
app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token,secret,{},(err,info)=>{
         if (err) throw err;
         res.json(info);
    });
  });
//logout
app.post('/logout', (req, res) => {
    res.cookie('token','').json('ok');
});


//post
app.post('/post', uploadMiddleWare.single('file'), async (req,res) =>{
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length-1];
    const newPath = path+'.'+ext;
    fs.renameSync(path,newPath);

    const {token} = req.cookies;
    jwt.verify(token,secret,{},async (err,info)=>{
        if (err) throw err;
        const{company,season,title,summary,content} = req.body;
        const postDoc = await  Post.create({
            company,
            season,
            title,
            summary,
            content,
            cover: newPath,
            author: info.id,
     
         });
        res.json(postDoc);
   });

});

app.put('/post', uploadMiddleWare.single('file'), async (req, res) => {
    let newPath = null;
  
    // Handle file upload and renaming
    if (req.file) {
      const { originalname, path } = req.file;
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      newPath = path + '.' + ext;
  
      try {
        fs.renameSync(path, newPath);
      } catch (err) {
        console.error('Error renaming file:', err);
        return res.status(500).json({ error: 'File processing error' });
      }
    }
  
    // Verify JWT
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) {
        console.error('JWT verification failed:', err);
        return res.status(401).json({ error: 'Unauthorized access' });
      }
  
      // Extract post data
      const { company, season, title, summary, content, id } = req.body;
  
      // Find the post
      const postDoc = await Post.findById(id);
      if (!postDoc) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      // Check if the user is the author
      const isAuthor = postDoc.author.equals(info.id);
      if (!isAuthor) {
        return res.status(403).json({ error: 'You are not the author of this post' });
      }
  
      // Update the post
      postDoc.company = company;
      postDoc.season = season;
      postDoc.title = title;
      postDoc.summary = summary;
      postDoc.content = content;
  
      if (newPath) {
        postDoc.filePath = newPath; // Update file path if applicable
      }
  
      await postDoc.save();
  
      res.json(postDoc);
    });
  });
  


app.get('/post',async (req,res) =>{
     res.json(
        await Post.find()
     .populate('author',['username'])
     .sort({createdAt: -1})
     .limit(20)
     );
});

app.get('/post/:id',async (req,res) =>{
    const {id} = req.params;
    const postDoc = await Post.findById(id).populate('author',['username']);
    res.json(postDoc);
})

// Starting the server
app.listen(4000, () => {
    console.log('Server is running on port 4000');
});


//dotHub123