using System;
using Volo.Abp.Domain.Repositories;

namespace Recipes.Recipes
{
    public interface IRecipeRepository : IRepository<Recipe, Guid>
    {
    }
}