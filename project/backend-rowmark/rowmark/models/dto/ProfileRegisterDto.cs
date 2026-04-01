namespace rowmark.models.dto;

public class ProfileRegisterDto {
    
    private string? _email;
    private string? _password;

    public ProfileRegisterDto(string? email, string? password) {
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