using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace Recipes.Data
{
    /* This is used if database provider does't define
     * IRecipesDbSchemaMigrator implementation.
     */
    public class NullRecipesDbSchemaMigrator : IRecipesDbSchemaMigrator, ITransientDependency
    {
        public Task MigrateAsync()
        {
            return Task.CompletedTask;
        }
    }
}