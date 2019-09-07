const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/item');

// @route  GET api/items
// @desc   Get All Items
// @access Public
router.get('/', (req, res) => {  // only slash since we are already directed here
    Item.find()
      .sort({date: -1})
      .then(items => res.json(items))
}); 


// @route  POST api/items
// @desc   Creat ITEM
// @access Public
router.post('/', (req, res) => {  
    // Create new object // Item relative to Model name
    const newItem = new Item({  
        name: req.body.name // note: date added automatically with model
    }); 

    // Save to db
    newItem.save().then(item => res.json(item));
}); 


// @route  DELETE api/items
// @desc   DELETE ITEM
// @access Public
router.delete('/:id', (req, res) => {  
    Item.findById(req.params.id)
      .then(item => item.remove().then(() => res.json({success: true})))
      .catch(err => res.status(404).json({success: false}));
});
 


module.exports = router;