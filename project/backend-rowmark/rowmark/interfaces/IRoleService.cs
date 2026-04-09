using rowmark.models.dto;

namespace rowmark.interfaces.services;

public interface IRoleService {
    public bool CreateRole(RoleDto request);
    public bool UpdateRole(RoleDto request);
    public bool DeleteRole(RoleDto request);
    public bool ValidatePermission(RoleDto request);
}