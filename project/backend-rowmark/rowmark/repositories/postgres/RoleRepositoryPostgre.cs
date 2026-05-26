using rowmark.interfaces;
using rowmark.models.entities;

namespace rowmark.repositories.postgres;

public class RoleRepositoryPostgre: IRoleRepository {
    
    private readonly string _connectionString;

    public RoleRepositoryPostgre(IConfiguration configuration) {
        _connectionString = configuration.GetConnectionString("PostgreSQL")!;
    }

    public bool Create(Role? role) {
        throw new NotImplementedException();
    }
    public Role? ReadRole(string roleName) {
        throw new NotImplementedException();
    }
    public bool Update(Role role) {
        throw new NotImplementedException();
    }
    public bool Delete(Role role) {
        throw new NotImplementedException();
    }
}