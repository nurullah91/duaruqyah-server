const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const port = process.env.PORT || 5000;
const cors = require('cors');
const app = express();


// SQLite database connection
const database = new sqlite3.Database('./dua_main.sqlite');


// middleware
app.use(express.json());
app.use(cors());

// Home
app.get('/', (req, res)=>{
    res.send("Dua zone is running...")
})


// API's
// Category api
app.get('/api/categories', (req, res)=> {
    database.all('SELECT * FROM category', (err, rows) => {
        if(err){
            res.status(500).json({error:err.message});
            return;
        }
        res.json(rows);
    })
})

// Sub category api
app.get('/api/subcategories', (req, res)=>{
    database.all('SELECT * FROM sub_category', (err, rows) =>{
        if(err){
            res.status(500).json({error: err.message});
            return;
        }
        res.json(rows)
    })
})

// Dua Api
app.get('/api/dua', (req, res) => {
    database.all('SELECT * FROM dua', (err, rows) => {
        if(err){
            res.status(500).json({error: err.message});
            return;
        }
        res.json(rows)
    })
})

app.get('/api/dua/:categoryId', (req, res)=>{
    const categoryId = req.params.categoryId;

    database.all('SELECT * FROM dua WHERE cat_id = ?', [categoryId], (err, rows) => {
        if(err){
            res.status(500).json({error: err.message});
            return;
        }

        if(!rows || rows.length === 0){
            res.status(404).json({error: 'Dua not found'});
            return;
        }

        res.json(rows);
    })
})




app.listen(port, ()=>{
    console.log(`Dua zone server is running on the port ${port}`);
})

