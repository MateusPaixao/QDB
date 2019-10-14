var schedule = require('node-schedule');
var ncp = require('ncp').ncp;
var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');

var date = new Date();
var dd = date.getDate();
var mm = date.getMonth()+1; //As January is 0.
var yyyy = date.getFullYear();
var curday = function(sp){
    if(dd<10) dd='0'+dd;
    if(mm<10) mm='0'+mm;
    return (dd+sp+mm+sp+yyyy);
};
// CREATE BACKUP FILES
if(date.getDay() == 6){
    var rule = new schedule.RecurrenceRule();
    var dir = "backup";

    console.log("Backup begin " + date.getHours()) + " hours";
    rule.dayOfWeek = 6;
    rule.hour = new schedule.Range(0, 23);
    rule.minute = new schedule.Range(0, 59);

    var j = schedule.scheduleJob(rule, function(){
        
        fs.readdir(dir, function(err, files) {
            files.forEach(function(file, index) {
                fs.stat(path.join(dir, file), function(err, stat) {
                var endTime, now;
                if (err) {
                    return console.error(err);
                }
                now = new Date().getTime();
                endTime = new Date(stat.ctime).getTime() + 2419200000;
                if (now > endTime) {
                    return rimraf(path.join(dir, file), function(err) {
                    if (err) {
                        return console.error(err);
                    }
                    console.log('successfully deleted');
                    });
                }
                });
            });
        });
        // !fs.existsSync(dir + "/backup-" + curday('-')) ? fs.mkdirSync(dir + "/backup-" + curday('-')) : '';
    });
}

module.exports.init = function () {
    Backup("1", 8, 21);
}