using Microsoft.Extensions.DependencyInjection;
using rowmark.interfaces;
using rowmark.services;
using rowmark.models.entities;
using Microsoft.AspNetCore.Identity;
using rowmark.models;
using rowmark.Modules.Auth;
using rowmark.Modules.Auth.entities;
using rowmark.Modules.Auth.interfaces;

namespace rowmark.modules.auth;

public static class AuthModule {
    public static IServiceCollection AddAuthModule(this IServiceCollection services) {
        // 1. Registramos el Repositorio (Postgres/Supabase con Dapper)
        services.AddScoped<IAuthRepository, AuthRepositoryPostgre>();

        // 2. Registramos el Servicio de Autenticación
        services.AddScoped<IAuthService, AuthService>();

        // 3. Registramos el Hasheador de contraseñas nativo de .NET que usa tu servicio
        services.AddScoped<interfaces.IPasswordHasher<Profile>, BCryptHasher<Profile>>();

        // 4. Registramos tu servicio de Tokens (JWT) si ya lo tienes creado
        services.AddScoped<ITokenService, TokenService>();

        return services;
    }
}