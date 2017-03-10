 var settings = require('../settings');
 var MongoClient = require('mongodb').MongoClient;
 // Connection URL
 var url = settings.dbUrl;
 // var db_back = null;
 // Use connect method to connect to the Server
 module.exports = {
    open : function(callback){
         MongoClient.connect(url, function(err, db) {
            console.log("Connected correctly to server");
            // var db_back = db;
            callback(err, db);
          });
    },
    close:function(){
      // if(db_back){
      //   db_back.close();
      //   db_back = null;
      // }
    }
 }


