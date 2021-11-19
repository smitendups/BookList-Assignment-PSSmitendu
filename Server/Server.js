const express=require('express');
const app=express();
const fs=require('fs');
 let data=fs.readFileSync('database.json');
 let books=JSON.parse(data);
const path=require('path');
app.use(express.json());
app.use(function(req,res,next){
    res.header('Access-Control-allow-Origin',"*");
    res.header("Access-Control-allow-Methods",'GET,POST,PUT,DELETE');
    res.header("Access-Control-allow-Headers",'Content-Type');
    next();
})

 app.get('/',(req,res)=>{
     res.send("hello");
 })
 app.get('/api/books',(req,res)=>{
      res.send(books);
 })
 app.get('/api/books/:id',(req,res)=>{
   let book= books.find(c=>{ return c.id === parseInt(req.params.id)});
   if(!book){

       res.status(404).send('book is not present');
   }
   else{
       res.send(book);
   }
})
app.post('/api/books',(req,res)=>{
    const book=books.find(c=>{
        return c.id === parseInt(req.body.id)
     });
     if(!book){
        const book={
            id:parseInt(req.body.id),
            name:req.body.name,
            author:req.body.author
            
        };
        books.push(book);
        var data=JSON.stringify(books);
        fs.writeFileSync('database.json',data);
        res.send(books);
     }
     else{
        res.status(404).send('book is present'); 
     }
    
 })

 app.put('/api/books/:id',(req,res)=>{
     const book=books.find(c=>{
        return c.id === parseInt(req.params.id)
     });
    
     if(!book){
        res.status(404).send('book is not present');
     }else{
        const index=books.indexOf(book);
         book.id=parseInt(req.body.id);
        book.name=req.body.name;
        book.author=req.body.author;
        books.splice(index,1,book);
        var data=JSON.stringify(books);
        fs.writeFileSync('database.json',data);
        res.send(book);
     }
    
 })

 app.delete('/api/books/:id',(req,res)=>{
    
 const book=books.find(c=>{
       
        return  c.id === parseInt(req.params.id)
       
     });
     const index=books.indexOf(book);
    books.splice(index,1);
    var data=JSON.stringify(books);
    fs.writeFileSync('database.json',data);
    res.send(books);
   
   
 })
 app.listen(3000,()=>{console.log('server is running at 3000')});