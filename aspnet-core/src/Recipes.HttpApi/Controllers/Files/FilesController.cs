using Microsoft.AspNetCore.Mvc;
using Recipes.Files;
using System;
using System.Threading.Tasks;
using Volo.Abp;

namespace Recipes.Controllers.Files
{
    [RemoteService]
    [Area("app")]
    [ControllerName("Files")]
    [Route("api/files")]
    public class FilesController : RecipesControllerBase
    {
        private readonly IFilesAppService _filesAppService;

        public FilesController(IFilesAppService filesAppService)
        {
            _filesAppService = filesAppService;
        }

        [HttpGet]
        [Route("{id}")]
        public virtual async Task<IActionResult> GetAsync(Guid id)
        {
            byte[] file = await _filesAppService.GetAsync(id);

            if (file == null)
            {
                return NoContent();
            }

            return File(file, "application/octet-stream", id.ToString());
        }
    }
}