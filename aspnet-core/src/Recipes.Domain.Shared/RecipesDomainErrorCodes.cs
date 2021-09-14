namespace Recipes
{
    public static class RecipesDomainErrorCodes
    {
        /* You can add your business exception error codes here, as constants */

        public static class Recipes
        {
            public const string AtLeastOneIngredientIsRequired = _prefix + nameof(AtLeastOneIngredientIsRequired);
            public const string AtLeastOneStepIsRequired = _prefix + nameof(AtLeastOneStepIsRequired);
            private const string _prefix = nameof(Recipes) + ":";
        }
    }
}