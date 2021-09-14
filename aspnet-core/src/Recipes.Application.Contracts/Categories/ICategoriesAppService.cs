using Recipes.Shared;
using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;

namespace Recipes.Categories
{
    public interface ICategoriesAppService
    {
        Task<CategoryDto> CreateAsync(CategoryCreateDto input);

        Task DeleteAsync(Guid id);

        Task<CategoryDto> GetAsync(Guid id);

        Task<PagedResultDto<CategoryListDto>> GetListAsync(GetCategoriesInput input);

        Task<PagedResultDto<LookupDto<Guid>>> GetLookupAsync(LookupRequestDto input);

        Task<CategoryDto> UpdateAsync(Guid id, CategoryUpdateDto input);
    }
}