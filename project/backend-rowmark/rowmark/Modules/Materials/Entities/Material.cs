namespace rowmark.Modules.Materials.Entities;

public class Material {
    
    // Attributes
    
    public int MaterialKey { get; set; }
    public string ImgUrl { get; set; }
    public string Name { get; set; }
    public string Category { get; set; }
    public string Description { get; set; }
    public List<Product.Entities.Product>? Product { get; set; } = new List<Product.Entities.Product>();
    
    // Constructor #1
    public Material() {
        MaterialKey = 0;
        ImgUrl = "";
        Name = "";
        Category = "";
        Description = "";
    }

    // Constructor #2
    public Material(int materialKey, string imgUrl, string name, string category, string description) {
        MaterialKey = materialKey;
        ImgUrl = imgUrl;
        Name = name;
        Category = category;
        Description = description;
    }
}