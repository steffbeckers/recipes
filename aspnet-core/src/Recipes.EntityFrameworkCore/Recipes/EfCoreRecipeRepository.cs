using Recipes.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;
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

        public override async Task DeleteAsync(Guid id, bool autoSave = false, CancellationToken cancellationToken = default)
        {
            Recipe recipe = await FindAsync(id);
            if (recipe == null)
            {
                return;
            }

            RecipesDbContext dbContext = await GetDbContextAsync();
            dbContext.RemoveRange(recipe.Ingredients);
            dbContext.RemoveRange(recipe.Steps);

            await DeleteAsync(recipe, autoSave, cancellationToken);
        }
    }
}