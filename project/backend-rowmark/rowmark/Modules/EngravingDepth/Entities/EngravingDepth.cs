namespace rowmark.Modules.EngravingDepth.Entities;

public class EngravingDepth {
    // Attributes
    public int EngravingDepthKey { get; set; }
    public int Depth { get; set; }
    public string UnitMedition { get; set; }
    
    // Constructor #1
    public EngravingDepth() {
        EngravingDepthKey = 0;
        Depth = 0;
        UnitMedition = "";
    }

    // Constructor #2
    public EngravingDepth(int engravingDepthKey, int depth, string unitMedition) {
        EngravingDepthKey = engravingDepthKey;
        Depth = depth;
        UnitMedition = unitMedition;
    }
}