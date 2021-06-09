export default class Db {
  db = null;
  constructor() {
    this.dbOpen();
    //Инициализация таблицы для хранения настроек
    this.db.executeSql(
      "CREATE TABLE IF NOT EXISTS pref (id integer primary key, name text, value text)",
      [],
      (result) => {
        console.log("Table created successfully", result);
      },
      (error) => {
        console.log("Error occurred while creating the table.", error);
      }
    );
  }

  dbOpen() {
    if (this.db == null) {
      this.db =
        window.cordova.platformId === "browser"
          ? window.openDatabase("Settings", "1.0", "Data", 2 * 1024 * 1024)
          : window.sqlitePlugin.openDatabase(
              {
                name: "setting.db",
                location: "default",
                androidDatabaseProvider: "system",
                androidLockWorkaround: 1,
              },
              (successcb) => {
                console.log("successcb", successcb);
              },
              (errorcb) => {
                console.log("errorcb", errorcb);
              }
            );
    }
  }

  getPref(PrefName, DefaultValue) {
    this.dbOpen();
    return new Promise((resolve, reject) => {
      this.db.executeSql(
        "SELECT name, value FROM pref WHERE name=?",
        [PrefName],
        (resultSet) => {
          let res = DefaultValue;
          if (resultSet.rows.length === 1) {
            res = resultSet.rows.item(0).value;
          }
          resolve(res);
        },
        (error) => {
          console.log("reject", error);
          reject(error);
        }
      );
    });
  }

  setPref(PrefName, Value) {
    //console.log('PrefName', PrefName, 'Value', Value)
    return new Promise((resolve, reject) => {
      this.db.executeSql(
        "SELECT id, name, value FROM pref WHERE name=?",
        [PrefName],
        (resultSet) => {
          let len = resultSet.rows.length;
          if (len === 1) {
            //update
            let id = resultSet.rows.item(0).id;
            this.db.executeSql(
              "UPDATE pref SET value=? WHERE id=?",
              [Value, id],
              (resultSet) => {
                resolve(resultSet);
              },
              (error) => {
                reject(error);
              }
            );
          } else {
            //insert
            this.db.executeSql(
              "INSERT INTO pref (name, value) VALUES (?, ?)",
              [PrefName, Value],
              (resultSet) => {
                resolve(resultSet);
              },
              (error) => {
                reject(error);
              }
            );
          }
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  // dropTable(dbTableName){
  //     this.dbOpen()
  //     return new Promise((resolve, reject) => {
  //         const db = this.db
  //         db.transaction((transaction) => {
  //             const executeQuery = "DROP TABLE IF EXISTS " + dbTableName;
  //             transaction.executeSql(executeQuery, [],
  //                 (tx, result)=> {
  //                     console.log('Table deleted successfully.');
  //                     resolve(result)
  //                 },
  //                 (error)=> {
  //                     console.log('Error occurred while droping the table');
  //                     reject(error)
  //                 }
  //             );
  //         });
  //     })
  // }
}
