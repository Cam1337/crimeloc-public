SELECT * FROM Crime WHERE Area_Name = “$USER_INPUT”;
SELECT Crime.Crime_ID, Crime.Type, Crime.Area_Name, Crime.Date FROM Crime, Building WHERE Building.Type = “$USER_INPUT” AND Building.Name = Crime.Area_Name;
SELECT Crime.Crime_ID, Crime.Type, Crime.Area_Name, Crime.Date FROM Crime, Building WHERE Building.Campus = “$USER_INPUT” AND Building.Name = Crime.Area_Name;
SELECT * FROM Crime WHERE Type = “$USER_INPUT”;
SELECT * FROM Crime WHERE Date < $USER_INPUT & Date > $USER_INPUT;