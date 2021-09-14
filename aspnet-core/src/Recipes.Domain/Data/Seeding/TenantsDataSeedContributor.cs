using System.Threading.Tasks;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.TenantManagement;

namespace Recipes.Data.Seeding
{
    public class TenantsDataSeedContributor : IDataSeedContributor, ITransientDependency
    {
        private readonly TenantManager _tenantManager;
        private readonly ITenantRepository _tenantRepository;

        public TenantsDataSeedContributor(
            ITenantRepository tenantRepository,
            TenantManager tenantManager)
        {
            _tenantRepository = tenantRepository;
            _tenantManager = tenantManager;
        }

        public async Task SeedAsync(DataSeedContext context)
        {
            if (await _tenantRepository.GetCountAsync() > 0)
            {
                return;
            }

            Tenant didiTenant = await _tenantManager.CreateAsync("didi");
            await _tenantRepository.InsertAsync(didiTenant);
        }
    }
}