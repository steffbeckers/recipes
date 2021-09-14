using AutoMapper;
using Recipes.Categories;
using Recipes.Recipes;
using Recipes.Shared;
using System;

namespace Recipes
{
    public class RecipesApplicationAutoMapperProfile : Profile
    {
        public RecipesApplicationAutoMapperProfile()
        {
            /* You can configure your AutoMapper mapping configuration here.
             * Alternatively, you can split your mapping configurations
             * into multiple profile classes for a better organization. */

            CreateMap<Category, CategoryDto>();
            CreateMap<Category, CategoryListDto>();
            CreateMap<Category, CategorySimpleDto>();
            CreateMap<Category, LookupDto<Guid>>();

            CreateMap<Recipe, CategoryRecipeListDto>();
            CreateMap<Recipe, RecipeDto>();
            CreateMap<Recipe, RecipeListDto>();
            CreateMap<RecipeIngredient, RecipeIngredientDto>();
            CreateMap<RecipeStep, RecipeStepDto>();
            CreateMap<RecipeWithNavigationProperties, RecipeDto>()
                .IncludeMembers(x => x.Recipe);
            CreateMap<RecipeWithNavigationProperties, RecipeListDto>()
                .IncludeMembers(x => x.Recipe);
        }
    }
}