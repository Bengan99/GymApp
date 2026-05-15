using GymApp.API.Models;
using Microsoft.EntityFrameworkCore;
namespace GymApp.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Member> Members { get; set; }

    }
}