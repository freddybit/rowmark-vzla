using System.Text.Json;
using Microsoft.AspNetCore.Http.HttpResults;
using rowmark.interfaces;
using rowmark.models.entities;

namespace rowmark.repositories.jsons;

public class AuthRepositoryJson : IAuthRepository {
    
    private readonly string jsonPath = @"data/profiles.json";
    private readonly List<Profile> profiles;

    public AuthRepositoryJson() {
        if (!File.Exists(jsonPath)) profiles = new List<Profile>();
        profiles = Load(jsonPath);
    }
    
    private List<Profile> Load(string jsonPath) {
        try {
            string json = File.ReadAllText(jsonPath);
            List<Profile>? list = JsonSerializer.Deserialize<List<Profile>>(json);
            return  list != null ? list :  new List<Profile>();
        }  
        catch (JsonException e) {
            Console.WriteLine($"JsonException: {e.Message}");
            List<Profile> list = new List<Profile>();
            return list;
        }
    }

    public void Save() {
        var options = new JsonSerializerOptions { WriteIndented = true };
        string json = JsonSerializer.Serialize(profiles, options);
        File.WriteAllText(jsonPath, json);
    }

    public bool Exists(int id) {
        return profiles.Find(x => x.Id == id) != null;
    }
    
    public bool Exists(string email) {
        return profiles.Find(x => x.Email == email) != null;
    }

    public Profile Create(Profile profile) {
        profiles.Add(profile);
        return profile;
    }
    
    public List<Profile> ReadProfiles() {
        return profiles;
    }

    public Profile ReadProfile(int id) {
        Profile? profile = profiles.Find(x => x.Id == id);
        if (profile == null) throw new KeyNotFoundException();
        return profile;
    }
    
    public Profile? ReadProfile(string email) {
        Profile? profile = profiles.Find(x => x.Email == email);
        if (profile == null) throw new KeyNotFoundException();
        return profile;
    }
    
    public Profile Update(Profile profile) {
        throw new NotImplementedException();
    }
    
    public void Delete(int id) {
        if (!profiles.Exists(x => x.Id == id)) {
            throw new KeyNotFoundException();
        }
        profiles.Remove(profiles.Find(x => x.Id == id));
    }
    
}