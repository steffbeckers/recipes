using Recipes.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace Recipes.Permissions
{
    public class RecipesPermissionDefinitionProvider : PermissionDefinitionProvider
    {
        public override void Define(IPermissionDefinitionContext context)
        {
            PermissionGroupDefinition recipesGroup = context.AddGroup(RecipesPermissions.GroupName);
            //Define your own permissions here. Example:
            //myGroup.AddPermission(RecipesPermissions.MyPermission1, L("Permission:MyPermission1"));

            PermissionDefinition addressPermission = recipesGroup.AddPermission(RecipesPermissions.Recipes.Default, L("Permission:Recipes"));
            addressPermission.AddChild(RecipesPermissions.Recipes.Create, L("Permission:Create"));
            addressPermission.AddChild(RecipesPermissions.Recipes.Edit, L("Permission:Edit"));
            addressPermission.AddChild(RecipesPermissions.Recipes.Delete, L("Permission:Delete"));
        }

        private static LocalizableString L(string name)
        {
            return LocalizableString.Create<RecipesResource>(name);
        }
    }
}