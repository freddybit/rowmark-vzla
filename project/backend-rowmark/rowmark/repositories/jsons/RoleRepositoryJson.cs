using System.Text.Json;
using rowmark.interfaces;
using rowmark.models.entities;

namespace rowmark.repositories.jsons;

public class RoleRepositoryJson : IRoleRepository {
    
    private readonly string jsonPath = @"data/roles.json";
    private readonly List<Role> roles;
    
    public RoleRepositoryJson() {
        if (!File.Exists(jsonPath)) roles = new List<Role>();
        roles = Load();
    }
    
    private List<Role> Load() {
        try {
            string json = File.ReadAllText(this.jsonPath);
            List<Role>? list = JsonSerializer.Deserialize<List<Role>>(json);
            return  list != null ? list :  new List<Role>();
        }  
        catch (JsonException e) {
            Console.WriteLine($"JsonException: {e.Message}");
            List<Role> list = new List<Role>();
            return list;
        }
    }

    private void Save() {
        var options = new JsonSerializerOptions { WriteIndented = true };
        string json = JsonSerializer.Serialize(roles, options);
        File.WriteAllText(this.jsonPath, json);
    }
    
    
    public bool Create(Role? role) {
        if (role == null) return false;
        roles.Add(role);
        Save();
        return true;
    }

    public Role? ReadRole(string roleName) {
        Role? role = roles.Find(x => x.NameRol == roleName);
        return role;
    }

    public bool Update(Role role) {
        throw new NotImplementedException();
    }

    public bool Delete(Role? role) {
        if (role == null) return false;
        roles.Remove(role);
        Save();
        return true;
    }
}