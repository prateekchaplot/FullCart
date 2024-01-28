using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data;

public class DataContext(DbContextOptions<DataContext> dbContext) : DbContext (dbContext)
{
    public DbSet<User> Users => Set<User>();
    public DbSet<Brand> Brands => Set<Brand>();
}