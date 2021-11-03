using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Recipes.Categories;
using Recipes.Files;
using Recipes.Permissions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.BlobStoring;
using Volo.Abp.Domain.Entities;
using Volo.Abp.ObjectMapping;

namespace Recipes.Recipes
{
    [RemoteService(IsEnabled = false)]
    public class RecipesAppService : RecipesAppServiceBase, IRecipesAppService
    {
        private readonly IBlobContainer _blobContainer;
        private readonly ICategoryRepository _categoryRepository;
        private readonly IRecipeRepository _recipeRepository;

        public RecipesAppService(
            IBlobContainer blobContainer,
            ICategoryRepository categoryRepository,
            IRecipeRepository recipeRepository)
        {
            _blobContainer = blobContainer;
            _categoryRepository = categoryRepository;
            _recipeRepository = recipeRepository;
        }

        [Authorize(RecipesPermissions.Recipes.Create)]
        public virtual async Task<RecipeDto> CreateAsync(RecipeCreateInputDto input)
        {
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

            if (input.Photo != null)
            {
                Guid photoId = GuidGenerator.Create();

                await _blobContainer.SaveAsync(
                    photoId.ToString(),
                    Convert.FromBase64String(input.Photo.Data));

                recipe.Photo = new File(
                    photoId,
                    input.Photo.Name,
                    input.Photo.ContentType);
            }

            foreach (RecipeIngredientCreateInputDto ingredientDto in input.Ingredients)
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

            foreach (RecipeStepCreateInputDto stepDto in input.Steps)
            {
                recipe.Steps.Add(
                    new RecipeStep(
                        GuidGenerator.Create(),
                        recipe.Id,
                        stepDto.Number,
                        stepDto.Instructions,
                        CurrentTenant.Id));
            }

            recipe = await _recipeRepository.InsertAsync(
                recipe,
                autoSave: true);

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

            IQueryable<RecipeWithNavigationProperties> recipeWithNavigationPropertiesQueryable = recipeQueryable.SelectMany(x =>
                _categoryRepository.Where(y => y.Id == x.CategoryId),
                (recipe, category) => new RecipeWithNavigationProperties()
                {
                    Recipe = recipe,
                    Category = category
                });

            RecipeDto recipeDto = await ObjectMapper
                .GetMapper()
                .ProjectTo<RecipeDto>(recipeWithNavigationPropertiesQueryable.AsSingleQuery())
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == id);

            if (recipeDto == null)
            {
                throw new EntityNotFoundException(
                    typeof(Recipe),
                    id);
            }

            recipeDto.Ingredients = recipeDto.Ingredients
                .OrderBy(x => x.SortOrder)
                .ToList();
            recipeDto.Steps = recipeDto.Steps
                .OrderBy(x => x.Number)
                .ToList();

            return recipeDto;
        }

        public virtual async Task<PagedResultDto<RecipeListDto>> GetListAsync(RecipeListInputDto input)
        {
            IQueryable<Recipe> recipeQueryable = await _recipeRepository.WithDetailsAsync();

            // Filter
            recipeQueryable = recipeQueryable
                .WhereIf(
                    !string.IsNullOrWhiteSpace(input.FilterText),
                    x => x.Name.Contains(input.FilterText) ||
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
            recipeQueryable = recipeQueryable.PageBy(
                input.SkipCount,
                input.MaxResultCount);

            IQueryable<RecipeWithNavigationProperties> recipeWithNavigationPropertiesQueryable = recipeQueryable.SelectMany(x =>
                _categoryRepository.Where(y => y.Id == x.CategoryId),
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

        // TODO
        //public virtual async Task<FileResult> GetPhotoAsync(Guid id)
        //{
        //    Recipe recipe = await _recipeRepository.GetAsync(id);

        //    if (recipe.Photo == null)
        //    {
        //        return null;
        //    }

        //    byte[] photoData = await _blobContainer.GetAllBytesOrNullAsync(recipe.Photo.Id.ToString());

        //    if (photoData == null)
        //    {
        //        return null;
        //    }

        //    return new FileContentResult(
        //        photoData,
        //        recipe.Photo.ContentType);
        //}

        [Authorize(RecipesPermissions.Recipes.Edit)]
        public virtual async Task<RecipeDto> UpdateAsync(
            Guid id,
            RecipeUpdateInputDto input)
        {
            Recipe recipe = await _recipeRepository.GetAsync(id);

            recipe.Name = input.Name;
            recipe.Description = input.Description;
            recipe.CategoryId = input.CategoryId;
            recipe.ForAmount = input.ForAmount;
            recipe.ForUnit = input.ForUnit;

            if (recipe.Photo != null && (input.Photo != null || input.DeletePhoto))
            {
                await _blobContainer.DeleteAsync(recipe.Photo.Id.ToString());

                recipe.Photo = null;
            }

            if (input.Photo != null)
            {
                Guid photoId = GuidGenerator.Create();

                await _blobContainer.SaveAsync(
                    photoId.ToString(),
                    Convert.FromBase64String(input.Photo.Data));

                recipe.Photo = new File(
                    photoId,
                    input.Photo.Name,
                    input.Photo.ContentType);
            }

            recipe.Ingredients.RemoveAll(x => !input.Ingredients.Any(y => y.Id == x.Id));

            foreach (RecipeIngredientUpdateInputDto ingredientDto in input.Ingredients.Where(x => !recipe.Ingredients.Any(y => y.Id == x.Id)))
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
                RecipeIngredientUpdateInputDto ingredientDto = input.Ingredients.First(x => x.Id == recipeIngredient.Id);

                recipeIngredient.Name = ingredientDto.Name;
                recipeIngredient.Amount = ingredientDto.Amount;
                recipeIngredient.Unit = ingredientDto.Unit;
                recipeIngredient.SortOrder = ingredientDto.SortOrder;
            }

            recipe.Steps.RemoveAll(x => !input.Steps.Any(y => y.Id == x.Id));

            foreach (RecipeStepUpdateInputDto stepDto in input.Steps.Where(x => !recipe.Steps.Any(y => y.Id == x.Id)))
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
                RecipeStepUpdateInputDto stepDto = input.Steps.First(x => x.Id == recipeStep.Id);

                recipeStep.Number = stepDto.Number;
                recipeStep.Instructions = stepDto.Instructions;
            }

            recipe = await _recipeRepository.UpdateAsync(
                recipe,
                autoSave: true);

            return await GetAsync(recipe.Id);
        }
    }
}