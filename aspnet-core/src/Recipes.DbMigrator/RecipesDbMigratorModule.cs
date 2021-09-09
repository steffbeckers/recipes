using Recipes.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.Modularity;

namespace Recipes.DbMigrator
{
    [DependsOn(
        typeof(AbpAutofacModule),
        typeof(RecipesEntityFrameworkCoreModule),
        typeof(RecipesApplicationContractsModule)
    )]
    public class RecipesDbMigratorModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<AbpBackgroundJobOptions>(options => options.IsJobExecutionEnabled = false);
        }
    }
}