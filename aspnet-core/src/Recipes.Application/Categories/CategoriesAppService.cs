using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Recipes.Files;
using Recipes.Permissions;
using Recipes.Realtime;
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
        private readonly IHubContext<RealtimeHub> _realtimeHubContext;
        private readonly IRecipeRepository _recipeRepository;

        public CategoriesAppService(
            IBlobContainer blobContainer,
            ICategoryRepository categoryRepository,
            IHubContext<RealtimeHub> realtimeHubContext,
            IRecipeRepository recipeRepository)
        {
            _blobContainer = blobContainer;
            _categoryRepository = categoryRepository;
            _realtimeHubContext = realtimeHubContext;
            _recipeRepository = recipeRepository;
        }

        [Authorize(RecipesPermissions.Categories.Create)]
        public virtual async Task<CategoryDto> CreateAsync(CategoryCreateInputDto input)
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
                    Convert.FromBase64String(input.Photo.Data));

                category.Photo = new File(
                    photoId,
                    input.Photo.Name,
                    input.Photo.ContentType);
            }

            category = await _categoryRepository.InsertAsync(
                category,
                autoSave: true);

            CategoryDto categoryDto = await GetAsync(category.Id);

            // TODO: Event handler based on category entity insert?
            await _realtimeHubContext.Clients.All.SendAsync("CategoryCreated", categoryDto);

            return categoryDto;
        }

        [Authorize(RecipesPermissions.Categories.Delete)]
        public virtual async Task DeleteAsync(Guid id)
        {
            // TODO: Move business check to manager
            long recipeCount = await _recipeRepository
                .Where(x => x.CategoryId == id)
                .LongCountAsync();

            if (recipeCount > 0)
            {
                throw new BusinessException(RecipesDomainErrorCodes.Categories.DeleteNotAllowedWhenRecipesStillLinked)
                    .WithData(
                        name: "RecipeCount",
                        value: recipeCount);
            }

            await _categoryRepository.DeleteAsync(id);

            // TODO: Event handler based on category entity delete?
            await _realtimeHubContext.Clients.All.SendAsync("CategoryDeleted", id);
        }

        public virtual async Task<CategoryDto> GetAsync(Guid id)
        {
            CategoryDto categoryDto = await ObjectMapper
                .GetMapper()
                .ProjectTo<CategoryDto>(_categoryRepository)
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == id);

            if (categoryDto == null)
            {
                throw new EntityNotFoundException(
                    typeof(Category),
                    id);
            }

            return categoryDto;
        }

        public virtual async Task<PagedResultDto<CategoryListDto>> GetListAsync(CategoryListInputDto input)
        {
            // Filter
            IQueryable<Category> categoryQueryable = _categoryRepository
                .WhereIf(
                    !string.IsNullOrWhiteSpace(input.FilterText),
                    x => x.Name.Contains(input.FilterText) ||
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
            categoryQueryable = categoryQueryable.PageBy(
                input.SkipCount,
                input.MaxResultCount);

            return new PagedResultDto<CategoryListDto>()
            {
                TotalCount = totalCount,
                Items = await ObjectMapper.GetMapper()
                    .ProjectTo<CategoryListDto>(categoryQueryable)
                    .AsNoTracking()
                    .ToListAsync()
            };
        }

        public virtual async Task<PagedResultDto<LookupDto<Guid>>> GetLookupAsync(LookupInputDto input)
        {
            // Filter
            IQueryable<Category> categoryQueryable = _categoryRepository
                .WhereIf(
                    !string.IsNullOrWhiteSpace(input.FilterText),
                    x => x.Name.Contains(input.FilterText))
                .WhereIf(
                    input.Id.HasValue,
                    x => x.Id == input.Id);

            // Sort
            categoryQueryable = categoryQueryable.OrderBy(x => x.Name);

            // Total count
            long totalCount = await categoryQueryable.LongCountAsync();

            // Page
            categoryQueryable = categoryQueryable.PageBy(
                input.SkipCount,
                input.MaxResultCount);

            return new PagedResultDto<LookupDto<Guid>>()
            {
                TotalCount = totalCount,
                Items = await ObjectMapper.GetMapper()
                    .ProjectTo<LookupDto<Guid>>(categoryQueryable)
                    .AsNoTracking()
                    .ToListAsync()
            };
        }

        public virtual async Task<PagedResultDto<CategoryRecipeListDto>> GetRecipeListAsync(
            Guid id,
            CategoryRecipeListInputDto input)
        {
            // Filter
            IQueryable<Recipe> recipeQueryable = _recipeRepository
                .Where(x => x.CategoryId == id)
                .WhereIf(
                    !string.IsNullOrWhiteSpace(input.FilterText),
                    x => x.Name.Contains(input.FilterText));

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
        public virtual async Task<CategoryDto> UpdateAsync(
            Guid id,
            CategoryUpdateInputDto input)
        {
            Category category = await _categoryRepository.GetAsync(id);

            category.Name = input.Name;
            category.Description = input.Description;
            category.SortOrder = input.SortOrder;

            if (category.Photo != null && (input.Photo != null || input.DeletePhoto))
            {
                await _blobContainer.DeleteAsync(category.Photo.Id.ToString());

                category.Photo = null;
            }

            if (input.Photo != null)
            {
                Guid photoId = GuidGenerator.Create();

                await _blobContainer.SaveAsync(
                    photoId.ToString(),
                    Convert.FromBase64String(input.Photo.Data));

                category.Photo = new File(
                    photoId,
                    input.Photo.Name,
                    input.Photo.ContentType);
            }

            category = await _categoryRepository.UpdateAsync(
                category,
                autoSave: true);

            CategoryDto categoryDto = await GetAsync(category.Id);

            // TODO: Event handler based on category entity update?
            await _realtimeHubContext.Clients.All.SendAsync("CategoryUpdated", categoryDto);

            return categoryDto;
        }
    }
}