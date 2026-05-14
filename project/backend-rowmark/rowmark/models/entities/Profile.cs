namespace rowmark.models.entities;

public class Profile {

    // Attributes

    public int ProfileKey { get; set; }
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string? SecondName { get; set; }
    public string FirstLastname { get; set; }
    public string? SecondLastname { get; set; }
    public string Email { get; set; }
    public string HashPassword { get; set; }
    public int Place_PlaceKey { get; set; }
    public Place Place { get; set; }
    
    // Constructor #1
    public Profile() {
        ProfileKey = 0;
        Id = 0;
        FirstName = "";
        SecondName = "";
        FirstLastname = "";
        SecondLastname = "";
        Email = "";
        HashPassword = "";
        Place_PlaceKey = 0;
        Place = new Place();
    }

    //Constructor #2
    public Profile(int profileKey, int id, string firstName, string? secondName, string firstLastname, string? secondLastname, string email, string hashPassword, int placePlaceKey, Place place) {
        ProfileKey = profileKey;
        Id = id;
        FirstName = firstName;
        SecondName = secondName;
        FirstLastname = firstLastname;
        SecondLastname = secondLastname;
        Email = email;
        HashPassword = hashPassword;
        Place_PlaceKey = placePlaceKey;
        Place = place;
    }

}