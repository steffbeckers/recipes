using Recipes.Categories;
using System.Threading.Tasks;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.TenantManagement;

namespace Recipes.Data.Seeding
{
    public class CategoriesDataSeedContributor : IDataSeedContributor, ITransientDependency
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly ITenantRepository _tenantRepository;

        public CategoriesDataSeedContributor(
            ICategoryRepository categoryRepository,
            ITenantRepository tenantRepository)
        {
            _categoryRepository = categoryRepository;
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
                // TODO
            }
        }
    }
}