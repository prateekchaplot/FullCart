using System.Linq.Expressions;
using Backend.Data;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories;

public abstract class Repository<T>(DataContext dataContext) : IRepository<T> where T : Base
{
    private readonly DataContext _dataContext = dataContext;
    protected readonly DbSet<T> _set = dataContext.Set<T>();

    public async Task CreateAsync(T entity)
    {
        await _dataContext.AddAsync(entity);
    }

    public async Task<T?> FirstOrDefaultAsync(Expression<Func<T, bool>> expression)
    {
        return await _set.FirstOrDefaultAsync(expression);
    }

    public async Task SaveAsync()
    {
        await _dataContext.SaveChangesAsync();
    }
}