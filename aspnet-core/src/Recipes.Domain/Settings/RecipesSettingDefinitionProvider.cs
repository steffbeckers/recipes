using Volo.Abp.Settings;

namespace Recipes.Settings
{
    public class RecipesSettingDefinitionProvider : SettingDefinitionProvider
    {
        public override void Define(ISettingDefinitionContext context)
        {
            //Define your own settings here. Example:
            //context.Add(new SettingDefinition(RecipesSettings.MySetting1));
        }
    }
}
