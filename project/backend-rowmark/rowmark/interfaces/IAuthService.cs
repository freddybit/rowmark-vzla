using rowmark.models.dto;
using rowmark.models.entities;

namespace rowmark.interfaces;

public interface IAuthService {
    public Task<string?> LoginProfile(ProfileLoginDto request);
    public Task<Profile?> RegisterProfile(ProfileLoginDto request);
}