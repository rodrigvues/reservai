using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Reservai.Api.Data;

namespace Reservai.Api.Data;

public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
{
    public AppDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();

        // Hardcoded connection string for design-time only
        optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=reservai;Username=postgres;Password=postgres");

        return new AppDbContext(optionsBuilder.Options);
    }
}
