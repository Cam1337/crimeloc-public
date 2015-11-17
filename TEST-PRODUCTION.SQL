SELECT description, reported FROM crimes where reported < datetime('2015-09-15 00:00:00') AND reported > datetime('2015-09-10 00:00:00');
SELECT count(location) c, location l FROM crimes WHERE datetime('2015-08-25 00:00:00') < reported AND reported < datetime('2015-09-07 00:00:00') group by location
SELECT time(reported), description, location FROM crimes WHERE time(reported) < '04:00:00' AND time(reported) > '03:00:00'
SELECT location, description, status FROM crimes WHERE reported > '2015-11-01 00:00:00' AND reported < '2015-11-20 00:00:00'
SELECT count(*), location FROM crimes WHERE time(reported) > "05:00:00" group by location order by count(*) DESC