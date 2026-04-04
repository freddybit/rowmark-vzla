using BCrypt.Net;
using Microsoft.AspNetCore.Identity;
using rowmark.models.entities;

namespace rowmark.models;

// 1. Limpiamos la declaración: Solo una interfaz genérica
public class BCryptHasher<TProfile> : IPasswordHasher<TProfile>, interfaces.IPasswordHasher<Profile> where TProfile : class {
    
    private const int WorkFactor = 12;

    public string HashPassword(TProfile user, string password) {
        return BCrypt.Net.BCrypt.HashPassword(password, WorkFactor);
    }
    public PasswordVerificationResult VerifyHashedPassword(TProfile user, string hashedPassword, string providedPassword) {
        bool  isValid = BCrypt.Net.BCrypt.Verify(providedPassword, hashedPassword);
        return isValid ? PasswordVerificationResult.Success : PasswordVerificationResult.Failed;
    }

    public string HashPassword(Profile user, string password) {
        return BCrypt.Net.BCrypt.HashPassword(password, WorkFactor);
    }
    public PasswordVerificationResult VerifyHashedPassword(Profile user, string hashedPassword, string providedPassword) {
        bool  isValid = BCrypt.Net.BCrypt.Verify(providedPassword, hashedPassword);
        return isValid ? PasswordVerificationResult.Success : PasswordVerificationResult.Failed;
    }
}