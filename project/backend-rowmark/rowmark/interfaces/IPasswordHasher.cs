using Microsoft.AspNetCore.Identity;
using rowmark.models;

namespace rowmark.interfaces;

public interface IPasswordHasher<in TUser> where TUser : class
{
    // Genera el hash para una contraseña
    string HashPassword(TUser user, string password);

    // Verifica si la contraseña coincide con el hash guardado
    PasswordVerificationResult VerifyHashedPassword(TUser user, string hashedPassword, string providedPassword);
}