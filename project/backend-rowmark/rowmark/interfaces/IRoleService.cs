using rowmark.models.dto;
using rowmark.models.entities;

namespace rowmark.interfaces;

public interface IRoleService {
    public bool CreateRole(RoleDto request);
    public Role? ReadRole(string request);
    public bool UpdateRole(RoleDto request);
    public bool DeleteRole(RoleDto request);
    public bool ValidatePermission(RoleDto request);
}