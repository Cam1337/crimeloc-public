Deprecated


Creating and loading the DB

1)	using vm with postgresql, cd into directory containing TEST-SAMPLE.SQL
2)	dropdb crimes (unnecessary if this is the first time creating db)
3)	createdb crimes
4)	psql crimes -af TEST-SAMPLE.sql &> TEST-SAMPLE.out




Generating data

Run /spider/main.py  ———  main.py performs three essential functions:

1) Using scraper.py, it scrapes relevant data from the web source
2) It then preprocesses the scraped data in order to sanitize it for storage
3) The sanitized data is stored into a flat SQLite3 file