using System.Threading.Tasks;

namespace Recipes.Data
{
    public interface IRecipesDbSchemaMigrator
    {
        Task MigrateAsync();
    }
}
