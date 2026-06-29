using rowmark.models.entities;

namespace rowmark.Modules.Capability.Entities;

public class Capability {
    
    // Attributes
    
    public int CapabilityKey { get; set; }
    public string Name { get; set; }
    public string ImgUrl { get; set; }
    public string Description { get; set; }
    public string Category { get; set; }
    public List<Product.Entities.Product>? Product { get; set; } = new List<Product.Entities.Product>();
    
    // Constructor #1
    public Capability() {
        CapabilityKey = 0;
        Name = "";
        ImgUrl = "";
        Description = "";
        Category = "";
    }

    // Constructor #2
    public Capability(int capabilityKey, string name, string imgUrl, string description, string category) {
        CapabilityKey = capabilityKey;
        Name = name;
        ImgUrl = imgUrl;
        Description = description;
        Category = category;
    }
}