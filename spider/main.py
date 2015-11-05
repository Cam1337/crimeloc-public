__author__ = 'cam'
import pprint
import scraper
import preprocess
import sql



data = scraper.scrapeData(True)
processed = preprocess.process(data)
sql.save(processed, conf=sql.defaultSQLConf)

# cmd = "SELECT description, reported FROM crimes where reported < datetime('2015-09-15 00:00:00') AND reported > datetime('2015-09-10 00:00:00');"
# cmd = "SELECT count(location) c, location l FROM crimes WHERE datetime('2015-08-25 00:00:00') < reported AND reported < datetime('2015-09-07 00:00:00') group by location"
cmd = "SELECT time(reported), description, location FROM crimes WHERE time(reported) < '04:00:00' AND time(reported) > '03:00:00'"
loadedSQL = sql.load(conf=sql.defaultSQLConf)
result = sql.run(cmd, loadedSQL)

pprint.pprint(result)
print len(result)