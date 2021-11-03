using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;

namespace Recipes.Recipes
{
    public interface IRecipesAppService
    {
        Task<RecipeDto> CreateAsync(RecipeCreateInputDto input);

        Task DeleteAsync(Guid id);

        Task<RecipeDto> GetAsync(Guid id);

        Task<PagedResultDto<RecipeListDto>> GetListAsync(RecipeListInputDto input);

        Task<RecipeDto> UpdateAsync(
            Guid id,
            RecipeUpdateInputDto input);
    }
}