using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Account;
using Volo.Abp.AspNetCore.SignalR;
using Volo.Abp.AutoMapper;
using Volo.Abp.BlobStoring;
using Volo.Abp.BlobStoring.Azure;
using Volo.Abp.Domain.Entities.Events.Distributed;
using Volo.Abp.FeatureManagement;
using Volo.Abp.Identity;
using Volo.Abp.Modularity;
using Volo.Abp.PermissionManagement;
using Volo.Abp.SettingManagement;
using Volo.Abp.TenantManagement;

namespace Recipes
{
    [DependsOn(
        typeof(AbpAccountApplicationModule),
        typeof(AbpAspNetCoreSignalRModule),
        typeof(AbpBlobStoringAzureModule),
        typeof(AbpFeatureManagementApplicationModule),
        typeof(AbpIdentityApplicationModule),
        typeof(AbpPermissionManagementApplicationModule),
        typeof(AbpSettingManagementApplicationModule),
        typeof(AbpTenantManagementApplicationModule),
        typeof(RecipesApplicationContractsModule),
        typeof(RecipesDomainModule))]
    public class RecipesApplicationModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<AbpAutoMapperOptions>(options =>
            {
                options.AddMaps<RecipesApplicationModule>();
            });

            Configure<AbpDistributedEntityEventOptions>(options =>
            {
                options.AutoEventSelectors.AddAll();
            });

            Configure<AbpBlobStoringOptions>(options =>
            {
                options.Containers.ConfigureDefault(container =>
                {
                    container.UseAzure(azure =>
                    {
                        IConfiguration configuration = context.Services.GetRequiredService<IConfiguration>();
                        azure.ConnectionString = configuration["BlobStorage:Azure:ConnectionString"];
                        azure.ContainerName = configuration["BlobStorage:Azure:ContainerName"];
                    });
                });
            });
        }
    }
}