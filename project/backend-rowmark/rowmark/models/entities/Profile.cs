namespace rowmark.models.entities;

public class Profile {

    // Attributes
    
    private int? _id;
    private string? _firstName;
    private string? _lastName;
    private string? _email;
    private string? _hashPassword;
    private List<Role>? _roles;

    private ProfileAdministrator? _profileAdministrator;
    
    // Constructor #1
    public Profile() {
        this._id = 0;
        this._firstName = "";
        this._lastName = "";
        this._email = "";
        this._hashPassword = "";
        this._roles = new List<Role>();
    }

    //Constructor #2
    public Profile(int? id, string? firstName, string? lastName, string? email, string? hashPassword, List<Role>? roles, ProfileAdministrator? profileAdministrator) {
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
        set {
            if (value < 0 || value > 99999999) 
                throw new Exception("Error: Inscribe un número de cedúla valido");
            _id = value;
        }
    }

    public string? FirstName {
        get => _firstName;
        set {
            if (value == null || value.Length < 2)
                throw new Exception("Error: Inscribe un nombre valido");
            _firstName = value;
        }
    }

    public string? LastName {
        get => _lastName;
        set {
            if (value == null || value.Length < 2)
                throw new Exception("Error: Inscribe un apellido valido");
            _lastName = value;
        }
    }

    public string? Email {
        get => _email;
        set => _email = value;
    }

    public string? HashPassword {
        get => _hashPassword;
        set => _hashPassword = value;
    }

    public List<Role>? Roles {
        get => _roles;
        set => _roles = value;
    }

    public ProfileAdministrator? ProfileAdministrator {
        get => _profileAdministrator;
        set => _profileAdministrator = value;
    }
}