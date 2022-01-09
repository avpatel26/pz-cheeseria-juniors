import * as express from 'express';
import { writeFileSync } from 'fs';
const cheeses = require('./data/cheeses.json');

// Purchase.json to store the purchased items
const purchases = require('./data/purchase.json');
const bodyParser = require('body-parser');
const router = express.Router();
const jsonParser = bodyParser.json();

router.get('/api/cheeses', (req, res, next) => {
    res.json(cheeses); 
});

// endpoint of post method of purchase items
router.post('/api/purchaseItems/', jsonParser, (req,res) => {
    
    // set incremental purchase id
    const purchaseId = purchases.length + 1;
    const purchaseItem = {
        purchaseId: purchaseId,
        purchaseItems: req.body.items,
        purchaseTotal: req.body.total
    }

    // Prepend the purchased item in the array
    purchases.unshift(purchaseItem);
    
    try{
        // Stores the recent purchases to the json file
        writeFileSync("./src/server/data/purchase.json", JSON.stringify(purchases,null,2));
        res.status(200).json("Successfully Purchased!!");
    }catch(e){
        console.log("Unsuccessful Purchase!!",e);
        res.status(400).json("Unsuccessful Purchase!!");
    }
});

// endpoint for the recently purchased items
router.get('/api/purchaseItems', (req,res,next) => {
    res.json(purchases);
});

export default router;