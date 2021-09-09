using Volo.Abp.Modularity;

namespace Recipes
{
    [DependsOn(
        typeof(RecipesApplicationModule),
        typeof(RecipesDomainTestModule)
        )]
    public class RecipesApplicationTestModule : AbpModule
    {

    }
}