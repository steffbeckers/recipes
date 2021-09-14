using Microsoft.AspNetCore.Mvc;
using Recipes.Categories;
using Recipes.Shared;
using System;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Application.Dtos;

namespace Recipes.Controllers.Categories
{
    [RemoteService]
    [Area("app")]
    [ControllerName("Categories")]
    [Route("api/categories")]
    public class CategoriesController : RecipesControllerBase, ICategoriesAppService
    {
        private readonly ICategoriesAppService _categoriesAppService;

        public CategoriesController(ICategoriesAppService categoriesAppService)
        {
            _categoriesAppService = categoriesAppService;
        }

        [HttpPost]
        public virtual Task<CategoryDto> CreateAsync(CategoryCreateDto input)
        {
            return _categoriesAppService.CreateAsync(input);
        }

        [HttpDelete]
        [Route("{id}")]
        public virtual Task DeleteAsync(Guid id)
        {
            return _categoriesAppService.DeleteAsync(id);
        }

        [HttpGet]
        [Route("{id}")]
        public virtual Task<CategoryDto> GetAsync(Guid id)
        {
            return _categoriesAppService.GetAsync(id);
        }

        [HttpGet]
        public virtual Task<PagedResultDto<CategoryListDto>> GetListAsync(GetCategoriesInput input)
        {
            return _categoriesAppService.GetListAsync(input);
        }

        [HttpGet]
        [Route("lookup")]
        public virtual Task<PagedResultDto<LookupDto<Guid>>> GetLookupAsync(LookupRequestDto input)
        {
            return _categoriesAppService.GetLookupAsync(input);
        }

        [HttpPut]
        [Route("{id}")]
        public virtual Task<CategoryDto> UpdateAsync(Guid id, CategoryUpdateDto input)
        {
            return _categoriesAppService.UpdateAsync(id, input);
        }
    }
}