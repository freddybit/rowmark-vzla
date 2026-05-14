using System.Drawing;

namespace rowmark.models.entities;

public class Product {
    
    // Attributes
    
    public int ProductKey { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string ImgUrl { get; set; }
    public string ImgAlt { get; set; }
    public List<Color>? Colors { get; set; } = new List<Color>();
    public List<Material>? Materials { get; set; } = new List<Material>();
    public List<Finish>? Finishes { get; set; } = new List<Finish>();
    public List<Capability>? Capabilities { get; set; } = new List<Capability>();
    public List<Attribute>? Attributes { get; set; } = new List<Attribute>();
    
    // Constructor #1
    public Product() {
        ProductKey = 0;
        Name = "";
        Description = "";
        ImgUrl = "";
        ImgAlt = "";
    }

    // Constructor #2
    public Product(int productKey, string name, string description, string imgUrl, string imgAlt, List<Color>? colors, List<Material>? materials, List<Finish>? finishes, List<Capability>? capabilities, List<Attribute>? attributes) {
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