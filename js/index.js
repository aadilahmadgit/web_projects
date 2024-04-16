const express = require("express")
const app = express()
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

const port = 2525;

const path  = require("path")
app.use(express.urlencoded( { extended: true })) // parse URL-
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))

app.use(express.static(path.join(__dirname, "public")))

let Post = [
{id:uuidv4(),username:"aadil Ahmad",content:"hard is the key to success"},
{id:uuidv4(),username:"jack",content:"smile is power of good life"},
{id:uuidv4(),username:"rakesh roshan",content:"movie is my half life"}]

//------------------------------ROUTES------------------------
app.get('/posts',(req,res)=>{
    res.render("index.ejs",{Post})
})
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
})
app.post("/posts",(req,res)=>{
    let {username,content} =req.body
    let id = uuidv4()
    Post.push({id,username,content})
    res.redirect("/posts")
})
app.get("/posts/:id",(req,res)=>{
    let {id}= req.params
    let posts = Post.find((p)=>id===p.id)
   res.render("show.ejs",{posts})
})


app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params
    let newContent = req.body.content
    let post = Post.find(p=> p.id === id )
    post.content = newContent
    res.redirect("/posts")
})

app.get("/posts/:id/edit",(req,res)=>{
    let {id}= req.params
    let post = Post.find(x=> x.id === id )
    
    res.render("edit.ejs",{post});
        
    }
)
app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params
    Post= Post.filter(p => p.id !== id);
    res.redirect("/posts");
})







app.listen(port)