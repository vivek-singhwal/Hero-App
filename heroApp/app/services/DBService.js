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
                console.log("Database is ready ... executing query ...",reqTable);
                if(reqTable === 'sessions'){
                  db.executeSql(
                    'SELECT appVersion,isSync FROM sessions').then(
                  (results) => {
                      if(results[0].rows.length == 0){
                          console.log(">>No data found")
                      }
                  }
                ).catch(error => {
                  // db.transaction((tx) => {
                  //   tx.executeSql(
                  //     'INSERT INTO sessions VALUES (?,?,?,?,?,?,?,?,?,?,?)',
                  //     [,data.serverId,data.operatorId,data.sprayerId,data.chemistryType,data.startTime,data.endTime,data.sessionLocation,data.sessionComment,data.sessionData,data.ozSparayed],
                  //     (tx, results) => {
                  //       // console.log('Results', results.rowsAffected);
                  //       var success = "true";
                  //       resolve(results);
                  //         if (results.rowsAffected > 0) {
                  //           resolve(success);
                  //         } else {
                  //           alert('Registration Failed');
                  //         }
                  //     }
                  //   );
                  //   // alert("Complete")
                  // });
                 console.log(error);
            })
                }
                // db.transaction((tx) => {
                //   tx.executeSql('DROP TABLE '+reqTable);
                // }).then((resp) => {
                //   console.log("resp operators "+resp);
                //   resolve(db);
                // })
                resolve(db);
              }).catch((error) => {
                console.log("Received error: ", error);
                db.transaction((tx) => {
                  tx.executeSql('CREATE TABLE IF NOT EXISTS operators (id INTEGER PRIMARY KEY AUTOINCREMENT,serverId VARCHAR(25), opName VARCHAR(25),company VARCHAR(25),chemistryType VARCHAR(25))');
                }).then((resp) => {
                  console.log("resp operators "+resp);
                  resolve(db);
                })
                
                db.transaction((tx) => {
                  tx.executeSql('CREATE TABLE IF NOT EXISTS sprayers (id INTEGER PRIMARY KEY AUTOINCREMENT,serverId VARCHAR(25), sdName VARCHAR(25),hardwareId VARCHAR(50))');
                }).then((resp) => {
                  console.log("resp sprayers "+resp);
                  resolve(db);
                })

                db.transaction((tx) => {
                  tx.executeSql('CREATE TABLE IF NOT EXISTS sessions (id INTEGER PRIMARY KEY AUTOINCREMENT,serverId VARCHAR(25), operatorId VARCHAR(25), sprayerId VARCHAR(25), chemistryType VARCHAR(25) ,startTime INTEGER ,endTime INTEGER,sessionLocation VARCHAR(25),sessionComment VARCHAR(100),sessionData TEXT,ozSparayed REAL)');
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
    }).catch(error => {
      console.log(error);
    });;
  };


export var addOperator = function (data) {
    // console.log(">>data ",data)
    let promise = new Promise((resolve, reject) => {
        // console.log(">>addOperator ",db);
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO operators VALUES (?,?, ?, ?, ?)',
          [,data.serverId,data.opName,data.company,data.chemistryType],
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
    }).catch(error => {
      console.log(error);
    });;;
    return promise;
  }

  export var addSprayer = function (data) {
    // console.log(">>data ",data)
    let promise = new Promise((resolve, reject) => {
        // console.log(">>addOperator ",db);
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO sprayers VALUES (?,?,?,?)',
          [,data.serverId,data.sdName,data.hardwareId],
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
    }).catch(error => {
      console.log(error);
    });;;
    return promise;
  }

  export var addSession = function (data) {
    // console.log(">>data ",data)
    let promise = new Promise((resolve, reject) => {
        // console.log(">>addOperator ",db);
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO sessions VALUES (?,?,?,?,?,?,?,?,?,?,?)',
          [,data.serverId,data.operatorId,data.sprayerId,data.chemistryType,data.startTime,data.endTime,data.sessionLocation,data.sessionComment,data.sessionData,data.ozSparayed],
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
    }).catch(error => {
      console.log(error);
    });;;
    return promise;
  }

export var getOperators = function () {
    console.log("getOperators");
    let promise = new Promise((resolve, reject) => {
        db.executeSql(
            'SELECT * FROM operators ').then(
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
        )
    }).catch(error => {
      console.log(error);
    });;
    return promise;
  }

  export var getSessions = function (id) {
    // console.log("getSessions");
    let promise = new Promise((resolve, reject) => {
        db.executeSql(
            'SELECT * FROM sessions').then(
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
        )
    }).catch(error => {
      console.log(error);
    });;
    return promise;
  }

  export var getSprayers = function () {
    console.log("getOperators");
    let promise = new Promise((resolve, reject) => {
        db.executeSql(
            'SELECT * FROM sprayers ').then(
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
        )
    }).catch(error => {
      console.log(error);
    });;
    return promise;
  }

  export var getSprayersByHwId = function (id) {
    console.log("getOperators");
    let promise = new Promise((resolve, reject) => {
        db.executeSql(
            'SELECT * FROM sprayers where hardwareId=?',[id]).then(
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
        )
    }).catch(error => {
      console.log(error);
    });;
    return promise;
  }

  export var delOperator = function (id) {
    let promise = new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM operators where id=?',
          [id],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            resolve(results);
          })
      })
    }).catch(error => {
      console.log(error);
    });;
    return promise;
  }

  export var delSprayer = function (id) {
    let promise = new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM sprayers where id=?',
          [id],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            resolve(results);
          })
      })
    }).catch(error => {
      console.log(error);
    });;
    return promise;
  }

  export var updateServerId = function (tableName,id) {
    let promise = new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE '+tableName+' SET serverId=?',
          [id],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            resolve(results);
          })
      })
    }).catch(error => {
      console.log(error);
    });;
    return promise;
  }