namespace rowmark.models.entities;

public class Rol {
    private int _idRol;
    private string? _nameRol;
    private List<Permission>? _permissions;

    public Rol() {}

    public Rol(int idRol, string nameRol, List<Permission> permissions) {
        _idRol = idRol;
        _nameRol = nameRol;
        _permissions = permissions;
    }

    public int IdRol {
        get => _idRol;
        set => _idRol = value;
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