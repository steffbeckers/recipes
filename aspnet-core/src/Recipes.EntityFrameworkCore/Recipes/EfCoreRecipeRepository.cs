using Recipes.EntityFrameworkCore;
using System;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace Recipes.Recipes
{
    public class EfCoreRecipeRepository : EfCoreRepository<RecipesDbContext, Recipe, Guid>, IRecipeRepository
    {
        public EfCoreRecipeRepository(IDbContextProvider<RecipesDbContext> dbContextProvider)
            : base(dbContextProvider)
        {
        }
    }
}