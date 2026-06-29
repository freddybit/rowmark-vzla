using Microsoft.Extensions.DependencyInjection;

namespace rowmark.Modules.SheetSize;

public static class SheetSizeModule 
{
    public static IServiceCollection AddSheetSizeModule(this IServiceCollection services) 
    {
        services.AddScoped<SheetSizeRepository>();
        services.AddScoped<SheetSizeService>();

        return services;
    }
}