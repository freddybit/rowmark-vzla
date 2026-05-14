namespace rowmark.models.entities;

public class Material {
    
    // Attributes
    
    public int MaterialKey { get; set; }
    public string Name { get; set; }
    public List<Product>? Product { get; set; } = new List<Product>();
    
    // Constructor #1
    public Material() {
        MaterialKey = 0;
        Name = "";
    }

    // Constructor #2
    public Material(int materialKey, string name) {
        MaterialKey = materialKey;
        Name = name;
    }

}