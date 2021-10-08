using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Entities.Events.Distributed;
using Volo.Abp.EventBus.Distributed;
using Volo.Abp.IdentityServer.Clients;
using Volo.Abp.TenantManagement;
using Volo.Abp.Uow;

namespace Recipes.Tenants
{
    public class TenantCreatedEventHandler : IDistributedEventHandler<EntityCreatedEto<TenantEto>>, ITransientDependency
    {
        private readonly IClientRepository _clientRepository;
        private readonly IConfiguration _configuration;

        public TenantCreatedEventHandler(
            IClientRepository clientRepository,
            IConfiguration configuration)
        {
            _clientRepository = clientRepository;
            _configuration = configuration;
        }

        [UnitOfWork]
        public async Task HandleEventAsync(EntityCreatedEto<TenantEto> eventData)
        {
            string multiTenancyDomainFormat = _configuration["App:MultiTenancyDomainFormat"];
            if (string.IsNullOrEmpty(multiTenancyDomainFormat))
            {
                return;
            }

            // TODO: Clients update doesn't save the added redirect URI's

            Client appClient = await _clientRepository.FindByClientIdAsync("Recipes_App");

            if (appClient != null)
            {
                appClient.AddRedirectUri(string.Format($"https://{multiTenancyDomainFormat}", eventData.Entity.Name));

                await _clientRepository.UpdateAsync(appClient);
            }

            Client swaggerClient = await _clientRepository.FindByClientIdAsync("Recipes_Swagger");

            if (swaggerClient != null)
            {
                swaggerClient.AddRedirectUri(string.Format($"https://{multiTenancyDomainFormat}/swagger/oauth2-redirect.html", eventData.Entity.Name));

                await _clientRepository.UpdateAsync(swaggerClient);
            }
        }
    }
}