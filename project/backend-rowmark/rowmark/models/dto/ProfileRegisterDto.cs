using rowmark.models.entities;

namespace rowmark.models.dto;

public class ProfileRegisterDto {
    
    private int? _id;
    private string? _firstName;
    private string? _lastName;
    private string? _email;
    private string? _password;
    private List<string>? _roles;

    public ProfileRegisterDto(int? id, string? firstName, string? lastName, string? email, string? password, List<string> roles) {
        _id = id;
        _firstName = firstName;
        _lastName = lastName;
        _email = email;
        _password = password;
        _roles = roles;
    }
    
    public int? Id {
        get => _id;
        set => _id = value;
    }

    public string? FirstName {
        get => _firstName;
        set => _firstName = value;
    }

    public string? LastName {
        get => _lastName;
        set => _lastName = value;
    }

    public string? Email {
        get => _email;
        set => _email = value;
    }

    public string? Password {
        get => _password;
        set => _password = value;
    }

    public List<string>? Roles {
        get => _roles;
        set => _roles = value;
    }
}