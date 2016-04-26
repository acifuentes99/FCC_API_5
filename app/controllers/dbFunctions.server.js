//'use strict';

var Demos = require('../models/demos.js');

function dbFunctions () {

    this.getData = function(req, res) {
        console.log("loga");
        Demos
        .find({}, {'_id': false})
        .exec(function (err, result){
            console.log("hola");
            if(err) {throw err;}
            if(result){ res.json(result); }
            else{
                var newDoc = new Demo({"algo": "algo"});
                newDoc.save(function (err, doc){
                    if (err){ throw err; }
                    res.json(doc);
                });
            }
        });
    };

}
