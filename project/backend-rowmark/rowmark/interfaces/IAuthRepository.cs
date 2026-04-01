using rowmark.models.entities;

namespace rowmark.interfaces;

public interface IAuthRepository {
    public Profile Create();
    public List<Profile> Read();
    public Profile Update();
    public Profile Delete();
}