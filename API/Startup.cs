using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Persistence;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Application.Activities;
using FluentValidation.AspNetCore;
using Application;
using API.Middleware;

namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        //dependency injection //order not important
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<DataContext>( opt =>{
                opt.UseSqlite(Configuration.GetConnectionString("DefaultConnection"));
            });

            services.AddCors(opt =>{
                opt.AddPolicy("CorsPolicy", policy =>{
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
                });
            });
            //we want to use mediatr using dependecny injection
            //only need to tell mediator about one handler and then it will reference that assembly for any others
            services.AddMediatR(typeof(List.Handler).Assembly);
            services.AddControllers().AddFluentValidation(cfg => {
                cfg.RegisterValidatorsFromAssemblyContaining<Create>();
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        //add middleware 
        //orering is important!!
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            //detailed info for developers if something goes wrong
            
            app.UseMiddleware<ErrorHandlingMiddleware>();
            if (env.IsDevelopment())
            {
                
                //app.UseDeveloperExceptionPage();
            }
            //coomment out for now so app will use http
            //app.UseHttpsRedirection();
            //when requests comes into api it needs to be routed
            app.UseRouting();
            
            app.UseAuthorization();

            app.UseCors("CorsPolicy");
            //map controller enpoints to api
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
