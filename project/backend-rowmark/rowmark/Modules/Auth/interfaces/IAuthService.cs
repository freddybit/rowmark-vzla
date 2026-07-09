using System.Collections.Generic;
using System.Threading.Tasks;
using rowmark.models.dto;
using rowmark.Modules.Auth.dtos;
using rowmark.Modules.Auth.entities;

namespace rowmark.interfaces;

public interface IAuthService {
    
    Task<string?> LoginProfile(ProfileLoginDto request);
    
    Task<Profile?> RegisterProfile(ProfileRegisterDto request);
    
    Profile? GetProfileById(int id);
    
    List<Profile> GetAllProfiles();
    
    Task<Profile?> UpdateProfile(int id, ProfileUpdateDto request);
    
    void DeleteProfile(int id);
}