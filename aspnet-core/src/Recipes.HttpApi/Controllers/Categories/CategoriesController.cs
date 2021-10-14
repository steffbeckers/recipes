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
        public virtual Task<CategoryDto> CreateAsync(CategoryCreateInputDto input)
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
        public virtual Task<PagedResultDto<CategoryListDto>> GetListAsync(CategoryListInputDto input)
        {
            return _categoriesAppService.GetListAsync(input);
        }

        [HttpGet]
        [Route("lookup")]
        public virtual Task<PagedResultDto<LookupDto<Guid>>> GetLookupAsync(LookupInputDto input)
        {
            return _categoriesAppService.GetLookupAsync(input);
        }

        // TODO
        //[HttpGet]
        //[Route("{id}/photo")]
        //public virtual Task<FileResult> GetPhotoAsync(Guid id)
        //{
        //    return _categoriesAppService.GetPhotoAsync(id);
        //}

        [HttpGet]
        [Route("{id}/recipes")]
        public virtual Task<PagedResultDto<CategoryRecipeListDto>> GetRecipeListAsync(
            Guid id,
            CategoryRecipeListInputDto input)
        {
            return _categoriesAppService.GetRecipeListAsync(
                id,
                input);
        }

        [HttpPut]
        [Route("{id}")]
        public virtual Task<CategoryDto> UpdateAsync(
            Guid id,
            CategoryUpdateInputDto input)
        {
            return _categoriesAppService.UpdateAsync(
                id,
                input);
        }
    }
}