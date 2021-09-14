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
using Volo.Abp.Domain.Entities;
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
        public virtual async Task<RecipeDto> CreateAsync(RecipeCreateDto input)
        {
            if (input.Ingredients.Count == 0)
            {
                throw new BusinessException(RecipesDomainErrorCodes.Recipes.AtLeastOneIngredientIsRequired);
            }

            if (input.Steps.Count == 0)
            {
                throw new BusinessException(RecipesDomainErrorCodes.Recipes.AtLeastOneStepIsRequired);
            }

            Recipe recipe = new Recipe(
                GuidGenerator.Create(),
                input.CategoryId,
                input.Name,
                CurrentTenant.Id)
            {
                Description = input.Description,
                ForAmount = input.ForAmount,
                ForUnit = input.ForUnit
            };

            // TODO: input.Photo

            foreach (RecipeIngredientCreateDto ingredientDto in input.Ingredients)
            {
                recipe.Ingredients.Add(
                    new RecipeIngredient(
                        GuidGenerator.Create(),
                        recipe.Id,
                        ingredientDto.Name,
                        ingredientDto.Amount,
                        CurrentTenant.Id)
                    {
                        SortOrder = ingredientDto.SortOrder,
                        Unit = ingredientDto.Unit
                    });
            }

            foreach (RecipeStepCreateDto stepDto in input.Steps)
            {
                recipe.Steps.Add(
                    new RecipeStep(
                        GuidGenerator.Create(),
                        recipe.Id,
                        stepDto.Number,
                        stepDto.Instructions,
                        CurrentTenant.Id));
            }

            await _recipeRepository.InsertAsync(recipe, autoSave: true);

            return await GetAsync(recipe.Id);
        }

        [Authorize(RecipesPermissions.Recipes.Delete)]
        public virtual async Task DeleteAsync(Guid id)
        {
            await _recipeRepository.DeleteAsync(id);
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
            if (recipeDto == null)
            {
                // TODO: Throw better BusinessException?
                throw new EntityNotFoundException(typeof(Recipe), id);
            }

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

            // Total count
            long totalCount = await recipeQueryable.LongCountAsync();

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
                TotalCount = totalCount,
                Items = await ObjectMapper.GetMapper()
                    .ProjectTo<RecipeListDto>(recipeWithNavigationPropertiesQueryable)
                    .AsNoTracking()
                    .ToListAsync()
            };
        }

        [Authorize(RecipesPermissions.Recipes.Edit)]
        public virtual async Task<RecipeDto> UpdateAsync(Guid id, RecipeUpdateDto input)
        {
            Recipe recipe = await _recipeRepository.GetAsync(id);

            recipe.Name = input.Name;
            recipe.Description = input.Description;
            recipe.CategoryId = input.CategoryId;
            recipe.ForAmount = input.ForAmount;
            recipe.ForUnit = input.ForUnit;

            // TODO: input.Photo

            recipe.Ingredients.RemoveAll(t => !input.Ingredients.Any(x => x.Id == t.Id));
            foreach (RecipeIngredientUpdateDto ingredientDto in input.Ingredients.Where(x => !recipe.Ingredients.Any(y => y.Id == x.Id)))
            {
                recipe.Ingredients.Add(
                    new RecipeIngredient(
                        GuidGenerator.Create(),
                        recipe.Id,
                        ingredientDto.Name,
                        ingredientDto.Amount,
                        CurrentTenant.Id));
            }
            foreach (RecipeIngredient recipeIngredient in recipe.Ingredients.Where(x => input.Ingredients.Any(y => y.Id == x.Id)))
            {
                RecipeIngredientUpdateDto ingredientDto = input.Ingredients.First(x => x.Id == recipeIngredient.Id);
                recipeIngredient.Name = ingredientDto.Name;
                recipeIngredient.Amount = ingredientDto.Amount;
                recipeIngredient.Unit = ingredientDto.Unit;
                recipeIngredient.SortOrder = ingredientDto.SortOrder;
            }

            recipe.Steps.RemoveAll(t => !input.Steps.Any(x => x.Id == t.Id));
            foreach (RecipeStepUpdateDto stepDto in input.Steps.Where(x => !recipe.Steps.Any(y => y.Id == x.Id)))
            {
                recipe.Steps.Add(
                    new RecipeStep(
                        GuidGenerator.Create(),
                        recipe.Id,
                        stepDto.Number,
                        stepDto.Instructions,
                        CurrentTenant.Id));
            }
            foreach (RecipeStep recipeStep in recipe.Steps.Where(x => input.Steps.Any(y => y.Id == x.Id)))
            {
                RecipeStepUpdateDto stepDto = input.Steps.First(x => x.Id == recipeStep.Id);
                recipeStep.Number = stepDto.Number;
                recipeStep.Instructions = stepDto.Instructions;
            }

            await _recipeRepository.UpdateAsync(recipe, autoSave: true);

            return await GetAsync(id);
        }
    }
}