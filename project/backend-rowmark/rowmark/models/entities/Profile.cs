namespace rowmark.models.entities;

public class Profile {

    // Attributes
    
    private int? _id;
    private string? _firstName;
    private string? _lastName;
    private string? _email;
    private string? _hashPassword;
    private List<Rol>? _roles;

    private ProfileAdministrator? _profileAdministrator;
    
    // Constructor #1
    public Profile() {}

    //Constructor #2
    public Profile(int? id, string? firstName, string? lastName, string? email, string? hashPassword, List<Rol>? roles, ProfileAdministrator? profileAdministrator) {
        _id = id;
        _firstName = firstName;
        _lastName = lastName;
        _email = email;
        _hashPassword = hashPassword;
        _roles = roles;
        _profileAdministrator = profileAdministrator;
    }

    // Getter and Setter Methods
    
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

    public string? HashPassword {
        get => _hashPassword;
        set => _hashPassword = value;
    }

    public List<Rol>? Roles {
        get => _roles;
        set => _roles = value;
    }

    public ProfileAdministrator? ProfileAdministrator {
        get => _profileAdministrator;
        set => _profileAdministrator = value;
    }
}