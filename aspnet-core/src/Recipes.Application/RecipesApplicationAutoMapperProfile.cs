using AutoMapper;
using Recipes.Categories;
using Recipes.Recipes;

namespace Recipes
{
    public class RecipesApplicationAutoMapperProfile : Profile
    {
        public RecipesApplicationAutoMapperProfile()
        {
            /* You can configure your AutoMapper mapping configuration here.
             * Alternatively, you can split your mapping configurations
             * into multiple profile classes for a better organization. */

            CreateMap<Recipe, RecipeDto>();
            CreateMap<Recipe, RecipeListDto>();
            CreateMap<RecipeIngredient, RecipeIngredientDto>();
            CreateMap<RecipeStep, RecipeStepDto>();
            CreateMap<RecipeWithNavigationProperties, RecipeDto>()
                .IncludeMembers(x => x.Recipe);
            CreateMap<RecipeWithNavigationProperties, RecipeListDto>()
                .IncludeMembers(x => x.Recipe);

            CreateMap<Category, CategorySimpleDto>();
        }
    }
}