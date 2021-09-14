namespace Recipes.Permissions
{
    public static class RecipesPermissions
    {
        public const string GroupName = "Recipes";

        //Add your own permission names. Example:
        //public const string MyPermission1 = GroupName + ".MyPermission1";

        public class Categories
        {
            public const string Create = Default + ".Create";
            public const string Default = GroupName + ".Categories";
            public const string Delete = Default + ".Delete";
            public const string Edit = Default + ".Edit";
        }

        public class Recipes
        {
            public const string Create = Default + ".Create";
            public const string Default = GroupName + ".Recipes";
            public const string Delete = Default + ".Delete";
            public const string Edit = Default + ".Edit";
        }
    }
}