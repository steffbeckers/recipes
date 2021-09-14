using Recipes.Recipes;
using System;
using System.Threading.Tasks;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.TenantManagement;

namespace Recipes.Data.Seeding
{
    public class RecipesDataSeedContributor : IDataSeedContributor, ITransientDependency
    {
        private readonly IRecipeRepository _recipeRepository;
        private readonly ITenantRepository _tenantRepository;

        public RecipesDataSeedContributor(
            IRecipeRepository recipeRepository,
            ITenantRepository tenantRepository)
        {
            _recipeRepository = recipeRepository;
            _tenantRepository = tenantRepository;
        }

        public async Task SeedAsync(DataSeedContext context)
        {
            // Only seed tenant specific data
            if (!context.TenantId.HasValue)
            {
                return;
            }

            Tenant tenant = await _tenantRepository.GetAsync(context.TenantId.Value);

            if (tenant.Name == "didi")
            {
                if (await _recipeRepository.GetCountAsync() == 0)
                {
                    Recipe chocolateMousseRecipe = new Recipe(
                        id: Guid.Parse("4871217a-8e84-4cd5-bede-e05855953d63"),
                        categoryId: Guid.Parse("80684d3c-34f8-4f3d-b819-60dd4c9a9111"),
                        name: "Chocomousse",
                        tenantId: tenant.Id)
                    {
                        ForAmount = 4,
                        ForUnit = "Personen"
                    };

                    chocolateMousseRecipe.Ingredients.Add(
                        new RecipeIngredient(
                            id: Guid.Parse("74192427-dc66-4e09-979f-1c9699b1f19a"),
                            recipeId: chocolateMousseRecipe.Id,
                            name: "Fondantchocolade (min. 70% cacao)",
                            amount: 125,
                            tenantId: tenant.Id)
                        {
                            Unit = "gram",
                            SortOrder = 1
                        });

                    chocolateMousseRecipe.Ingredients.Add(
                        new RecipeIngredient(
                            id: Guid.Parse("54d14443-44e0-49d7-b5b8-c7e951da94fc"),
                            recipeId: chocolateMousseRecipe.Id,
                            name: "Eidooiers",
                            amount: 2,
                            tenantId: tenant.Id)
                        {
                            SortOrder = 2
                        });

                    chocolateMousseRecipe.Ingredients.Add(
                        new RecipeIngredient(
                            id: Guid.Parse("fff871c0-c62c-488d-96ea-72c6dd347bd9"),
                            recipeId: chocolateMousseRecipe.Id,
                            name: "Suiker",
                            amount: 60,
                            tenantId: tenant.Id)
                        {
                            Unit = "gram",
                            SortOrder = 3
                        });

                    chocolateMousseRecipe.Ingredients.Add(
                        new RecipeIngredient(
                            id: Guid.Parse("963501c8-aab7-4bf5-b6b8-adcee2dca7ed"),
                            recipeId: chocolateMousseRecipe.Id,
                            name: "Eiwitten",
                            amount: 3,
                            tenantId: tenant.Id)
                        {
                            SortOrder = 4
                        });

                    chocolateMousseRecipe.Ingredients.Add(
                        new RecipeIngredient(
                            id: Guid.Parse("c4e55039-487f-46db-b347-75aad10d5bde"),
                            recipeId: chocolateMousseRecipe.Id,
                            name: "Zout",
                            amount: 1,
                            tenantId: tenant.Id)
                        {
                            Unit = "snuifje",
                            SortOrder = 5
                        });

                    chocolateMousseRecipe.Ingredients.Add(
                        new RecipeIngredient(
                            id: Guid.Parse("2ff4a50f-232a-4d4a-a4f6-58149225e00d"),
                            recipeId: chocolateMousseRecipe.Id,
                            name: "Slagroom (35% V.G.)",
                            amount: 15,
                            tenantId: tenant.Id)
                        {
                            Unit = "ml",
                            SortOrder = 6
                        });

                    chocolateMousseRecipe.Ingredients.Add(
                        new RecipeIngredient(
                            id: Guid.Parse("eb5edd16-83d2-49c4-8a67-de348be79b8d"),
                            recipeId: chocolateMousseRecipe.Id,
                            name: "Meringue",
                            amount: 1,
                            tenantId: tenant.Id)
                        {
                            SortOrder = 7
                        });

                    chocolateMousseRecipe.Steps.Add(
                        new RecipeStep(
                            id: Guid.Parse("fce6768e-ba28-45e3-8bb2-598f1f6633b9"),
                            chocolateMousseRecipe.Id,
                            number: 1,
                            instructions: "Smelt de chocolade au bain-marie. Laat afkoelen tot 45 à 50°C.",
                            tenantId: tenant.Id));

                    chocolateMousseRecipe.Steps.Add(
                        new RecipeStep(
                            id: Guid.Parse("15e169bd-31ba-43d9-9bcf-2950ced5c9b5"),
                            chocolateMousseRecipe.Id,
                            number: 2,
                            instructions: "Klop de eidooiers met de suiker tot een dikke witte massa.",
                            tenantId: tenant.Id));

                    chocolateMousseRecipe.Steps.Add(
                        new RecipeStep(
                            id: Guid.Parse("88c0efc3-cbb4-47d1-acaa-03898916c58c"),
                            chocolateMousseRecipe.Id,
                            number: 3,
                            instructions: "Klop de eiwitten stijf met een snuifje zout. Klop in een andere kom de slagroom lobbig.",
                            tenantId: tenant.Id));

                    chocolateMousseRecipe.Steps.Add(
                        new RecipeStep(
                            id: Guid.Parse("497eb0e5-93ea-4d8c-a4d0-53267dd371f1"),
                            chocolateMousseRecipe.Id,
                            number: 4,
                            instructions: "Spatel de helft van de slagroom door het chocolademengsel, met langzame bewegingen van boven, langs de rand van de kom naar beneden, en vervolgens terug naar boven. Spatel daarna op dezelfde manier het ei-suikermengsel erdoor, en dan het eiwit. Eindig met de rest van de slagroom.",
                            tenantId: tenant.Id));

                    chocolateMousseRecipe.Steps.Add(
                        new RecipeStep(
                            id: Guid.Parse("cee45d76-87c2-434a-9efe-578784daf7d7"),
                            chocolateMousseRecipe.Id,
                            number: 5,
                            instructions: "Verdeel de chocolademousse over glaasjes, en laat minstens 3 uur opstijven in de koelkast. Werk af met kant-en-klare meringues of extra slagroom.",
                            tenantId: tenant.Id));

                    await _recipeRepository.InsertAsync(chocolateMousseRecipe);
                }
            }
        }
    }
}