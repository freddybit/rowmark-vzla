using rowmark.Modules.Materials.Entities;

namespace rowmark.Modules.Product.Entities;

public class Product {
    
    // Attributes
    
    public int ProductKey { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string ImgUrl { get; set; }
    public string ImgAlt { get; set; }
    public List<Color.Entities.Color>? Colors { get; set; } = new List<Color.Entities.Color>();
    public List<Material>? Materials { get; set; } = new List<Material>();
    public List<Finish.Entities.Finish>? Finishes { get; set; } = new List<Finish.Entities.Finish>();
    public List<Capability.Entities.Capability>? Capabilities { get; set; } = new List<Capability.Entities.Capability>();
    public List<Attribute.Entities.Attribute>? Attributes { get; set; } = new List<Attribute.Entities.Attribute>();
    
    // Constructor #1
    public Product() {
        ProductKey = 0;
        Name = "";
        Description = "";
        ImgUrl = "";
        ImgAlt = "";
    }

    // Constructor #2
    public Product(int productKey, string name, string description, string imgUrl, string imgAlt, List<Color.Entities.Color>? colors, List<Material>? materials, List<Finish.Entities.Finish>? finishes, List<Capability.Entities.Capability>? capabilities, List<Attribute.Entities.Attribute>? attributes) {
        ProductKey = productKey;
        Name = name;
        Description = description;
        ImgUrl = imgUrl;
        ImgAlt = imgAlt;
        Colors = colors;
        Materials = materials;
        Finishes = finishes;
        Capabilities = capabilities;
        Attributes = attributes;
    }

}