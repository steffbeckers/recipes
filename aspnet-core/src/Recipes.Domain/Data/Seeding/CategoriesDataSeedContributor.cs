using Recipes.Categories;
using System;
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
                if (await _categoryRepository.GetCountAsync() == 0)
                {
                    Category dinnerCategory = new Category(
                        id: Guid.Parse("ba44bc2d-8c35-40ad-961e-515817b62eb1"),
                        name: "Hoofdgerechten",
                        tenantId: tenant.Id)
                    {
                        SortOrder = 1
                    };
                    await _categoryRepository.InsertAsync(dinnerCategory);

                    Category saladsCategory = new Category(
                        id: Guid.Parse("77021ea6-5547-4d53-88b5-dc2a81dc7f13"),
                        name: "Slaatjes",
                        tenantId: tenant.Id)
                    {
                        SortOrder = 2
                    };
                    await _categoryRepository.InsertAsync(saladsCategory);

                    Category dessertsCategory = new Category(
                        id: Guid.Parse("80684d3c-34f8-4f3d-b819-60dd4c9a9111"),
                        name: "Desserten",
                        tenantId: tenant.Id)
                    {
                        SortOrder = 3
                    };
                    await _categoryRepository.InsertAsync(dessertsCategory);
                }
            }
        }
    }
}