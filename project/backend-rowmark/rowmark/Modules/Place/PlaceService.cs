using System;
using System.Collections.Generic;
using rowmark.Modules.Place.Entities;

namespace rowmark.Modules.Place;

public class PlaceService 
{
    private readonly PlaceRepository _repository;

    public PlaceService(PlaceRepository repository) 
    {
        _repository = repository;
    }

    public Entities.Place CreatePlace(Entities.Place place) 
    {
        if (place == null)
            throw new ArgumentNullException(nameof(place));
            
        if (string.IsNullOrWhiteSpace(place.Name))
            throw new ArgumentException("El nombre del lugar no puede estar vacío.");
            
        if (string.IsNullOrWhiteSpace(place.TypePlace))
            throw new ArgumentException("El tipo de lugar (TypePlace) no puede estar vacío.");

        int newId = _repository.Insert(place);
        place.PlaceKey = newId;
        
        return place;
    }

    public IEnumerable<Entities.Place> GetAllPlaces() 
    {
        return _repository.GetAll();
    }

    public Entities.Place GetPlaceById(int id) 
    {
        if (id <= 0)
            throw new ArgumentException("ID inválido.");

        return _repository.GetById(id);
    }

    public bool UpdatePlace(int id, Entities.Place place) 
    {
        if (place == null)
            throw new ArgumentNullException(nameof(place));

        if (id <= 0)
            throw new ArgumentException("ID inválido.");
            
        if (string.IsNullOrWhiteSpace(place.Name))
            throw new ArgumentException("El nombre del lugar no puede estar vacío.");
            
        if (string.IsNullOrWhiteSpace(place.TypePlace))
            throw new ArgumentException("El tipo de lugar (TypePlace) no puede estar vacío.");

        place.PlaceKey = id; 
        
        return _repository.Update(place);
    }

    public bool DeletePlace(int id) 
    {
        if (id <= 0) 
            throw new ArgumentException("ID inválido.");
        
        return _repository.Delete(id);
    }
}