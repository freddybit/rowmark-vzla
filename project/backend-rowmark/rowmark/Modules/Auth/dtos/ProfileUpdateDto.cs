namespace rowmark.Modules.Auth.dtos;

public class ProfileUpdateDto {
    public string? FirstName { get; set; }
    public string? SecondName { get; set; }
    public string? FirstLastname { get; set; }
    public string? SecondLastname { get; set; }
    public int Place_PlaceKey { get; set; } 
    public string? Email { get; set; }
    public string? NewPassword { get; set; }
}
