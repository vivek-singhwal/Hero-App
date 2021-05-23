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
                  'SELECT locationImages FROM sessions').then(
                (results) => {
                    if(results[0].rows.length == 0){
                        // console.log(">>No data found")
                    }
                }
              ).catch(error => {
                db.executeSql(
                  'ALTER TABLE sessions ADD COLUMN locationImages text').then(
                (results) => {
                    if(results[0].rows.length == 0){
                        // console.log(">>No data found")
                    }
                }
              ).catch(error => {
          
              console.log(error);
              })

              console.log(error);
              })
                
                db.executeSql(
                    'SELECT rinseId FROM sessions').then(
                  (results) => {
                      if(results[0].rows.length == 0){
                          // console.log(">>No data found")
                      }
                  }
                ).catch(error => {
                  db.executeSql(
                    'ALTER TABLE sessions ADD COLUMN rinseId text').then(
                  (results) => {
                      if(results[0].rows.length == 0){
                          // console.log(">>No data found")
                      }
                  }
                ).catch(error => {
            
                console.log(error);
                })

                console.log(error);
                })
                  
                  db.executeSql(
                      'SELECT isSync FROM sessions').then(
                    (results) => {
                        if(results[0].rows.length == 0){
                            // console.log(">>No data found")
                        }
                    }
                  ).catch(error => {
                    db.executeSql(
                      'ALTER TABLE sessions ADD COLUMN isSync boolean not null default 0').then(
                    (results) => {
                        if(results[0].rows.length == 0){
                            // console.log(">>No data found")
                        }
                    }
                  ).catch(error => {
              
                  console.log(error);
                  })

                  console.log(error);
                  })
                  
                  db.executeSql(
                    'SELECT appVersion FROM sessions').then(
                  (results) => {
                      if(results[0].rows.length == 0){
                          // console.log(">>No data found")
                      }
                  }
                ).catch(error => {
                  db.executeSql(
                    'ALTER TABLE sessions ADD COLUMN appVersion text not null default "1.0"').then(
                  (results) => {
                      if(results[0].rows.length == 0){
                          // console.log(">>No data found")
                      }
                  }
                ).catch(error => {
            
                console.log(error);
                })
                    console.log(error);
                    })

                    db.executeSql(
                      'SELECT isRinse FROM sessions').then(
                    (results) => {
                        if(results[0].rows.length == 0){
                            // console.log(">>No data found")
                        }
                    }
                  ).catch(error => {
                    db.executeSql(
                      'ALTER TABLE sessions ADD COLUMN isRinse boolean not null default 0').then(
                    (results) => {
                        if(results[0].rows.length == 0){
                            // console.log(">>No data found")
                        }
                    }
                  ).catch(error => {
              
                  console.log(error);
                  })
                  console.log(error);
                  })

                  db.executeSql(
                    'SELECT isFinished FROM sessions').then(
                  (results) => {
                      if(results[0].rows.length == 0){
                          // console.log(">>No data found")
                      }
                  }
                ).catch(error => {
                  db.executeSql(
                    'ALTER TABLE sessions ADD COLUMN isFinished boolean not null default 0').then(
                  (results) => {
                      if(results[0].rows.length == 0){
                          // console.log(">>No data found")
                      }
                  }
                ).catch(error => {
            
                console.log(error);
                })
                console.log(error);
                })
                
                }
                if(reqTable === 'operators'){
                  db.executeSql(
                    'SELECT isSync FROM operators').then(
                  (results) => {
                      if(results[0].rows.length == 0){
                          // console.log(">>No data found")
                      }
                  }
                ).catch(error => {
                  db.executeSql(
                    'ALTER TABLE operators ADD COLUMN isSync boolean not null default 0').then(
                  (results) => {
                      if(results[0].rows.length == 0){
                          // console.log(">>No data found")
                      }
                  }
                ).catch(error => {
            
                console.log(error);
                })

                console.log(error);
                })
              }
              if(reqTable === 'sprayers'){
                db.executeSql(
                  'SELECT isSync FROM sprayers').then(
                (results) => {
                    if(results[0].rows.length == 0){
                        // console.log(">>No data found")
                    }
                }
              ).catch(error => {
                db.executeSql(
                  'ALTER TABLE sprayers ADD COLUMN isSync boolean not null default 0').then(
                (results) => {
                    if(results[0].rows.length == 0){
                        // console.log(">>No data found")
                    }
                }
              ).catch(error => {
          
              console.log(error);
              })

              console.log(error);
              })

               db.executeSql(
                  'SELECT sprayerName FROM sprayers').then(
                (results) => {
                    if(results[0].rows.length == 0){
                        // console.log(">>No data found")
                    }
                }
              ).catch(error => {
                db.executeSql(
                  'ALTER TABLE sprayers ADD COLUMN sprayerName text').then(
                (results) => {
                    if(results[0].rows.length == 0){
                        // console.log(">>No data found")
                    }
                }
              ).catch(error => {
          
              console.log(error);
              })

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
                  tx.executeSql('CREATE TABLE IF NOT EXISTS operators (id INTEGER PRIMARY KEY AUTOINCREMENT,serverId VARCHAR(25), opName VARCHAR(25),company VARCHAR(25),chemistryType VARCHAR(25),isSync boolean not null default 0)');
                }).then((resp) => {
                  console.log("resp operators "+resp);
                  resolve(db);
                })
                
                db.transaction((tx) => {
                  tx.executeSql('CREATE TABLE IF NOT EXISTS sprayers (id INTEGER PRIMARY KEY AUTOINCREMENT,serverId VARCHAR(25), sdName VARCHAR(25),hardwareId VARCHAR(50),isSync boolean not null default 0,sprayerName text)');
                }).then((resp) => {
                  console.log("resp sprayers "+resp);
                  resolve(db);
                })

                db.transaction((tx) => {
                  tx.executeSql('CREATE TABLE IF NOT EXISTS sessions (id INTEGER PRIMARY KEY AUTOINCREMENT,serverId VARCHAR(25), operatorId VARCHAR(25), sprayerId VARCHAR(25), chemistryType VARCHAR(25) ,startTime INTEGER ,endTime INTEGER,sessionLocation VARCHAR(25),sessionComment VARCHAR(100),sessionData TEXT,ozSparayed REAL,isSync boolean not null default 0,isFinished boolean not null default 0,isRinse boolean not null default 0,appVersion boolean not null default 0,rinseId text, locationImages text)');
                }).then((resp) => {
                  // console.log("resp user table "+resp);
                  resolve(db);
                })

                db.transaction((tx) => {
                  tx.executeSql('CREATE TABLE IF NOT EXISTS sessionData (id INTEGER PRIMARY KEY AUTOINCREMENT,serverId VARCHAR(25), sessionId VARCHAR(25), serverSessionId VARCHAR(25), sessionData TEXT, isSync boolean not null default 0, isFinished boolean not null default 0)');
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

  export var deleteAllOperator = function () {
    // console.log(">>data ",data)
    let promise = new Promise((resolve, reject) => {
        // console.log(">>addOperator ",db);
      db.transaction((tx) => {
        tx.executeSql(
          '"delete from operators',
          (tx, results) => {
            // console.log('Results', results.rowsAffected);
            var success = "true";
            resolve(results);
              if (results.rowsAffected > 0) {
                resolve(success);
              } else {
                alert('Delete Failed');
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

export var addOperator = function (data) {
    // console.log(">>data ",data)
    let promise = new Promise((resolve, reject) => {
        // console.log(">>addOperator ",db);
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO operators VALUES (?,?, ?, ?, ?,?)',
          [,data.serverId,data.opName,data.company,data.chemistryType,data.isSync],
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
          'INSERT INTO sprayers VALUES (?,?,?,?,?,?)',
          [,data.serverId,data.sdName,data.hardwareId,data.isSync,data.sprayerName],
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
    console.log(">>addSession ",JSON.stringify(data))
    let promise = new Promise((resolve, reject) => {
        // console.log(">>addOperator ",db);
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO sessions (id,serverId,operatorId,sprayerId,chemistryType,startTime,endTime,sessionLocation,sessionComment,sessionData,ozSparayed,isSync,isFinished,isRinse,appVersion) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
          [,data.serverId, data.operatorId, data.sprayerId, data.chemistryType,
            data.startTime, data.endTime, data.sessionLocation, data.sessionComment,
            data.sessionData, data.ozSparayed, data.isSync, data.isFinished,
            data.isRinse, data.appVersion],
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

  export var addRinseProcessSession = function (data) {
    console.log(">>addSession ",JSON.stringify(data))
    return new Promise((resolve, reject) => {
        // console.log(">>addOperator ",db);
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO sessions (id,startTime,sessionLocation,isSync,isFinished,isRinse,appVersion) VALUES (?,?,?,?,?,?,?)',
          [,data.startTime,data.sessionLocation,data.isSync, data.isFinished, data.isRinse, data.appVersion],
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
    });
  }

  export var updateFininshedSession = function () {
    // console.log(">>data ",data)
    let promise = new Promise((resolve, reject) => {
        // console.log(">>addOperator ",db);
      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE sessions SET isFinished=0 where isRinse=0',
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

  export var addSessionDataDB = function (data) {
    // console.log(">>data ",data)
    let promise = new Promise((resolve, reject) => {
        // console.log(">>addOperator ",db);
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO sessionData VALUES (?,?,?,?,?,?,?)',
          [,data.serverId,data.sessionId,data.serverSessionId,data.sessionData,data.isSync,data.isFinished],
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
//users in local sqlite
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

  export var getOperatorAPISync = function () {
    // console.log("getOperatorAPISync");
    let promise = new Promise((resolve, reject) => {
        db.executeSql(
            'SELECT * FROM operators where isSync=0 OR serverId=null').then(
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

  export var getSprayerAPISync = function () {
    // console.log("getSprayerAPISync");
    let promise = new Promise((resolve, reject) => {
        db.executeSql(
            'SELECT * FROM sprayers where isSync=0 OR serverId=null').then(
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
  
  export var getSessionAPISync = function () {
    // console.log("getOperators");
    let promise = new Promise((resolve, reject) => {
        db.executeSql(
            'SELECT * FROM sessions where isSync=0 OR serverId=null').then(
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
  
  export var getSessionByIdSync = function (id) {
    // console.log("getOperators");
    let promise = new Promise((resolve, reject) => {
        db.executeSql(
            'SELECT * FROM sessions where id=?',[id]).then(
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

  export var getSessionDataAPISync = function () {
    // console.log("getOperators");
    let promise = new Promise((resolve, reject) => {
        db.executeSql(
            'SELECT * FROM sessionData where isSync=0 OR serverId=null').then(
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

  export var updateSessions = function (objSession) {
    // console.log("getOperators");
    let promise = new Promise((resolve, reject) => {
        db.executeSql(
            'UPDATE sessions SET endTime=?,sessionLocation=?,sessionComment=?,isSync=?, locationImages=? where id=?',[objSession.endTime,objSession.sessionLocation,objSession.sessionComment,objSession.isSync,objSession.locationImages,objSession.id]).then(
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

  export var updateSessionsDetail = function (objSession) {
    // console.log("getOperators");
    let promise = new Promise((resolve, reject) => {
        db.executeSql(
            'UPDATE sessions SET sessionLocation=?,sessionComment=?,isSync=?, locationImages=? where id=?',[objSession.sessionLocation,objSession.sessionComment,objSession.isSync,objSession.locationImages,objSession.id]).then(
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

  export var updateSessionsImage = function (objSession) {
    // console.log("getOperators");
    let promise = new Promise((resolve, reject) => {
        db.executeSql(
            'UPDATE sessions SET locationImages=?, isSync=? where id=?',[objSession.imageUrl,objSession.isSync,objSession.id]).then(
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

  export var getDashboardSessions = function () {
    // console.log("getSessions");
    let promise = new Promise((resolve, reject) => {
        db.executeSql(
            'SELECT * FROM sessions where isRinse=0 AND isFinished=1 ORDER BY startTime desc').then(
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

  export var getSessions = function () {
    // console.log("getSessions");
    let promise = new Promise((resolve, reject) => {
        db.executeSql(
            'SELECT * FROM sessions ORDER BY startTime desc').then(
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

  export var getSessionWithParam = function (field,data) {
    // console.log("getSessions");
    let promise = new Promise((resolve, reject) => {
        db.executeSql(
            'SELECT * FROM sessions where '+field+'='+data).then(
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
    // console.log("getOperators");
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
    // console.log("getOperators");
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

  export var delSession = function (id) {
    console.log("delete session:"+id);
    let promise = new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM sessions where id=?',
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

  export var updateServerId = function (tableName,id,tableId) {
    let promise = new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE '+tableName+' SET serverId=?,isSync=1 where id=?',
          [id,tableId],
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

  export var updateServerForSessionDataId = function (id,serverId,severSessionId) {
    let promise = new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE sessionData SET serverId=?,serverSessionId=?,isSync=1 where id=?',
          [serverId,severSessionId,id],
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

  export var updateSprayerName = function (id,sprayerName) {
    let promise = new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE sprayers SET sprayerName=?,isSync=0 where hardwareId=?',
          [sprayerName,id],
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