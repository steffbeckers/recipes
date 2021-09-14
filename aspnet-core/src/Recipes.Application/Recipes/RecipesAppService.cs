using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Recipes.Categories;
using Recipes.Permissions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.ObjectMapping;

namespace Recipes.Recipes
{
    [RemoteService(IsEnabled = false)]
    [Authorize(RecipesPermissions.Recipes.Default)]
    public class RecipesAppService : RecipesAppServiceBase, IRecipesAppService
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IRecipeRepository _recipeRepository;

        public RecipesAppService(
            ICategoryRepository categoryRepository,
            IRecipeRepository recipeRepository)
        {
            _categoryRepository = categoryRepository;
            _recipeRepository = recipeRepository;
        }

        [Authorize(RecipesPermissions.Recipes.Create)]
        public virtual Task<RecipeDto> CreateAsync(RecipeCreateDto input)
        {
            throw new NotImplementedException();
        }

        [Authorize(RecipesPermissions.Recipes.Delete)]
        public virtual Task DeleteAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public virtual async Task<RecipeDto> GetAsync(Guid id)
        {
            IQueryable<Recipe> recipeQueryable = await _recipeRepository.WithDetailsAsync();
            IQueryable<Category> categoryQueryable = await _categoryRepository.GetQueryableAsync();
            IQueryable<RecipeWithNavigationProperties> recipeWithNavigationPropertiesQueryable = recipeQueryable.SelectMany(x =>
                categoryQueryable.Where(y => y.Id == x.CategoryId),
                (recipe, category) => new RecipeWithNavigationProperties()
                {
                    Recipe = recipe,
                    Category = category
                });

            RecipeDto recipeDto = await ObjectMapper.GetMapper()
                .ProjectTo<RecipeDto>(recipeWithNavigationPropertiesQueryable.AsSingleQuery())
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == id);

            recipeDto.Ingredients = recipeDto.Ingredients.OrderBy(x => x.SortOrder).ToList();
            recipeDto.Steps = recipeDto.Steps.OrderBy(x => x.Number).ToList();

            return recipeDto;
        }

        public virtual async Task<PagedResultDto<RecipeListDto>> GetListAsync(GetRecipesInput input)
        {
            IQueryable<Recipe> recipeQueryable = await _recipeRepository.WithDetailsAsync();

            // Filter
            recipeQueryable = recipeQueryable.WhereIf(!string.IsNullOrWhiteSpace(input.FilterText), x =>
                x.Name.Contains(input.FilterText) ||
                x.Description.Contains(input.FilterText) ||
                x.Ingredients.Any(y => y.Name.Contains(input.FilterText)) ||
                x.Steps.Any(y => y.Instructions.Contains(input.FilterText)));

            // Sort
            if (string.IsNullOrEmpty(input.Sorting))
            {
                recipeQueryable = recipeQueryable.OrderBy(x => x.Name);
            }
            else
            {
                recipeQueryable = recipeQueryable.OrderBy(x => input.Sorting);
            }

            // Page
            recipeQueryable = recipeQueryable.PageBy(input.SkipCount, input.MaxResultCount);

            IQueryable<Category> categoryQueryable = await _categoryRepository.GetQueryableAsync();
            IQueryable<RecipeWithNavigationProperties> recipeWithNavigationPropertiesQueryable = recipeQueryable.SelectMany(x =>
                categoryQueryable.Where(y => y.Id == x.CategoryId),
                (recipe, category) => new RecipeWithNavigationProperties()
                {
                    Recipe = recipe,
                    Category = category
                });

            return new PagedResultDto<RecipeListDto>()
            {
                TotalCount = await recipeQueryable.LongCountAsync(),
                Items = await ObjectMapper.GetMapper()
                    .ProjectTo<RecipeListDto>(recipeWithNavigationPropertiesQueryable)
                    .AsNoTracking()
                    .ToListAsync()
            };
        }

        [Authorize(RecipesPermissions.Recipes.Edit)]
        public virtual Task<RecipeDto> UpdateAsync(RecipeUpdateDto input)
        {
            throw new NotImplementedException();
        }
    }
}