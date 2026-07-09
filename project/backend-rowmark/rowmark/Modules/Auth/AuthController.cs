using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using rowmark.interfaces;
using rowmark.models.dto;
using rowmark.Modules.Auth.dtos;
using rowmark.Modules.Auth.entities;

namespace rowmark.Modules.Auth;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase {
    
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService) {
        _authService = authService;
    }

    // --- AUTENTICACIÓN Y REGISTRO ---

    [HttpPost("register")]
    public async Task<ActionResult<Profile>> RegisterProfile([FromBody] ProfileRegisterDto request) {
        try {
            // Añadido el await y el async Task al método
            var response = await _authService.RegisterProfile(request);
            return Ok(response); 
        } catch (Exception ex) {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPost("login")]
    public async Task<ActionResult<string>> LoginProfile([FromBody] ProfileLoginDto request) {
        try {
            // Añadido el await y el async Task al método
            var response = await _authService.LoginProfile(request);
            return Ok(new { token = response });
        } catch (Exception ex) {
            return Unauthorized(new { message = ex.Message });
        }
    }
    
    // --- CRUD PERFILES ---

    [HttpGet("{id}")]
    public ActionResult<Profile> GetProfile(int id) {
        try {
            // Este método en el servicio era síncrono
            var response = _authService.GetProfileById(id);
            return Ok(response);
        } catch (Exception ex) {
            return NotFound(new { message = ex.Message });
        }
    }

    [HttpGet]
    public ActionResult<List<Profile>> GetAllProfiles() {
        var response = _authService.GetAllProfiles();
        return Ok(response);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Profile>> UpdateProfile(int id, [FromBody] ProfileUpdateDto request) {
        try {
            var response = await _authService.UpdateProfile(id, request);
            return Ok(response);
        } catch (KeyNotFoundException ex) {
            return NotFound(new { message = ex.Message });
        } catch (Exception ex) {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    public ActionResult DeleteProfile(int id) {
        try {
            _authService.DeleteProfile(id);
            return NoContent();
        } catch (KeyNotFoundException ex) {
            return NotFound(new { message = ex.Message });
        } catch (Exception ex) {
            return BadRequest(new { message = ex.Message });
        }
    }

    [Authorize]
    [HttpGet("me")]
    public ActionResult<Profile> GetMyProfile() {
        try {
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("id");

            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
                return Unauthorized(new { message = "El token no es válido o no contiene la identificación del usuario." });
            
            var response = _authService.GetProfileById(userId);
            
            if (response == null)
                return NotFound(new { message = "Usuario no encontrado en la base de datos." });
            
            return Ok(response);
            
        } catch (Exception ex) {
            return BadRequest(new { message = $"Error al obtener el perfil: {ex.Message}" });
        }
    }
    
}