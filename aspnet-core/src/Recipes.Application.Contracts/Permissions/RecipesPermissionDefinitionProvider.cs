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

            // Define your own permissions here. Example:
            //recipesGroup.AddPermission(RecipesPermissions.MyPermission1, L("Permission:MyPermission1"));

            PermissionDefinition categoriesPermission = recipesGroup.AddPermission(RecipesPermissions.Categories.Default, L("Permission:Categories"));
            categoriesPermission.AddChild(RecipesPermissions.Categories.Create, L("Permission:Create"));
            categoriesPermission.AddChild(RecipesPermissions.Categories.Edit, L("Permission:Edit"));
            categoriesPermission.AddChild(RecipesPermissions.Categories.Delete, L("Permission:Delete"));

            PermissionDefinition recipesPermission = recipesGroup.AddPermission(RecipesPermissions.Recipes.Default, L("Permission:Recipes"));
            recipesPermission.AddChild(RecipesPermissions.Recipes.Create, L("Permission:Create"));
            recipesPermission.AddChild(RecipesPermissions.Recipes.Edit, L("Permission:Edit"));
            recipesPermission.AddChild(RecipesPermissions.Recipes.Delete, L("Permission:Delete"));
        }

        private static LocalizableString L(string name)
        {
            return LocalizableString.Create<RecipesResource>(name);
        }
    }
}