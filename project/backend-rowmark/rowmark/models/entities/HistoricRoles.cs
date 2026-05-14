using System.ComponentModel.DataAnnotations;

namespace rowmark.models.entities;

public class HistoricRoles {
    
    // Attributes
    
    public int HistoricRoleKey { get; set; }
    public DateTime DateAndHour { get; set; }
    public int Role_RoleKey { get; set; }
    public int Profile_ProfileKey { get; set; }
    
    // Constructor #1
    public HistoricRoles() {
        HistoricRoleKey = 0;
        DateAndHour = DateTime.UtcNow;
        Role_RoleKey = Role_RoleKey;
        Profile_ProfileKey = Profile_ProfileKey;
    }

    // Constructor #2
    public HistoricRoles(int historicRoleKey, DateTime dateAndHour, int roleRoleKey, int profileProfileKey) {
        HistoricRoleKey = historicRoleKey;
        DateAndHour = dateAndHour;
        Role_RoleKey = roleRoleKey;
        Profile_ProfileKey = profileProfileKey;
    }

}