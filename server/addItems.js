var fs = require('fs');

var insert = fs.readFile('data.json',function(err,content){
                  if(err) throw err;
                 var parseJson = JSON.parse(content);
                 for (i=0; i <11 ; i++){
                 parseJson.table.push({id:i, square:i*i})
                 }
                    fs.writeFile('data.json',JSON.stringify(parseJson),function(err){
                   if(err) throw err;
                    })
                 })

module.exports.insert = insert