using Microsoft.Extensions.DependencyInjection;

namespace rowmark.Modules.EngravingDepth;

public static class EngravingDepthModule 
{
    public static IServiceCollection AddEngravingDepthModule(this IServiceCollection services) 
    {
        services.AddScoped<EngravingDepthRepository>();
        services.AddScoped<EngravingDepthService>();

        return services;
    }
}