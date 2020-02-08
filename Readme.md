//run api project
dotnet watch run

//script to run initial migration
dotnet ef migrations add InitialCreate -p Persistence/ -s API/

