using Microsoft.Extensions.DependencyInjection;

namespace rowmark.Modules.Attribute;

public static class AttributeModule 
{
    public static IServiceCollection AddAttributeModule(this IServiceCollection services) 
    {
        services.AddScoped<AttributeRepository>();
        services.AddScoped<AttributeService>();

        return services;
    }
}