using System;
using Volo.Abp.Domain.Repositories;

namespace Recipes.Categories
{
    public interface ICategoryRepository : IRepository<Category, Guid>
    {
    }
}