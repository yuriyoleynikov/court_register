using court_register.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace court_register.Services
{
    public interface IUnitRepositoryService
    {
        Task<IEnumerable<Unit>> GetAllUnitsAsync();
        Task<Unit> GetUnitAsync(int id);
        Task AddUnitAsync(Unit unit);
        Task<bool> RemoveUnitAsync(int id);
        Task<bool> UpdateUnitAsync(int id, Unit unit);
    }
}
