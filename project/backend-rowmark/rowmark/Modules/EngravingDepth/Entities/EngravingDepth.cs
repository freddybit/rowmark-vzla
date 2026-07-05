using System.Text.Json.Serialization;

namespace rowmark.Modules.EngravingDepth.Entities;

public class EngravingDepth {
    // Attributes
    
    [JsonPropertyName("engravingDepthKey")]
    public int EngravingDepthKey { get; set; }
    
    [JsonPropertyName("depth")]
    public double Depth { get; set; } 
    
    [JsonPropertyName("unitMedition")]
    public string UnitMedition { get; set; }
    
    // Constructor #1
    public EngravingDepth() {
        EngravingDepthKey = 0;
        Depth = 0.0; 
        UnitMedition = "";
    }

    // Constructor #2
    public EngravingDepth(int engravingDepthKey, double depth, string unitMedition) {
        EngravingDepthKey = engravingDepthKey;
        Depth = depth;
        UnitMedition = unitMedition;
    }
}