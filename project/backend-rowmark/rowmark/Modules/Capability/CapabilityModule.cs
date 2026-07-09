using Microsoft.Extensions.DependencyInjection;

namespace rowmark.Modules.Capability;

public static class CapabilityModule 
{
    public static IServiceCollection AddCapabilityModule(this IServiceCollection services) 
    {
        services.AddScoped<CapabilityRepository>();
        services.AddScoped<CapabilityService>();

        return services;
    }
}