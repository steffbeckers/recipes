using Recipes.EntityFrameworkCore;
using System;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace Recipes.Categories
{
    public class EfCoreCategoryRepository : EfCoreRepository<RecipesDbContext, Category, Guid>, ICategoryRepository
    {
        public EfCoreCategoryRepository(IDbContextProvider<RecipesDbContext> dbContextProvider)
            : base(dbContextProvider)
        {
        }
    }
}