//run api project
dotnet watch run

//script to run initial migration
dotnet ef migrations add InitialCreate -p Persistence/ -s API/

 dotnet ef migrations add Seedvalues -p Persistence/ -s API/

 MediatR
    Takes object in > Handler > object out
    Flow in app: Controller > mediaror.send(object) > object > handler > object > Controller
    Command Handler: Activity goes in and Object comes out with some data about a successful save 
    Query Handler: Object in to retrive by id > object about the requested object is the object out as a dto 

 Clean Architecture
 Devices/DB/UI/Web > Gateways/Controllers/Presenters > UseCases - Appliction Business Rules > Entities - Enterprise Busienss Rules

