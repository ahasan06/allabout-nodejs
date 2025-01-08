const express = require('express');
const app = express();
const port = 3000;
app.use(express.json()); // we have used this for parsing the data like json

let teaData = []
let nextId = 1;



app.post("/teas",(req,res)=>{
    const {name,price} = req.body;
    console.log("New teas add : ",req.body);
    if (!name || !price) {
        return res.status(404).send("Please enter name and price");
    }
    else{
        const newData = {
            id: nextId,
            name: name,
            price: price,
        }
        teaData.push(newData);
        nextId++;
        res.status(200).send(teaData);
      
    }
    
})

app.get('/teas',(req,res)=>{
    return res.status(200).json(teaData)
})

app.get('/teas/:id',(req,res)=>{
    const tea = teaData.find(tea=>tea.id == req.params.id)
    if (!tea) {
        return res.status(404).json({ error: "Tea not found" });
    }
    else{
        return res.status(200).json(tea)
    }
})

app.put('/teas/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id));
    if (!tea) {
        return res.status(404).json({ error: "Tea not found" });
    }
    const { name, price } = req.body;
    if (name) tea.name = name;
    if (price) tea.price = price;
    res.json(tea);
});


app.delete('/teas/:id',(req,res)=>{
    const teaId = parseInt(req.params.id)
    const tea = teaData.find(tea=>tea.id===teaId);
    if (!tea) {
        return res.status(404).json({ error: "Tea not found" });
    }else{
        teaData = teaData.filter(tea=>tea.id !== teaId) 
        res.json({ message: `Tea with ID ${teaId} has been deleted.` });
    }
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})

