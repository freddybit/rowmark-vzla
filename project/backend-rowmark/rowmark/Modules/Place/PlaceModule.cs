using Microsoft.Extensions.DependencyInjection;

namespace rowmark.Modules.Place;

public static class PlaceModule 
{
    public static IServiceCollection AddPlaceModule(this IServiceCollection services) 
    {
        services.AddScoped<PlaceRepository>();
        services.AddScoped<PlaceService>();

        return services;
    }
}