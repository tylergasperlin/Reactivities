using System;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Value> Values {get;set;}

        //protected can access in defined class and any derived classes from this class
        //override OnModelCreating with the following 
        //when new table is created add the following values
        protected override void OnModelCreating(ModelBuilder builder){
            builder.Entity<Value>()
            .HasData(
                new Value {Id = 1, Name = "Value 101"},
                new Value {Id = 2, Name = "Value 102"},
                new Value {Id = 3, Name = "Value 103"}

            );
        }
    }
}
