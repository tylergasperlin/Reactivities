//run api project
dotnet watch run

//script to run initial migration from the main foler
dotnet ef migrations add InitialCreate -p Persistence/ -s API/

 dotnet ef migrations add Seedvalues -p Persistence/ -s API/

Steps to reseed db
//dotnet ef database drop -p Persistence/ -s API/
//dotnet ef migrations add InitialCreate -p Persistence/ -s API/
//dotnet watch run from api folder


 MediatR
    Takes object in > Handler > object out
    Flow in app: Controller > mediaror.send(object) > object > handler > object > Controller
    Command Handler: Activity goes in and Object comes out with some data about a successful save 
    Query Handler: Object in to retrive by id > object about the requested object is the object out as a dto 

 Clean Architecture
 Devices/DB/UI/Web > Gateways/Controllers/Presenters > UseCases - Appliction Business Rules > Entities - Enterprise Busienss Rules

//Client Error Handling Strategy
1. 401 unauthorized 
2. 500 
3. 404 not found resouce not found in db
4. 400 Bad request to validate properties 


// Used: dotnet user-secrets add "TokenKey" "key name" to store the hashing key in dotnet locally for development. Security measure