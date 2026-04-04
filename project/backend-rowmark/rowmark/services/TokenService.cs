using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using rowmark.interfaces;
using rowmark.models.entities;

namespace rowmark.services;

public class TokenService : ITokenService {
    
    private IConfiguration _configuration;

    public TokenService(IConfiguration configuration) {
        this._configuration = configuration;
    }
    
    public string CreateToken(Profile profile) {
        
        if (profile == null) throw new ArgumentNullException(nameof(profile));
        
        var claims = new List<Claim> {
            new Claim(ClaimTypes.NameIdentifier, profile.Id.ToString()),
            new Claim(ClaimTypes.Email, profile.Email),
            new Claim(ClaimTypes.Role, profile.Roles.ToString())
        };

        foreach (var role in profile.Roles) {
            claims.Add(new Claim(ClaimTypes.Role, role.ToString()));
        }
        
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetValue<string>("AppSettings:Token")!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);
        var tokenDescriptor = new JwtSecurityToken(
            issuer: _configuration.GetValue<string>("AppSettings:Issuer"),
            audience: _configuration.GetValue<string>("AppSettings:Audience"),
            claims: claims,
            expires: DateTime.UtcNow.AddDays(1),
            signingCredentials: creds
        ); 

        return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
    }
    
    public bool IsTokenValid(Profile profile) {
        throw new NotImplementedException();
    }
    
}