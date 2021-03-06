'use strict';

var tasks = global.nss.db.collection('tasks');
var priorities = global.nss.db.collection('priorities');

var Mongo = require('mongodb');
var _ = require('lodash');

exports.index = (req, res)=>{
  tasks.find().toArray((err, tasks)=>{
    priorities.find().toArray((err, priorities)=>{

      tasks = tasks.map(task => {
        task.priority = _(priorities).find(pri => {
          return pri._id.toString() === task.priorityId.toString();
        });
        console.log(task);
        return task;
      });

      res.render('tasks/index', {priorities: priorities, tasks: tasks, title: 'ToDo: Tasks'});
    });
  });
};

exports.create = (req, res)=>{
  req.body.isComplete = false;
  req.body.due = new Date(req.body.due);
  req.body.priorityId = Mongo.ObjectID(req.body.priorityId);

  tasks.save(req.body, ()=>res.redirect('/tasks'));
};

exports.destroy = (req, res)=>{
  var _id = Mongo.ObjectID(req.params.id);
  tasks.findAndRemove({_id: _id}, ()=>res.redirect('/tasks'));
};

exports.filter = (req, res)=>{
  var _pid = Mongo.ObjectID(req.params.pid);

  tasks.find({priorityId: _pid}).toArray((err, tasks)=>{
    priorities.find().toArray((err, priorities)=>{

      tasks = tasks.map(task => {
        task.priority = _(priorities).find(pri => {
          return pri._id.toString() === task.priorityId.toString();
        });
        return task;
      });

      res.render('tasks/index', {priorities: priorities, tasks: tasks, title: 'ToDo: Tasks'});
    });
  });
};

exports.dateSort = (req, res)=>{
  tasks.find({}, {sort:[['due', 1]]}).toArray((err, tasks)=>{
    priorities.find().toArray((err, priorities)=>{

      tasks = tasks.map(task => {
        task.priority = _(priorities).find(pri => {
          return pri._id.toString() === task.priorityId.toString();
        });
        return task;
      });

      res.render('tasks/index', {priorities: priorities, tasks: tasks, title: 'ToDo: Tasks'});
    });
  });
};

exports.titleSort = (req, res)=>{
  tasks.find({}, {sort:[['title', 1]]}).toArray((err, tasks)=>{
    priorities.find().toArray((err, priorities)=>{

      tasks = tasks.map(task => {
        task.priority = _(priorities).find(pri => {
          return pri._id.toString() === task.priorityId.toString();
        });
        return task;
      });

      res.render('tasks/index', {priorities: priorities, tasks: tasks, title: 'ToDo: Tasks'});
    });
  });
};



exports.update = (req, res)=>{
  var _id = Mongo.ObjectID(req.params.id);

  tasks.findOne({_id:_id}, (err, task)=>{
    task.isComplete = !task.isComplete;
    tasks.save(task, ()=>res.redirect('/tasks'));
    console.log(task.isComplete);
  });
};
