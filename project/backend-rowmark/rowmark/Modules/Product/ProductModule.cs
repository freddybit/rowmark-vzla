using Microsoft.Extensions.DependencyInjection;

namespace rowmark.Modules.Product;

public static class ProductModule {
    public static IServiceCollection AddProductModule(this IServiceCollection services) {
        services.AddScoped<ProductRepository>();
        services.AddScoped<ProductService>();

        return services;
    }
}