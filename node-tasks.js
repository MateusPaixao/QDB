var schedule = require('node-schedule');
var ncp = require('ncp').ncp;
var fs = require('fs');
var path = require('path');

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
if(date.getDay() == 3){
    var rule = new schedule.RecurrenceRule();
    var dir = "backup";

    rule.dayOfWeek = 3;
    rule.hour = 17;
    rule.minute = 40;

    var j = schedule.scheduleJob(rule, function(){
        
        fs.readdir(dir, function(err, files) {
            files.forEach(function(file, index) {
                fs.stat(path.join(dir, file), function(err, stat) {
                var endTime, now;
                if (err) {
                    return console.error(err);
                }
                now = new Date().getTime();
                endTime = new Date(stat.ctime).getTime() + 2419200;
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

        ncp("dist", dir + "/backup-" + curday('-'), function (err) {
            if (err) {
              return console.error(err);
            }
            console.log('Backup Done!');
            j.cancel();
        });
    });
}