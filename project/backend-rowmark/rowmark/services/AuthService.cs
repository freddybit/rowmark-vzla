using Microsoft.AspNetCore.Identity;
using rowmark.interfaces;
using rowmark.models.dto;
using rowmark.models.entities;
using rowmark.repositories.jsons;

namespace rowmark.services;

public class AuthService : IAuthService {
    
    private interfaces.IPasswordHasher<Profile> _passwordHasher;
    private readonly IAuthRepository _repository;
    private ITokenService _tokenService;

    public AuthService(interfaces.IPasswordHasher<Profile> passwordHasher,IAuthRepository repository,  ITokenService tokenService) {
        this._passwordHasher = passwordHasher;
        this._repository = repository;
        this._tokenService = tokenService;
    }
    
    public async Task<string?> LoginProfile(ProfileLoginDto request) {

        Profile profile = _repository.ReadProfile(request.Email);
        
        if (profile == null) throw new KeyNotFoundException();
        
        if (_passwordHasher.VerifyHashedPassword(profile, profile.HashPassword, request.Password) == PasswordVerificationResult.Failed)
            throw new Exception("Error: Contraseña incorrecta");
        
        return _tokenService.CreateToken(profile);
    }
    public async Task<Profile?> RegisterProfile(ProfileRegisterDto request) {
        
        Profile profile = new Profile();
        
        profile.Email = request.Email;
        if (request.Password != null) profile.HashPassword = _passwordHasher.HashPassword(profile, request.Password);

        _repository.Create(profile);
        
        return profile;
    }
    
}