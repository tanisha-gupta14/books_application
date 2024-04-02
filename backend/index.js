import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'
const app= express()
const db=mysql.createPool({
    host:"localhost",
    user:"root",
    password:"Tanisha@2005",
    database:"test"
})


app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.json("hello this is backend")
})

app.get("/books",(req,res)=>{
    const q=" SELECT * FROM books"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
   
    })
})

app.delete("/books/:id",(req,res)=>{
    const bookId=req.params.id;
    const q="DELETE FROM books WHERE id=?"

    db.query(q,[bookId],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Book has been deleted successfully");
    })
});


app.put("/books/:id",(req,res)=>{
    const bookId=req.params.id;
    const q="UPDATE books SET `title`=?, `desc`=?,`price`=?,`cover`=? WHERE id=?";

    const values=[
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ]

    db.query(q,[...values,bookId],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Book has been updated successfully");
    });
});
app.post("/books",(req,res)=>{
    const q=" INSERT INTO books (`title`,`desc`,`price`,`cover`) VALUES(?)"
    //const values=["title from backend ","desc from backend","cover pic from backend"]
    const values=[
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,

    ];
    db.query(q,[values],(err,data)=>{
        return res.json("book has been created sucessfully");
    })
})
app.listen(8800,()=>{
    console.log("connected to backend  ");
})