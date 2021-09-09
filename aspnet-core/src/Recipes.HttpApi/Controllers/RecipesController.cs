using Recipes.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace Recipes.Controllers
{
    /* Inherit your controllers from this class.
     */
    public abstract class RecipesController : AbpController
    {
        protected RecipesController()
        {
            LocalizationResource = typeof(RecipesResource);
        }
    }
}