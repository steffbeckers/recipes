using Recipes.EntityFrameworkCore;
using Volo.Abp.Modularity;

namespace Recipes
{
    [DependsOn(
        typeof(RecipesEntityFrameworkCoreTestModule)
        )]
    public class RecipesDomainTestModule : AbpModule
    {

    }
}