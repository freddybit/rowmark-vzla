using rowmark.models.entities;

namespace rowmark.models.dto;

public class RoleDto {
    
    private string? _nameRol;
    private List<Permission>? _permissions;

    public RoleDto(string? nameRol, List<Permission>? permissions) {
        _nameRol = nameRol;
        _permissions = permissions;
    }

    public string? NameRol {
        get => _nameRol;
        set => _nameRol = value;
    }

    public List<Permission>? Permissions {
        get => _permissions;
        set => _permissions = value;
    }
}