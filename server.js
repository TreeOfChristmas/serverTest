const express = require('express');
const app = express()

app.listen(8080, function(){
    console.log("서버 온")
});

app.get('/', (req, res) => {
    res.send('Hello World');
});
