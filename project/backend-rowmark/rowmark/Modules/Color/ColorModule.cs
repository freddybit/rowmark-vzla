using Microsoft.Extensions.DependencyInjection;

namespace rowmark.Modules.Color;

public static class ColorModule {
    public static IServiceCollection AddColorModule(this IServiceCollection services) {
        services.AddScoped<ColorRepository>();
        services.AddScoped<ColorService>();

        return services;
    }
}