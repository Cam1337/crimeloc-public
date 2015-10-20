--table for storing building information
CREATE TABLE Building(
	Name VARCHAR(256) NOT NULL PRIMARY KEY,
	Type VARCHAR(256) NOT NULL,
	CHECK(Type in('Administrative', 'Academic', 'Athletic', 'Dining', 'Residence', 'Library', 'Medical', 'Parking', 'Transportation')),
	Campus VARCHAR(256) NOT NULL,
	CHECK(Campus='West' or Campus='Central' or Campus='East'));

--table for storing crime information
CREATE TABLE Crime(
	ID INTEGER NOT NULL PRIMARY KEY,
	Type VARCHAR(256) NOT NULL,
	Date DATE NOT NULL,
	Disposition VARCHAR(256) NOT NULL,
	CHECK(disposition='Arrest' or disposition='Cleared by Referral' or disposition='Closed'
		or disposition='Closed-SC' or disposition='Exceptionally Cleared' or disposition='Pending'
		or disposition='Unfounded'),
	Area_Name VARCHAR(256) NOT NULL,
	FOREIGN KEY (Area_Name) references Building(name),
	Exterior VARCHAR(256) NOT NULL,
	CHECK(Exterior='Yes' or Exterior='No'));

--inserting sample data for use in testing the sample SQL queries
INSERT INTO Building Values('Edens', 'Residence', 'West');
INSERT INTO Building Values('Craven', 'Residence', 'West');
INSERT INTO Building Values('Few', 'Residence', 'West');
INSERT INTO Building Values('Bell Tower Dorm', 'Residence', 'East');
INSERT INTO Building Values('1913 Erwin', 'Residence', 'Central');
INSERT INTO Building Values('Allen Building', 'Administrative', 'West');
INSERT INTO Building Values('French Family Science Center', 'Academic', 'West');
INSERT INTO Building Values('Wilson Recreation Center', 'Athletic', 'West');
INSERT INTO Building Values('Lilly Library', 'Library', 'East');
INSERT INTO Building Values('The Food Factory at Devils Bistro', 'Dining', 'Central');
INSERT INTO Building Values('Perkins Library', 'Library', 'West');
INSERT INTO Building Values('Duke Hospital North', 'Medical', 'West');
INSERT INTO Building Values('Smith Warehouse', 'Administrative', 'East');
INSERT INTO Building Values('West Duke Lot', 'Parking', 'East');

INSERT INTO Crime Values(0, 'Larceny', '2015-10-12', 'Closed', 'West Duke Lot', 'Yes');
INSERT INTO Crime Values(1,'Forgery and uttering', '2015-10-12', 'Closed', 'Smith Warehouse', 'No');
INSERT INTO Crime Values(2, 'Larceny', '2015-10-12', 'Closed', 'Duke Hospital North', 'No');
INSERT INTO Crime Values(3, 'Larceny', '2015-10-12', 'Closed', 'Duke Hospital North', 'No');
INSERT INTO Crime Values(4, 'Student alcohol violation', '2015-10-13', 'Closed-SC', 'Bell Tower Dorm', 'No');
INSERT INTO Crime Values(5, 'Larceny', '2015-10-13', 'Closed', 'Perkins Library', 'No');





/*
Sample database queries. While we use specific values here like
Area_Name = 'Duke Hospital North', this would be changes to the parameters
specified by user input. These queries are provided to show the different
possible queries: crimes by building, type of building, campus, crime type,
crimes within a specific time period, and crimes that were committed inside/outside.
*/
SELECT * FROM Crime WHERE Area_Name = 'Duke Hospital North';
SELECT Crime.ID, Crime.Type, Crime.Area_Name, Crime.Date FROM Crime, Building WHERE Building.Type = 'Administrative' AND Building.Name = Crime.Area_Name;
SELECT Crime.ID, Crime.Type, Crime.Area_Name, Crime.Date FROM Crime, Building WHERE Building.Campus = 'West' AND Building.Name = Crime.Area_Name;
SELECT * FROM Crime WHERE Type = 'Larceny';
SELECT * FROM Crime WHERE Date < '2015-10-14' and Date > '2015-10-12';
SELECT * FROM Crime WHERE Exterior = 'Yes';






