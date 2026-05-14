namespace rowmark.models.entities;

public class Phone {
    
    // Attributes
    
    public int PhoneKey { get; set; }
    public string AreaCode { get; set; }
    public string OperatorCode { get; set; }
    public string NumberAssigned { get; set; }
    
    // Constructor #1
    public Phone() {
        PhoneKey = 0;
        AreaCode = "";
        OperatorCode = "";
        NumberAssigned = "";
    }

    // Constructor #2
    public Phone(int phoneKey, string areaCode, string operatorCode, string numberAssigned) {
        PhoneKey = phoneKey;
        AreaCode = areaCode;
        OperatorCode = operatorCode;
        NumberAssigned = numberAssigned;
    }

}