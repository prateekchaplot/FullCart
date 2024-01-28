using Backend.Data;
using Backend.Models;

namespace Backend.Repositories;

public interface ICategoryRepository : IRepository<Category>
{
}

public class CategoryRepository(DataContext dataContext) : Repository<Category>(dataContext), ICategoryRepository
{
}