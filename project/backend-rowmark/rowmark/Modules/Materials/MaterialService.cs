using System;
using System.Collections.Generic;
using rowmark.Modules.Materials.Entities;

namespace rowmark.Modules.Materials;

public class MaterialService {
    private readonly MaterialRepository _repository;

    public MaterialService(MaterialRepository repository) {
        _repository = repository;
    }

    public Material CreateMaterial(Material material) {
        if (material == null)
            throw new ArgumentNullException(nameof(material));
            
        if (string.IsNullOrWhiteSpace(material.Name))
            throw new ArgumentException("El nombre del material no puede estar vacío.");

        // Ejecutamos la inserción y le asignamos el ID autogenerado al objeto
        int newId = _repository.Insert(material);
        material.MaterialKey = newId;
        
        return material;
    }

    public IEnumerable<Material> GetAllMaterials() {
        return _repository.GetAll();
    }

    public Material GetMaterialById(int id) {
        if (id <= 0)
            throw new ArgumentException("ID inválido.");

        return _repository.GetById(id)!;
    }

    public bool UpdateMaterial(int id, Material material) {
        if (material == null)
            throw new ArgumentNullException(nameof(material));

        if (id <= 0)
            throw new ArgumentException("ID inválido.");
            
        if (string.IsNullOrWhiteSpace(material.Name))
            throw new ArgumentException("El nombre no puede estar vacío.");

        // Aseguramos que el objeto tenga el ID correcto antes de mandarlo al repositorio
        material.MaterialKey = id; 
        
        return _repository.Update(material);
    }

    public bool DeleteMaterial(int id) {
        if (id <= 0) 
            throw new ArgumentException("ID inválido.");
        
        return _repository.Delete(id);
    }
}