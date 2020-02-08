using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

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
        //dependency injection
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        //add middleware 
        //orering is important!!
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            //detailed info for developers if something goes wrong
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            //coomment out for now so app will use http
            //app.UseHttpsRedirection();
            //when requests comes into api it needs to be routed
            app.UseRouting();
            
            app.UseAuthorization();
            //map controller enpoints to api
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
