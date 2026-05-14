namespace rowmark.models.entities;

public class Permission {
    
    // Attributes
    
    public int PermissionKey { get; set; }
    public string Name { get; set; }
    
    // Constructor #1
    public Permission() {
        PermissionKey = 0;
        Name = "";
    }

    // Constructor #2
    public Permission(int permissionKey, string name) {
        PermissionKey = permissionKey;
        Name = name;
    }

}