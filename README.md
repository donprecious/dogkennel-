
# Setup Instructions 

# Food Ordering 
website to developed with functionality of ordering food online. 

## Getting Started

These instructions will get you a copy of the project up and running on your production machine(web hosting server).

### Prerequisites

you need a hosting plathform that supports windows hosting and ms sql server database 
```
e.g accumwebhost, smarterasp.net, azure
```

### Installing

First you need to setup the database 
*obtain the project and open data folder you will find three files called pizzaDb.bak, pizzaDb.sql, pizzaDb_table_only.sql
pizzaDb.bak is a database backup file you can just import on your database server, (its version dependant currently support sql server 2014 and above)
pizzaDb.sql  is a database script file that contains script code in for recreating the entire database  
pizzaDb_table_only  is a database script file that contains script code in for recreating thejust the table entire database   

*how to import pizzaDb.bak 
on your production server create a database with a name e.g pizzaDb, 
setup user and password take note of the username and password, 
and the host(ip address poniting to the database)
use sql server to update the database 

### Upload Files to Server 
on your server control panel upload the zip files to the root dir eg httpdoc 

*Make changes to web.config file (web.config file is found inside the project files root dir)

locate
 <connectionStrings>
 .
 .
 .
 ```
   <!--Online ConnectionString-->
     <add name="BobSaxyDogs" connectionString="Data Source=68.71.130.74,1533;Initial Catalog=khaleejt_pizzadb;User Id=khaleejt;Password=Pecious0.don1234;MultipleActiveResultSets=True" providerName="System.Data.SqlClient"/>
    <add name="BobSaxyDogsEntities" connectionString="metadata=res://*/Models.Model1.csdl|res://*/Models.Model1.ssdl|res://*/Models.Model1.msl;provider=System.Data.SqlClient;provider connection string=&quot;data source=68.71.130.74,1533;initial catalog=khaleejt_pizzadb;user id=khaleejt;password=Pecious0.don1234;MultipleActiveResultSets=True;App=EntityFramework&quot;" providerName="System.Data.EntityClient"/>
  </connectionStrings>
  ```
  change data source value to your match your database server 
  change initial catelog value to match your database name 
    change user Id value to match your database user name
     change password value to match your database user password 
save changes 


## Thats all
