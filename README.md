# ChristmasHouse

## Christmas House Database install
Commands:

Download postgres https://www.postgresql.org/download/windows/
Remember the password you give for postgres user as part of installation

Run command,
c:\Program Files\PostgreSQL\12\bin\psql.exe -U postgres

Enter password for postgres and connect to postgres database

First create the database:
postgres=# CREATE DATABASE christmashouse

Connect to the database:
christmashouse=# \i c:\GitHub\ChristmasHouse\Source\Database\Chdb.sql

Once the connection is made you can quit:
christmashouse=# \q

Then you need to update the password you have given for the database.
You can do this by either going directly to the file or changing it through the command prompt by typing:
cd c:\GitHub\ChristmasHouse\Source\chapi
notepad queries.js
change the value of the password to the password you created during installation and save the file

Now the Database is installed!

## How to Run Website

Go into the christmas-house-checkin file by:
cd c:\GitHub\ChristmasHouse\Source\christmas-house-checkin
npm run build

Once files have been created you can run the website by:
cd c:\GitHub\ChristmasHouse\Source\chapi
npm run start

Now the Website is running and can be used!