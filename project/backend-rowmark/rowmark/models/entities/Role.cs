namespace rowmark.models.entities;

public class Role {
    
    // Attributes
    
    public int RoleKey { get; set; }
    public string Name { get; set; }
    public string? Description { get; set; }

    // Constructor #1
    public Role() {
        RoleKey = 0;
        Name = "";
    }

    // Constructor #2
    public Role(int roleKey, string name, string? description) {
        RoleKey = roleKey;
        Name = name;
        Description = description;
    }

}