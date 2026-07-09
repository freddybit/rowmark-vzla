namespace rowmark.Modules.Finish.Entities;

public class Finish {
    
    // Attributes
    
    public int FinishKey { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public List<Product.Entities.Product>? Product { get; set; } = new List<Product.Entities.Product>();
    
    // Constructor #1
    public Finish() {
        FinishKey = 0;
        Name = "";
        Description = "";
    }

    // Constructor #2
    public Finish(int finishKey, string name) {
        FinishKey = finishKey;
        Name = name;
        Description = "";
    }

}