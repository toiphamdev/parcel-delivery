const express = require('express')


const router = express.Router();
let initWebRoutes = (app)=>{


    

    app.get('/', (req, res) => {
        res.send('Toouir gì làm khó a!')
    })

    app.use('/',router);


}

module.exports = initWebRoutes;