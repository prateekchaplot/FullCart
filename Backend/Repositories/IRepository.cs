using System.Linq.Expressions;
using Backend.Models;

namespace Backend.Repositories;

public interface IRepository<T> where T : Base
{
    Task<bool> AnyAsync(Expression<Func<T, bool>> expression);

    Task CreateAsync(T entity);

    void Delete(T entity);

    Task<T?> FirstOrDefaultAsync(Expression<Func<T, bool>> expression);

    Task<IEnumerable<T>> GetAllAsync();

    Task SaveAsync();
}