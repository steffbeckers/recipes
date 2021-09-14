using System;
using System.Collections.Generic;
using System.Text;
using Recipes.Localization;
using Volo.Abp.Application.Services;

namespace Recipes
{
    /* Inherit your application services from this class.
     */
    public abstract class RecipesAppServiceBase : ApplicationService
    {
        protected RecipesAppServiceBase()
        {
            LocalizationResource = typeof(RecipesResource);
        }
    }
}
