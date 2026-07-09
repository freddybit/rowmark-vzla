using Microsoft.Extensions.DependencyInjection;

namespace rowmark.Modules.Finish;

public static class FinishModule {
    public static IServiceCollection AddFinishModule(this IServiceCollection services) {
        services.AddScoped<FinishRepository>();
        services.AddScoped<FinishService>();

        return services;
    }
}