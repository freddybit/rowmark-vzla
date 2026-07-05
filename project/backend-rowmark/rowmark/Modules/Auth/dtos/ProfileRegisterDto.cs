namespace rowmark.Modules.Auth.dtos;

public class ProfileRegisterDto {
    public int? Id { get; set; }
    public string? FirstName { get; set; }
    public string? SecondName { get; set; }
    public string? FirstLastname { get; set; }
    public string? SecondLastname { get; set; }
    public string? Email { get; set; }
    public string? Password { get; set; } 
    public string? Phone { get; set; }
    public int Place_PlaceKey { get; set; }
    public List<string>? Roles { get; set; }
}