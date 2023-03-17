const express=require('express');
const app=express();
const PORT=3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname , '/index.html')
  })

app.get('/user-manual',(req,res)=>{
    res.sendFile(__dirname , '/user-manual.html')
})

app.get('/about-us',(req,res)=>{
    res.sendFile(__dirname , '/about-us.html')
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
  })
console.log(__dirname)