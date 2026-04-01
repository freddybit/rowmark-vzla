using rowmark.interfaces;
using rowmark.models.dto;
using rowmark.models.entities;

namespace rowmark.services;

public class AuthService : IAuthService {
    
    public async Task<string?> LoginProfile(ProfileLoginDto request) {
        throw new NotImplementedException();
    }

    public async Task<Profile?> RegisterProfile(ProfileLoginDto request) {
        throw new NotImplementedException();
    }
}