using System.Data;
using Dapper;
using Npgsql;
using rowmark.interfaces;
using rowmark.models.entities;

namespace rowmark.repositories.postgres;

public class AuthRepositoryPostgre: IAuthRepository{
    
    private readonly string _connectionString;

    public AuthRepositoryPostgre(IConfiguration configuration) {
        _connectionString = configuration.GetConnectionString("SupabaseConnection")!;
    }
    
    public bool Exists(int? id) {
        if (id == null) return false;
        
        using IDbConnection db = new NpgsqlConnection(_connectionString);
        string query = "SELECT 1 FROM profile WHERE id = @Id";
        var answer = db.ExecuteScalar<int?>(query, new { Id = id });
        return answer != null;
    }
    
    public bool Exists(string? email) {
        if (email == null) return false;

        using IDbConnection db = new NpgsqlConnection(_connectionString);
        // Aseguramos que el nombre del parámetro coincida exactamente con la propiedad anónima
        string query = "SELECT 1 FROM profile WHERE email = @Email";
        var answer = db.ExecuteScalar<int?>(query, new { Email = email });
        return answer != null;
    }
    
    public Profile Create(Profile profile) {
        if (profile == null) throw new ArgumentNullException(nameof(profile));

        using IDbConnection db = new NpgsqlConnection(_connectionString);
        
        string query = @"
        INSERT INTO profile (
            profilekey, -- ⬅️ 1. Agregamos la columna profilekey
            firstname, secondname, firstlastname, secondlastname, 
            place_placekey, email, hashpassword, id 
        ) 
        VALUES (
            nextval('sequenceProfile'), -- ⬅️ 2. Llamamos a tu secuencia para que genere el ID automáticamente
            @FirstName, @SecondName, @FirstLastname, @SecondLastname, 
            @Place_PlaceKey, @Email, @HashPassword, @Id
        ) 
        RETURNING profilekey;";
            
        // Ejecutamos la consulta y obtenemos el ID generado. Dapper mapea las propiedades automáticamente.
        var newProfileKey = db.ExecuteScalar<int>(query, profile);
        
        // Asignamos el ID generado a la entidad y la retornamos
        profile.ProfileKey = newProfileKey; 
        
        return profile;
    }

// 1. Leer un perfil por su 'id' (cédula o documento único)
    public Profile? ReadProfile(int id) {
        using IDbConnection db = new NpgsqlConnection(_connectionString);
        
        // Seleccionamos todos los campos del perfil filtrando por el id
        string query = "SELECT * FROM profile WHERE id = @Id";
        
        // QueryFirstOrDefault devolverá el objeto Profile ya armado, o 'null' si no existe
        return db.QueryFirstOrDefault<Profile>(query, new { Id = id });
    }

    // 2. Leer un perfil por su 'email'
    public Profile? ReadProfile(string email) {
        if (string.IsNullOrWhiteSpace(email)) return null;

        using IDbConnection db = new NpgsqlConnection(_connectionString);
        
        string query = "SELECT * FROM profile WHERE email = @Email";
        
        return db.QueryFirstOrDefault<Profile>(query, new { Email = email });
    }

    // 3. Leer todos los perfiles de la base de datos
    public List<Profile> ReadProfiles() {
        using IDbConnection db = new NpgsqlConnection(_connectionString);
        
        string query = "SELECT * FROM profile";
        
        // Query<T> devuelve un IEnumerable, por lo que usamos .ToList() para cumplir con la interfaz
        return db.Query<Profile>(query).ToList();
    }
    
    public Profile Update(Profile profile) {
        throw new NotImplementedException();
    }
    public void Delete(int id) {
        throw new NotImplementedException();
    }
}