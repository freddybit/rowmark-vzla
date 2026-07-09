using rowmark.Modules.Auth.entities;

namespace rowmark.interfaces;

public interface ITokenService {
    public string CreateToken(Profile profile);
    public bool IsTokenValid(Profile profile);
}