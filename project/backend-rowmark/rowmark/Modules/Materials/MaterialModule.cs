using Microsoft.Extensions.DependencyInjection;

namespace rowmark.Modules.Materials;

public static class MaterialModule 
{
    public static IServiceCollection AddMaterialModule(this IServiceCollection services) {
        // Registramos el Repositorio para que esté disponible en el contenedor
        services.AddScoped<MaterialRepository>();
        
        // Registramos el Servicio para que el Controlador pueda usarlo
        services.AddScoped<MaterialService>();

        // Retornamos la colección para permitir el encadenamiento de métodos
        return services;
    }
}