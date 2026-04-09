using rowmark.models.entities;

namespace rowmark.interfaces;

public interface IRoleRepository {
    public bool Create(Role? role);
    public Role? ReadRole(string roleName);
    public bool Update(Role role);
    public bool Delete(Role role);
}