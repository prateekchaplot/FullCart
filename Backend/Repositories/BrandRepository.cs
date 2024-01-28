using Backend.Data;
using Backend.Models;

namespace Backend.Repositories;

public interface IBrandRepository : IRepository<Brand>
{
}

public class BrandRepository(DataContext dataContext) : Repository<Brand>(dataContext), IBrandRepository
{
}