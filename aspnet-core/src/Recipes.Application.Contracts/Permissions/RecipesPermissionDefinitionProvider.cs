using Recipes.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace Recipes.Permissions
{
    public class RecipesPermissionDefinitionProvider : PermissionDefinitionProvider
    {
        public override void Define(IPermissionDefinitionContext context)
        {
            var myGroup = context.AddGroup(RecipesPermissions.GroupName);
            //Define your own permissions here. Example:
            //myGroup.AddPermission(RecipesPermissions.MyPermission1, L("Permission:MyPermission1"));
        }

        private static LocalizableString L(string name)
        {
            return LocalizableString.Create<RecipesResource>(name);
        }
    }
}
