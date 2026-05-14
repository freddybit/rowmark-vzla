namespace rowmark.models.entities;

public class Attribute {
    
    // Attributes
    
    public int AttributeKey { get; set; }
    public string Name { get; set; }
    public List<Product>? Product { get; set; } = new List<Product>();
    
    // Constructor #1
    public Attribute() {
        AttributeKey = 0;
        Name = "";
    }

    // Constructor #2
    public Attribute(int attributeKey, string name) {
        AttributeKey = attributeKey;
        Name = name;
    }

}