using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Dapper;
using Microsoft.Extensions.Configuration;
using Npgsql;
using rowmark.Modules.Place.Entities;

namespace rowmark.Modules.Place;

public class PlaceRepository 
{
    private readonly string _connectionString;

    public PlaceRepository(IConfiguration configuration) 
    {
        _connectionString = configuration.GetConnectionString("SupabaseConnection")!;
    }

    // CREATE
    public int Insert(Entities.Place place) 
    {
        if (place == null) throw new ArgumentNullException(nameof(place));

        using IDbConnection db = new NpgsqlConnection(_connectionString);
        
        string query = @"
            INSERT INTO place (name, typeplace, place_placekey) 
            VALUES (@Name, @TypePlace, @Place_PlaceKey) 
            RETURNING placekey;"; 
            
        return db.ExecuteScalar<int>(query, place);
    }

    // READ (Todos)
    public List<Entities.Place> GetAll() 
    {
        using IDbConnection db = new NpgsqlConnection(_connectionString);
        
        string query = "SELECT placekey, name, typeplace, place_placekey FROM place;";
        
        return db.Query<Entities.Place>(query).ToList();
    }

    // READ (Por ID)
    public Entities.Place? GetById(int id) 
    {
        using IDbConnection db = new NpgsqlConnection(_connectionString);
        
        string query = "SELECT placekey, name, typeplace, place_placekey FROM place WHERE placekey = @Id;";
        
        return db.QueryFirstOrDefault<Entities.Place>(query, new { Id = id });
    }

    // UPDATE
    public bool Update(Entities.Place place) 
    {
        if (place == null) throw new ArgumentNullException(nameof(place));

        using IDbConnection db = new NpgsqlConnection(_connectionString);
        
        string query = @"
            UPDATE place 
            SET name = @Name,
                typeplace = @TypePlace,
                place_placekey = @Place_PlaceKey
            WHERE placekey = @PlaceKey;";
            
        int rowsAffected = db.Execute(query, place);
        return rowsAffected > 0;
    }

    // DELETE
    public bool Delete(int id) 
    {
        using IDbConnection db = new NpgsqlConnection(_connectionString);
        
        string query = "DELETE FROM place WHERE placekey = @Id;";
        
        int rowsAffected = db.Execute(query, new { Id = id });
        return rowsAffected > 0;
    }
}