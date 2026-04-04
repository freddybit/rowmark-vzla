using rowmark.models.entities;

namespace rowmark.interfaces;

public interface ITokenService {
    public string CreateToken(Profile profile);
    public bool IsTokenValid(Profile profile);
}