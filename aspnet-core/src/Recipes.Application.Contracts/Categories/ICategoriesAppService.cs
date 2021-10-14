using Recipes.Shared;
using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;

namespace Recipes.Categories
{
    public interface ICategoriesAppService
    {
        Task<CategoryDto> CreateAsync(CategoryCreateInputDto input);

        Task DeleteAsync(Guid id);

        Task<CategoryDto> GetAsync(Guid id);

        Task<PagedResultDto<CategoryListDto>> GetListAsync(CategoryListInputDto input);

        Task<PagedResultDto<LookupDto<Guid>>> GetLookupAsync(LookupInputDto input);

        // TODO
        //Task<FileResult> GetPhotoAsync(Guid id);

        Task<PagedResultDto<CategoryRecipeListDto>> GetRecipeListAsync(
            Guid id,
            CategoryRecipeListInputDto input);

        Task<CategoryDto> UpdateAsync(
            Guid id,
            CategoryUpdateInputDto input);
    }
}