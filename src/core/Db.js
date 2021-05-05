export default class Db {
    db = null;
    constructor() {
        this.db = (window.cordova.platformId === 'browser') ?
            window.openDatabase('Settings', '1.0', 'Data', 2*1024*1024) :
            window.sqlitePlugin.openDatabase({name: 'Settings.db', location: 'default'})

        //Инициализация таблицы для хранения настроек
        this.db.transaction(function(transaction) {
            transaction.executeSql('CREATE TABLE IF NOT EXISTS pref (id integer primary key, name text, value text)', [],
                function(tx, result) {
                    console.log("Table created successfully", tx, result)
                },
                function(error) {
                    console.log("Error occurred while creating the table.", error)
                }
            );
        });

    }


    getPref(PrefName, DefaultValue){
        return new Promise((resolve, reject) => {
            this.db.transaction(function (transaction) {
                transaction.executeSql('SELECT name, value FROM pref WHERE name=?',
                    [PrefName],
                    (tx, results) =>{
                        let res = DefaultValue
                        if (results.rows.length === 1) {res = results.rows[0].value}
                        resolve(res)
                    },
                    (err) => {
                        reject(err)
                });
            })
        })
    }

    setPref(PrefName, Value){
        return new Promise((resolve, reject) => {
            const db = this.db
            db.transaction(function (transaction) {
                transaction.executeSql('SELECT id, name, value FROM pref WHERE name=?', [PrefName], function (tx, results) {
                    let len = results.rows.length
                    if (len === 1) { //update
                        let id = results.rows.item(0).id
                        db.transaction( (transaction) => {
                            transaction.executeSql("UPDATE pref SET value=? WHERE id=?", [Value, id],
                                (tx, result) => {resolve(result)},
                                (error) => {reject(error)})
                        });
                    } else { //insert
                        db.transaction( (transaction) => {
                            transaction.executeSql("INSERT INTO pref (name, value) VALUES (?, ?)", [PrefName, Value],
                                (tx, result) => {resolve(result)},
                                (error) => {reject(error)})
                        });
                    }
                }, (err)=>reject(err));
            });
        })
    }

    dropTable(dbTableName){
        return new Promise((resolve, reject) => {
            const db = this.db
            db.transaction((transaction) => {
                const executeQuery = "DROP TABLE IF EXISTS " + dbTableName;
                transaction.executeSql(executeQuery, [],
                    (tx, result)=> {
                        console.log('Table deleted successfully.');
                        resolve(result)
                    },
                    (error)=> {
                        console.log('Error occurred while droping the table');
                        reject(error)
                    }
                );
            });
        })

    }



}
