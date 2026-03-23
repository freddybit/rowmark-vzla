namespace rowmark.models.entities;

public class Permission {
    
    // Attributes
    
    private int? _id;
    private string? _name;
    
    // Constructor #1
    public Permission() {}

    // Constructor #2
    public Permission(int? id, string? name) {
        _id = id;
        _name = name;
    }
    
    // Getter and Setter methods 

    public int? Id {
        get => _id;
        set => _id = value;
    }

    public string? Name {
        get => _name;
        set => _name = value;
    }
}