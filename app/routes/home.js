'use strict';

var tasks = global.nss.db.collection('tasks');
var priorities = global.nss.db.collection('priorities');

console.log(tasks);
console.log(priorities);

exports.index = (req, res)=>{

  priorities.find().toArray((err, records)=>{
    res.render('home/index', {priorities: records, title: 'ToDo: App'});
  });

};

exports.help = (req, res)=>{
  res.render('home/help', {title: 'Node.js: Help'});
};
