namespace rowmark.models.entities;

public class Finish {
    
    // Attributes
    
    public int FinishKey { get; set; }
    public string Name { get; set; }
    public List<Product>? Product { get; set; } = new List<Product>();
    
    // Constructor #1
    public Finish() {
        FinishKey = 0;
        Name = "";
    }

    // Constructor #2
    public Finish(int finishKey, string name) {
        FinishKey = finishKey;
        Name = name;
    }

}