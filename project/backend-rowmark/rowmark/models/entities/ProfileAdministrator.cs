namespace rowmark.models.entities;

public class ProfileAdministrator {
    
    // Attributes

    private List<Sheet>? _stock;
    
    // Constructor #1
    public ProfileAdministrator() {}
    
    // Constructor #2
    public ProfileAdministrator(List<Sheet> stock) {
        this._stock = stock;
    }
    
    // Getter and Setter Methods

    public List<Sheet>? Stock {
        get => this._stock;
        set => this._stock = value;
    }

}