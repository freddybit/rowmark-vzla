namespace rowmark.models.entities;

public class Place {
    
    // Attributes
    
    public int PlaceKey { get; set; }
    public string Name { get; set; }
    public string TypePlace { get; set; }
    public int? Place_PlaceKey { get; set; }
    public List<Place>? PlaceOfPlace { get; set; } = new List<Place>();
    
    // Constructor #1
    public Place() {
        PlaceKey = 0;
        Name = string.Empty;
        TypePlace = string.Empty;
    }

    // Constructor #2
    public Place(int placeKey, string name, string typePlace, int? placePlaceKey) {
        PlaceKey = placeKey;
        Name = name;
        TypePlace = typePlace;
        Place_PlaceKey = placePlaceKey;
    }

}