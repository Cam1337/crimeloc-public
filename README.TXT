Creating and loading the DB

1)	using vm with postgresql, cd into directory containing TEST-SAMPLE.SQL
2)	dropdb crimes (unnecessary if this is the first time creating db)
3)	createdb crimes
4)	psql crimes -af TEST-SAMPLE.sql &> TEST-SAMPLE.out