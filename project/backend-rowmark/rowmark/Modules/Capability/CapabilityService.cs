using System;
using System.Collections.Generic;
using rowmark.Modules.Capability.Entities;

namespace rowmark.Modules.Capability;

public class CapabilityService 
{
    private readonly CapabilityRepository _repository;

    public CapabilityService(CapabilityRepository repository) 
    {
        _repository = repository;
    }

    public Entities.Capability CreateCapability(Entities.Capability capability) 
    {
        if (capability == null)
            throw new ArgumentNullException(nameof(capability));
            
        if (string.IsNullOrWhiteSpace(capability.Name))
            throw new ArgumentException("El nombre de la capacidad no puede estar vacío.");

        int newId = _repository.Insert(capability);
        capability.CapabilityKey = newId;
        
        return capability;
    }

    public IEnumerable<Entities.Capability> GetAllCapabilities() 
    {
        return _repository.GetAll();
    }

    public Entities.Capability GetCapabilityById(int id) 
    {
        if (id <= 0)
            throw new ArgumentException("ID inválido.");

        return _repository.GetById(id);
    }

    public bool UpdateCapability(int id, Entities.Capability capability) 
    {
        if (capability == null)
            throw new ArgumentNullException(nameof(capability));

        if (id <= 0)
            throw new ArgumentException("ID inválido.");
            
        if (string.IsNullOrWhiteSpace(capability.Name))
            throw new ArgumentException("El nombre de la capacidad no puede estar vacío.");

        capability.CapabilityKey = id; 
        
        return _repository.Update(capability);
    }

    public bool DeleteCapability(int id) 
    {
        if (id <= 0) 
            throw new ArgumentException("ID inválido.");
        
        return _repository.Delete(id);
    }
}