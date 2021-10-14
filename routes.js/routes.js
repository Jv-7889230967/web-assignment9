const express = require('express');
const path = require('path');
const app = express.Router();

app.get('/',(req,res)=>{

    Item.find({},(err,f)=>{
        if(f.length===0){
            Item.insertMany(d,(err)=>{
                if(err){
                    console.log(err);
                }
                else{
                    console.log("successfully saved items to database");
                }
            })
            res.redirect('/');
        }
        else{
            res.render("list",{newlist:f});

        }
  
    })
})
app.post('/',(req,res)=>{
     i=req.body.n;
    const item = new Item({
        name:i
    });
    item.save();
    res.redirect("/");
});
app.post('/delete',(req,res)=>{
    const id=req.body.checkbox;
    Item.findByIdAndRemove(id,(err)=>{
        if(!err)
        {
            console.log("deleted successfully");
            res.redirect('/');
        }
    })
})

module.exports=app;