using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Recipes.Permissions;
using Recipes.Recipes;
using Recipes.Shared;
using System;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.BlobStoring;
using Volo.Abp.Domain.Entities;
using Volo.Abp.ObjectMapping;

namespace Recipes.Categories
{
    [RemoteService(IsEnabled = false)]
    public class CategoriesAppService : RecipesAppServiceBase, ICategoriesAppService
    {
        private readonly IBlobContainer _blobContainer;
        private readonly ICategoryRepository _categoryRepository;
        private readonly IRecipeRepository _recipeRepository;

        public CategoriesAppService(
            IBlobContainer blobContainer,
            ICategoryRepository categoryRepository,
            IRecipeRepository recipeRepository)
        {
            _blobContainer = blobContainer;
            _categoryRepository = categoryRepository;
            _recipeRepository = recipeRepository;
        }

        [Authorize(RecipesPermissions.Categories.Create)]
        public virtual async Task<CategoryDto> CreateAsync(CategoryCreateDto input)
        {
            Category category = new Category(
                GuidGenerator.Create(),
                input.Name,
                CurrentTenant.Id)
            {
                Description = input.Description,
                SortOrder = input.SortOrder
            };

            if (input.Photo != null)
            {
                Guid photoId = GuidGenerator.Create();
                await _blobContainer.SaveAsync(
                    photoId.ToString(),
                    input.Photo);
                category.PhotoId = photoId;
            }

            await _categoryRepository.InsertAsync(category, autoSave: true);

            return await GetAsync(category.Id);
        }

        [Authorize(RecipesPermissions.Categories.Delete)]
        public virtual async Task DeleteAsync(Guid id)
        {
            long recipeCount = await _recipeRepository.Where(x => x.CategoryId == id).LongCountAsync();
            if (recipeCount > 0)
            {
                throw new BusinessException(RecipesDomainErrorCodes.Categories.DeleteNotAllowedWhenRecipesStillLinked)
                    .WithData("RecipeCount", recipeCount);
            }

            await _categoryRepository.DeleteAsync(id);
        }

        public virtual async Task<CategoryDto> GetAsync(Guid id)
        {
            IQueryable<Category> categoryQueryable = await _categoryRepository.GetQueryableAsync();

            CategoryDto categoryDto = await ObjectMapper.GetMapper()
                .ProjectTo<CategoryDto>(categoryQueryable)
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == id);
            if (categoryDto == null)
            {
                // TODO: Throw better BusinessException?
                throw new EntityNotFoundException(typeof(Category), id);
            }

            return categoryDto;
        }

        public virtual async Task<PagedResultDto<CategoryListDto>> GetListAsync(GetCategoriesInput input)
        {
            IQueryable<Category> categoryQueryable = await _categoryRepository.GetQueryableAsync();

            // Filter
            categoryQueryable = categoryQueryable.WhereIf(!string.IsNullOrWhiteSpace(input.FilterText), x =>
                x.Name.Contains(input.FilterText) ||
                x.Description.Contains(input.FilterText));

            // Sort
            if (string.IsNullOrEmpty(input.Sorting))
            {
                categoryQueryable = categoryQueryable
                    .OrderByDescending(x => x.SortOrder != null)
                    .ThenBy(x => x.SortOrder)
                    .ThenBy(x => x.Name);
            }
            else
            {
                categoryQueryable = categoryQueryable.OrderBy(x => input.Sorting);
            }

            // Total count
            long totalCount = await categoryQueryable.LongCountAsync();

            // Page
            categoryQueryable = categoryQueryable.PageBy(input.SkipCount, input.MaxResultCount);

            return new PagedResultDto<CategoryListDto>()
            {
                TotalCount = totalCount,
                Items = await ObjectMapper.GetMapper()
                    .ProjectTo<CategoryListDto>(categoryQueryable)
                    .AsNoTracking()
                    .ToListAsync()
            };
        }

        public virtual async Task<PagedResultDto<LookupDto<Guid>>> GetLookupAsync(LookupRequestDto input)
        {
            IQueryable<Category> categoryQueryable = await _categoryRepository.GetQueryableAsync();

            // Filter
            categoryQueryable = categoryQueryable.WhereIf(!string.IsNullOrWhiteSpace(input.FilterText), x =>
                x.Name.Contains(input.FilterText));

            // Sort
            categoryQueryable = categoryQueryable.OrderBy(x => x.Name);

            // Total count
            long totalCount = await categoryQueryable.LongCountAsync();

            // Page
            categoryQueryable = categoryQueryable.PageBy(input.SkipCount, input.MaxResultCount);

            return new PagedResultDto<LookupDto<Guid>>()
            {
                TotalCount = totalCount,
                Items = await ObjectMapper.GetMapper()
                    .ProjectTo<LookupDto<Guid>>(categoryQueryable)
                    .AsNoTracking()
                    .ToListAsync()
            };
        }

        public virtual async Task<PagedResultDto<CategoryRecipeListDto>> GetRecipesListAsync(Guid id, GetCategoryRecipesInput input)
        {
            IQueryable<Recipe> recipeQueryable = await _recipeRepository.GetQueryableAsync();

            // Filter
            recipeQueryable = recipeQueryable
                .Where(x => x.CategoryId == id)
                .WhereIf(!string.IsNullOrWhiteSpace(input.FilterText), x =>
                    x.Name.Contains(input.FilterText));

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

            return new PagedResultDto<CategoryRecipeListDto>()
            {
                TotalCount = totalCount,
                Items = await ObjectMapper.GetMapper()
                    .ProjectTo<CategoryRecipeListDto>(recipeQueryable)
                    .AsNoTracking()
                    .ToListAsync()
            };
        }

        [Authorize(RecipesPermissions.Categories.Edit)]
        public virtual async Task<CategoryDto> UpdateAsync(Guid id, CategoryUpdateDto input)
        {
            Category category = await _categoryRepository.GetAsync(id);

            category.Name = input.Name;
            category.Description = input.Description;
            category.SortOrder = input.SortOrder;

            if (category.PhotoId.HasValue && (input.Photo != null || input.DeletePhoto))
            {
                await _blobContainer.DeleteAsync(category.PhotoId.ToString());
            }

            if (input.Photo != null)
            {
                Guid photoId = GuidGenerator.Create();
                await _blobContainer.SaveAsync(
                    photoId.ToString(),
                    input.Photo);
                category.PhotoId = photoId;
            }

            await _categoryRepository.UpdateAsync(category, autoSave: true);

            return await GetAsync(id);
        }
    }
}