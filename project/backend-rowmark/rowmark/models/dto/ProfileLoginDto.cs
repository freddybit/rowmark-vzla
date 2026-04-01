namespace rowmark.models.dto;

public class ProfileLoginDto {
    
    private string? _email;
    private string? _password;

    public ProfileLoginDto(string? email, string? password) {
        _email = email;
        _password = password;
    }

    public string? Email {
        get => _email;
        set => _email = value;
    }

    public string? Password {
        get => _password;
        set => _password = value;
    }
}