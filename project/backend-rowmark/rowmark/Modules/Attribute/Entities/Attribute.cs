namespace rowmark.Modules.Attribute.Entities;

public class Attribute {
    
    // Attributes
    
    public int AttributeKey { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string ImgUrl { get; set; }
    public List<Product.Entities.Product>? Product { get; set; } = new List<Product.Entities.Product>();
    
    // Constructor #1
    public Attribute() {
        AttributeKey = 0;
        Name = "";
        Description = "";
        ImgUrl = "";
    }

    // Constructor #2
    public Attribute(int attributeKey, string name, string description, string imgUrl) {
        AttributeKey = attributeKey;
        Name = name;
        Description = description;
        ImgUrl = imgUrl;
    }
}