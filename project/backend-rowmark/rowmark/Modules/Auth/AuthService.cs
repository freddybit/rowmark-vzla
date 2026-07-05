using Microsoft.AspNetCore.Identity;
using rowmark.interfaces;
using rowmark.models.dto;
using rowmark.models.entities;
using rowmark.Modules.Auth.dtos;
using rowmark.Modules.Auth.entities;
using rowmark.Modules.Auth.interfaces;

namespace rowmark.Modules.Auth;

public class AuthService : IAuthService {
    
    private readonly rowmark.interfaces.IPasswordHasher<Profile> _passwordHasher;
    private readonly IAuthRepository _repository;
    private readonly ITokenService _tokenService;

    public AuthService(rowmark.interfaces.IPasswordHasher<Profile> passwordHasher,IAuthRepository repository,  ITokenService tokenService) {
        this._passwordHasher = passwordHasher;
        this._repository = repository;
        this._tokenService = tokenService;
    }
    
    public async Task<string?> LoginProfile(ProfileLoginDto request) {
        
        if (request == null) throw new ArgumentNullException(nameof(request));

        Profile profile = _repository.ReadProfile(request.Email);
        
        if (profile == null) throw new KeyNotFoundException();
        
        if (_passwordHasher.VerifyHashedPassword(profile, profile.HashPassword, request.Password) == PasswordVerificationResult.Failed)
            throw new Exception("Error: Contraseña incorrecta");
        
        return _tokenService.CreateToken(profile);
    }
    
    public async Task<Profile?> RegisterProfile(ProfileRegisterDto request) {
        Profile profile = new Profile();
        profile.Id = request.Id;
        profile.FirstName = request.FirstName!;
        profile.SecondName = request.SecondName;
        profile.FirstLastname = request.FirstLastname!;
        profile.SecondLastname = request.SecondLastname;
        profile.Email = request.Email!;
        profile.Place_PlaceKey = request.Place_PlaceKey;
        profile.Phone = request.Phone;
        if (request.Password != null) 
            profile.HashPassword = _passwordHasher.HashPassword(profile, request.Password);

        _repository.Create(profile);
        return profile;
    }
    
    // --- LECTURA ---
    
    public Profile? GetProfileById(int id) {
        var profile = _repository.ReadProfile(id);
        if (profile == null) throw new KeyNotFoundException("Error: El perfil solicitado no existe.");
        
        // Aquí podrías limpiar el HashPassword antes de enviarlo al frontend si lo deseas
        return profile;
    }

    public List<Profile> GetAllProfiles() {
        return _repository.ReadProfiles();
    }

    // --- ACTUALIZACIÓN ---
    
    public async Task<Profile?> UpdateProfile(int id, ProfileUpdateDto request) {
        if (request == null) throw new ArgumentNullException(nameof(request));

        // 1. Verificamos que el perfil exista
        Profile existingProfile = _repository.ReadProfile(id);
        if (existingProfile == null) throw new KeyNotFoundException("Error: No se puede actualizar un perfil que no existe.");

        // 2. Verificamos que si quiere cambiar el email, no esté tomado por otro usuario
        if (existingProfile.Email != request.Email && _repository.Exists(request.Email)) {
            throw new Exception("Error: El nuevo correo electrónico ya está en uso por otro perfil.");
        }

        // 3. Mapeamos los nuevos datos (si vienen nulos en el DTO, conservamos los viejos)
        existingProfile.FirstName = request.FirstName ?? existingProfile.FirstName;
        existingProfile.SecondName = request.SecondName ?? existingProfile.SecondName;
        existingProfile.FirstLastname = request.FirstLastname ?? existingProfile.FirstLastname;
        existingProfile.SecondLastname = request.SecondLastname ?? existingProfile.SecondLastname;
        
        if (request.Place_PlaceKey > 0) {
            existingProfile.Place_PlaceKey = request.Place_PlaceKey;
        }

        if (!string.IsNullOrWhiteSpace(request.Email)) {
            existingProfile.Email = request.Email;
        }

        // 4. Si envía una nueva contraseña, la hasheamos. Si no, mantenemos la anterior.
        if (!string.IsNullOrWhiteSpace(request.NewPassword)) {
            existingProfile.HashPassword = _passwordHasher.HashPassword(existingProfile, request.NewPassword);
        }

        // 5. Guardamos en base de datos
        return _repository.Update(existingProfile);
    }

    // --- BORRADO ---
    
    public void DeleteProfile(int id) {
        if (!_repository.Exists(id)) {
            throw new KeyNotFoundException("Error: No se puede eliminar un perfil que no existe.");
        }
        
        _repository.Delete(id);
    }
    
}