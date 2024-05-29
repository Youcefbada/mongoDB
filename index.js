const express = require("express")
const mongoose = require("mongoose")
const app = express()
const artical = require("./models/Article")
//mongodb+srv://youcef:<password>@cluster0.sdorzr9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
mongoose.connect("your mongo db code ").then(() =>{
    console.log("connected is ok")
}).catch((error)=>{
    console.log("there is error in connecting with server")
})
console.log("Starting ...")
app.get('/hello',(req,res) =>{
    res.send("Hello Sir")
})
app.get("/sendhtml",(req,res) =>{
    let number =""
    for(let i=0;i<=40;i++){
        number += i+"-"
    }
    // this code to send and show html file 
    //res.sendFile(__dirname + "/view/index.html")
    // in deafult setting the server will go to 'views' foalder and search for the file 
    // the main idea for ejs file is make the html file like jsx or react project that can show js or json data in the page
    res.render("index.ejs",{
        name: "youcef",
        number:number,
    })
    console.log("the file has send ")
})
// create point to put data into tabel 
app.post('/articale',async (req,res)=>{
    const artical1 = new artical()
    artical1.title  = "how to get rich",
    artical1.body = "All what you need is work",
    artical1.numberofpages = 23
    await artical1.save()
    res.send("the data has fille correct")
})
// create point to get the data from database
app.get('/articale', async (req,res) =>{
    const data = await artical.find()
    res.json(data)
})
// create a point to get a article using id 
app.get('/articales/:ID',async (req,res) =>{
    const Id = req.params.ID
    const data  = await artical.findById(Id)
    res.json(data)
})
// this code to delete data from database using id and return it to printed or save it 
app.get('/delete/:ID',async (req,res) =>{
    const id = req.params.ID
    const delet = await artical.findByIdAndDelete(id)
    res.json(delet)
})
// update the data of an entry
app.get('/update/:ID',async (req,res) =>{
    const id = req.params.ID
    const updatedItem = await artical.findByIdAndUpdate(id, {
        'title' : 'no dont do it '
    }, 
    {
        new: true,
        runValidators: true,
    });
    res.json(updatedItem)
})
app.listen(80,() =>{
    console.log("server is running ")
})