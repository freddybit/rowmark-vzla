using rowmark.interfaces;
using rowmark.models.dto;
using rowmark.models.entities;

namespace rowmark.services;

public class RoleService : IRoleService {

    private readonly IRoleRepository _repository;

    public RoleService(IRoleRepository repository) {
        _repository = repository;
    }
    
    public bool CreateRole(RoleDto request) {
        if (request == null)
            throw new NullReferenceException("Error: No se paso una petición valida");

        Role role = new Role();
        
        role.NameRol = request.NameRol;
        role.Permissions = request.Permissions;

        bool bol = _repository.Create(role);
        return bol;
    }

    public Role? ReadRole(string? request) {
        if (request == null)
            throw new NullReferenceException("Error: No se paso una petición valida");

        Role? role = _repository.ReadRole(request);
        return role != null ? role : new Role();
    }

    public bool UpdateRole(RoleDto request) {
        throw new NotImplementedException();
    }

    public bool DeleteRole(RoleDto request) {
        throw new NotImplementedException();
    }

    public bool ValidatePermission(RoleDto request) {
        throw new NotImplementedException();
    }
    
}