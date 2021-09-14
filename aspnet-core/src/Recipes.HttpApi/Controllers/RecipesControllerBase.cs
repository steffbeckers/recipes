using Recipes.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace Recipes.Controllers
{
    /* Inherit your controllers from this class.
     */
    public abstract class RecipesControllerBase : AbpController
    {
        protected RecipesControllerBase()
        {
            LocalizationResource = typeof(RecipesResource);
        }
    }
}