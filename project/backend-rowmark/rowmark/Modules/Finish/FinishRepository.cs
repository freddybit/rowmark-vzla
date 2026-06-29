using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Dapper;
using Microsoft.Extensions.Configuration;
using Npgsql;
using rowmark.Modules.Finish.Entities;

namespace rowmark.Modules.Finish;

public class FinishRepository 
{
    private readonly string _connectionString;

    public FinishRepository(IConfiguration configuration) 
    {
        _connectionString = configuration.GetConnectionString("SupabaseConnection")!;
    }

    // CREATE
    public int Insert(Entities.Finish finish) 
    {
        if (finish == null) throw new ArgumentNullException(nameof(finish));

        using IDbConnection db = new NpgsqlConnection(_connectionString);
        
        string query = @"
            INSERT INTO finish (name, description) 
            VALUES (@Name, @Description) 
            RETURNING finishkey;"; 
            
        return db.ExecuteScalar<int>(query, finish);
    }

    // READ (Todos)
    public List<Entities.Finish> GetAll() 
    {
        using IDbConnection db = new NpgsqlConnection(_connectionString);
        
        string query = "SELECT finishkey, name, description FROM finish;";
        
        return db.Query<Entities.Finish>(query).ToList();
    }

    // READ (Por ID)
    public Entities.Finish? GetById(int id) 
    {
        using IDbConnection db = new NpgsqlConnection(_connectionString);
        
        string query = "SELECT finishkey, name, description FROM finish WHERE finishkey = @Id;";
        
        return db.QueryFirstOrDefault<Entities.Finish>(query, new { Id = id });
    }

    // UPDATE
    public bool Update(Entities.Finish finish) 
    {
        if (finish == null) throw new ArgumentNullException(nameof(finish));

        using IDbConnection db = new NpgsqlConnection(_connectionString);
        
        string query = @"
            UPDATE finish 
            SET name = @Name,
                description = @Description
            WHERE finishkey = @FinishKey;";
            
        int rowsAffected = db.Execute(query, finish);
        return rowsAffected > 0;
    }

    // DELETE
    public bool Delete(int id) 
    {
        using IDbConnection db = new NpgsqlConnection(_connectionString);
        
        string query = "DELETE FROM finish WHERE finishkey = @Id;";
        
        int rowsAffected = db.Execute(query, new { Id = id });
        return rowsAffected > 0;
    }
}