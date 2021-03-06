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
using Microsoft.AspNetCore.Identity;
using Domain;
using Application.Interfaces;
using Infrastructure.Security;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using AutoMapper;

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
                opt.UseLazyLoadingProxies();
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
            // dependency injection for automapper
            services.AddAutoMapper(typeof(List.Handler));
            // This will enable authorization on every controller method
            services.AddControllers(opt => {
                var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                opt.Filters.Add(new AuthorizeFilter(policy));
            }).AddFluentValidation(cfg => {
                cfg.RegisterValidatorsFromAssemblyContaining<Create>();
            });

            var builder = services.AddIdentityCore<AppUser>();
            var identitybuilder = new IdentityBuilder(builder.UserType, builder.Services);
            identitybuilder.AddEntityFrameworkStores<DataContext>();
            identitybuilder.AddSignInManager<SignInManager<AppUser>>();

            services.AddAuthorization(opt => {
                opt.AddPolicy("IsActivityHost", policy => {
                    policy.Requirements.Add(new IsHostRequirement());
                });
            });

            services.AddTransient<IAuthorizationHandler, IsHostRequirementHandler>();

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Super secret key"));
            // System security is contained here
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opt => {
                    opt.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = key,
                        ValidateAudience = false,
                        ValidateIssuer = false
                    };
                });

            services.AddScoped<IJwtGenerator, JwtGenerator>();
            services.AddScoped<IUserAccessor, UserAccessor>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        //add middleware 
        //ordering is important!!
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
            app.UseCors("CorsPolicy");
            app.UseAuthentication();
            app.UseAuthorization();

            //map controller enpoints to api
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
