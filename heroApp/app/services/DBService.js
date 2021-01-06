import sqlite from 'react-native-sqlite-storage';

var errorCB=(err)=> {
    console.log("SQL Error: " + err);
    return false;
  }
   
 var successCB=()=> {
    console.log("SQL executed fine");
    return true;
  }
   
var openCB=()=> {
    console.log("Database OPENED");
    return true;
  }

let db = sqlite.openDatabase({ name: 'heroDatabase.db' });

// var initDB = (tableName) =>{
//     console.log(">>tableName",tableName);
//    return new Promise((resolve)=>{
//    db.transaction((tx) => {
//      tx.executeSql('CREATE TABLE IF NOT EXISTS operator (id INTEGER(10) AUTOINCREMENT PRIMARY KEY NOT NULL,serverId VARCHAR(25), name VARCHAR(25),company VARCHAR(25),chemistry VARCHAR(25))');
//      resolve(db);
//     })
//   })
// }
export var initDB = (reqTable) => {
    sqlite.DEBUG(false);
    sqlite.enablePromise(true);
    let db;
    return new Promise((resolve) => {
    //   console.log("Plugin integrity check ...");
      sqlite.echoTest()
        .then(() => {
          sqlite.openDatabase(
            { name: 'heroDatabase.db' }
          )
            .then(DB => {
              db = DB;
              // console.log("Database OPEN");
              db.executeSql('SELECT * FROM ' + reqTable + ' LIMIT 1').then((result) => {
                console.log("Database is ready ... executing query ...");
                resolve(db);
              }).catch((error) => {
                console.log("Received error: ", error);
                db.transaction((tx) => {
                  tx.executeSql('CREATE TABLE IF NOT EXISTS operatorsTable (id INTEGER PRIMARY KEY AUTOINCREMENT,serverId VARCHAR(25), name VARCHAR(25),company VARCHAR(25),chemistry VARCHAR(25))');
                }).then((resp) => {
                  // console.log("resp user table "+resp);
                  resolve(db);
                })
                
                db.transaction((tx) => {
                  tx.executeSql('CREATE TABLE IF NOT EXISTS SprayerTable (id INTEGER PRIMARY KEY AUTOINCREMENT,serverId VARCHAR(25), name VARCHAR(25),hardwareId VARCHAR(25)');
                }).then((resp) => {
                  // console.log("resp user table "+resp);
                  resolve(db);
                })

                db.transaction((tx) => {
                  tx.executeSql('CREATE TABLE IF NOT EXISTS SessionTable (id INTEGER PRIMARY KEY AUTOINCREMENT,serverId VARCHAR(25), getBatteryLevel VARCHAR(25),getESVState VARCHAR(25), getFirmware VARCHAR(25), getFlow VARCHAR(25), getFlowRate VARCHAR(25), getHWVersion VARCHAR(25), getModel VARCHAR(25), getPumpState VARCHAR(25), getPumpTime VARCHAR(25), getPumpedVolume VARCHAR(25), getSerial VARCHAR(25), getTriggerLatchMode VARCHAR(25), getUnitName VARCHAR(25), resetPump VARCHAR(25), setUnitName VARCHAR(25), updateFirmware VARCHAR(25)');
                }).then((resp) => {
                  // console.log("resp user table "+resp);
                  resolve(db);
                })

                resolve(db);
                // console.log("Database not yet ready ... populating data");
              });
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log("echoTest failed - plugin not functional");
        });
    });
  };
  
export var addOperator = function (data) {
    // console.log(">>data ",data)
    let promise = new Promise((resolve, reject) => {
        // console.log(">>addOperator ",db);
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO operatorsTable VALUES (?,?, ?, ?, ?)',
          [,data.serverId,data.name,data.company,data.chemistry],
          (tx, results) => {
            // console.log('Results', results.rowsAffected);
            var success = "true";
            resolve(results);
              if (results.rowsAffected > 0) {
                resolve(success);
              } else {
                alert('Registration Failed');
              }
          }
        );
        // alert("Complete")
      });
    });
    return promise;
  }

export var getOperators = function () {
    console.log("getOperators");
    let promise = new Promise((resolve, reject) => {
        db.executeSql(
            'SELECT * FROM operatorsTable').then(
          (results) => {
              var records = [];
            // console.log(">>Inside getOperators",results)
            if(results[0].rows.length){
                for (let i = 0; i < results[0].rows.length; ++i){
                    records.push(results[0].rows.item(i))
                    // console.log(">>results ",i,)
                }
            }
            resolve(records);
          }
        );
    });
    return promise;
  }

  export var delOperator = function (id) {
    let promise = new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM operatorsTable where id=?',
          [id],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            resolve(results);
          })
      })
    });
    return promise;
  }