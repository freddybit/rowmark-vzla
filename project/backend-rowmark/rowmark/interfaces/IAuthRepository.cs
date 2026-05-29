using rowmark.models.entities;

namespace rowmark.interfaces;

public interface IAuthRepository {
    
    public bool Exists(int? id);
    public bool Exists(string? email);
    public Profile Create(Profile profile);
    public List<Profile> ReadProfiles();
    public Profile? ReadProfile(int id);
    public Profile? ReadProfile(string email);
    public Profile Update(Profile profile);
    public void Delete(int id);
}