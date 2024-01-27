using Backend.Data;
using Backend.Models;

namespace Backend.Repositories;

public interface IUserRepository : IRepository<User>
{
}

public class UserRepository(DataContext dataContext) : Repository<User>(dataContext), IUserRepository
{
}