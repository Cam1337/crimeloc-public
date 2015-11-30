__author__ = 'cam'

import sqlite3

defaultSQLConf = {
    "type":"sqlite",
    "file":"../webapp/models/db.sqlite",
    "url":{
        "domain":"",
        "port":""
    },
    "auth":{
        "username":"",
        "password":""
    }
}
def saveMySQL(data, url, auth):
    pass
def saveSQLite(data, fp):
    row_data = [e.values() for e in data]
    connection = sqlite3.connect(fp)
    cursor = connection.cursor()
    cursor.execute("DROP table IF EXISTS crimes")
    cursor.execute("CREATE TABLE crimes (status text, description text, occurred_start datetime, case_no text, reported  datetime, location text, occurred_end datetime)")
    cursor.executemany("INSERT INTO crimes VALUES (?,?,?,?,?,?,?)", row_data)
    connection.commit()
    connection.close()

def loadMySQL(url, auth):
    pass
def loadSQLite(fp):
    connection = sqlite3.connect(fp)
    cursor = connection.cursor()
    def query(q):
        cursor.execute(q)
        return cursor.fetchall()
    return query

def save(data, conf):
    if conf["type"] == "sqlite":
        saveSQLite(data, conf["file"])
    if conf["type"] == "mysql":
        saveMySQL(data, conf["url"], conf["auth"])

def load(conf):
    if conf["type"] == "sqlite":
        return loadSQLite(conf["file"])
    if conf["type"] == "mysql":
        return loadMySQL(conf["url"], conf["auth"])

def run(cmd, q_exec):
    return q_exec(cmd)