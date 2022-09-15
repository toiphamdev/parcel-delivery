const express = require('express')


const router = express.Router();
let initWebRoutes = (app)=>{


    

    app.get('/', (req, res) => {
        res.send('Hello World!')
    })

    app.use('/',router);


}

module.exports = initWebRoutes;