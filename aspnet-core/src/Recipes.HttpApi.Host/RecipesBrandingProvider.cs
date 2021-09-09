using Volo.Abp.DependencyInjection;
using Volo.Abp.Ui.Branding;

namespace Recipes
{
    [Dependency(ReplaceServices = true)]
    public class RecipesBrandingProvider : DefaultBrandingProvider
    {
        public override string AppName => "Recipes";
    }
}
