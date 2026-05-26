using System.Data;
using Dapper;
using Npgsql;
using rowmark.interfaces;
using rowmark.models.entities;

namespace rowmark.repositories.postgres;

public class AuthRepositoryPostgre: IAuthRepository{
    
    private readonly string _connectionString;

    public AuthRepositoryPostgre(IConfiguration configuration) {
        _connectionString = configuration.GetConnectionString("PostgreSQL")!;
    }
    
    public Task<IEnumerable<Profile>> Exists(int? id) {
        using IDbConnection db = new NpgsqlConnection( _connectionString );
        
        string query = "SELECT  FROM profile WHERE id = id";
        return db.QueryAsync<Profile>(query);
    }
    
    public bool Exists(string? email) {
        throw new NotImplementedException();
    }
    public Profile Create(Profile profile) {
        throw new NotImplementedException();
    }
    public List<Profile> ReadProfiles() {
        throw new NotImplementedException();
    }
    public Profile? ReadProfile(int id) {
        throw new NotImplementedException();
    }
    public Profile? ReadProfile(string email) {
        throw new NotImplementedException();
    }
    public Profile Update(Profile profile) {
        throw new NotImplementedException();
    }
    public void Delete(int id) {
        throw new NotImplementedException();
    }
}