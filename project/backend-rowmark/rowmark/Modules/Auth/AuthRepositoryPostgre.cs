using System.Data;
using Dapper;
using Npgsql;
using rowmark.models.entities;
using rowmark.Modules.Auth.entities;
using rowmark.Modules.Auth.interfaces;

namespace rowmark.Modules.Auth;

public class AuthRepositoryPostgre : IAuthRepository {
    private readonly string _connectionString;

    public AuthRepositoryPostgre(IConfiguration configuration) {
        _connectionString = configuration.GetConnectionString("SupabaseConnection")!;
    }
    
    // El 'id' se mapea a 'decimal' para coincidir exactamente con NUMERIC(1000,0)
    public bool Exists(decimal? id) {
        if (id == null) return false;
        
        using IDbConnection db = new NpgsqlConnection(_connectionString);
        string query = "SELECT 1 FROM profile WHERE id = @Id";
        var answer = db.ExecuteScalar<int?>(query, new { Id = id });
        return answer != null;
    }
    
    public bool Exists(string? email) {
        if (email == null) return false;

        using IDbConnection db = new NpgsqlConnection(_connectionString);
        string query = "SELECT 1 FROM profile WHERE email = @Email";
        var answer = db.ExecuteScalar<int?>(query, new { Email = email });
        return answer != null;
    }
    
    public Profile Create(Profile profile) {
        if (profile == null) throw new ArgumentNullException(nameof(profile));

        using IDbConnection db = new NpgsqlConnection(_connectionString);
        
        string query = @"
        INSERT INTO profile (
            firstname, secondname, firstlastname, secondlastname, 
            place_placekey, email, hashpassword, id 
        ) 
        VALUES (
            @FirstName, @SecondName, @FirstLastname, @SecondLastname, 
            @Place_PlaceKey, @Email, @HashPassword, @Id
        ) 
        RETURNING profilekey;";
            
        // profilekey sigue siendo un SERIAL en la BD, por lo que retorna un int
        var newProfileKey = db.ExecuteScalar<int>(query, profile);
        
        profile.ProfileKey = newProfileKey; 
        
        return profile;
    }

    public Profile? ReadProfile(decimal id) {
        using IDbConnection db = new NpgsqlConnection(_connectionString);
        
        string query = "SELECT * FROM profile WHERE id = @Id";
        
        return db.QueryFirstOrDefault<Profile>(query, new { Id = id });
    }

    public Profile? ReadProfile(string email) {
        if (string.IsNullOrWhiteSpace(email)) return null;

        using IDbConnection db = new NpgsqlConnection(_connectionString);
        
        string query = "SELECT * FROM profile WHERE email = @Email";
        
        return db.QueryFirstOrDefault<Profile>(query, new { Email = email });
    }

    public List<Profile> ReadProfiles() {
        using IDbConnection db = new NpgsqlConnection(_connectionString);
        
        string query = "SELECT * FROM profile";
        
        return db.Query<Profile>(query).ToList();
    }
    
    public Profile Update(Profile profile) {
        if (profile == null) throw new ArgumentNullException(nameof(profile));

        using IDbConnection db = new NpgsqlConnection(_connectionString);
        
        string query = @"
        UPDATE profile 
        SET firstname = @FirstName, 
            secondname = @SecondName, 
            firstlastname = @FirstLastname, 
            secondlastname = @SecondLastname, 
            place_placekey = @Place_PlaceKey, 
            email = @Email, 
            hashpassword = @HashPassword
        WHERE id = @Id;";
        
        db.Execute(query, profile);
        
        return profile;
    }

    public void Delete(decimal id) {
        using IDbConnection db = new NpgsqlConnection(_connectionString);
        
        string query = "DELETE FROM profile WHERE id = @Id;";
        
        db.Execute(query, new { Id = id });
    }
}