using Microsoft.AspNetCore.Mvc;
using Recipes.Recipes;
using System;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Application.Dtos;

namespace Recipes.Controllers.Recipes
{
    [RemoteService]
    [Area("app")]
    [ControllerName("Recipes")]
    [Route("api/recipes")]
    public class RecipesController : RecipesControllerBase, IRecipesAppService
    {
        private readonly IRecipesAppService _recipesAppService;

        public RecipesController(IRecipesAppService recipesAppService)
        {
            _recipesAppService = recipesAppService;
        }

        [HttpPost]
        public virtual Task<RecipeDto> CreateAsync(RecipeCreateDto input)
        {
            return _recipesAppService.CreateAsync(input);
        }

        [HttpDelete]
        [Route("{id}")]
        public virtual Task DeleteAsync(Guid id)
        {
            return _recipesAppService.DeleteAsync(id);
        }

        [HttpGet]
        [Route("{id}")]
        public virtual Task<RecipeDto> GetAsync(Guid id)
        {
            return _recipesAppService.GetAsync(id);
        }

        [HttpGet]
        public virtual Task<PagedResultDto<RecipeListDto>> GetListAsync(GetRecipesInput input)
        {
            return _recipesAppService.GetListAsync(input);
        }

        [HttpPut]
        [Route("{id}")]
        public virtual Task<RecipeDto> UpdateAsync(RecipeUpdateDto input)
        {
            return _recipesAppService.UpdateAsync(input);
        }
    }
}