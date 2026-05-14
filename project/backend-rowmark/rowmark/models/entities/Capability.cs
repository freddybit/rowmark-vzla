namespace rowmark.models.entities;

public class Capability {
    
    // Attributes
    
    public int CapabilityKey { get; set; }
    public string Name { get; set; }
    public List<Product>? Product { get; set; } = new List<Product>();
    
    // Constructor #1
    public Capability() {
        CapabilityKey = 0;
        Name = "";
    }

    // Constructor #2
    public Capability(int capabilitieKey, string name) {
        CapabilityKey = capabilitieKey;
        Name = name;
    }

}