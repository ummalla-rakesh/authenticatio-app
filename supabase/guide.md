## Guide for supabse local CLI

### Migrations code to db
#### add query inside the file manually.
    supabase migration new <migration-file-name>

including the data and set the db again with tables

    supabase db reset     // it will drop all tables
 
                    


### Migrations form db to query.
we can generate the all chnages migration by comparing the local db with code.

    supabase db diff -f <migration-file-name>


### To start local supabse
    supabase start

### To stop local supabase
    supabase stop 
