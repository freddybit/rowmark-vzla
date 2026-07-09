using rowmark.Modules.Auth.entities;

namespace rowmark.Modules.Auth.interfaces;

public interface IAuthRepository {
    public bool Exists(decimal? id);
    public bool Exists(string? email);
    public Profile Create(Profile profile);
    public List<Profile> ReadProfiles();
    public Profile? ReadProfile(decimal id);
    public Profile? ReadProfile(string email);
    public Profile Update(Profile profile);
    public void Delete(decimal id);
}