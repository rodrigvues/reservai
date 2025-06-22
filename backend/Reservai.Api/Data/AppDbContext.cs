using Microsoft.EntityFrameworkCore;
using Reservai.Api.Models;

namespace Reservai.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

    public DbSet<User> Users => Set<User>();
}
