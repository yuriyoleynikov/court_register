using court_register.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace court_register.Services
{
    public interface IRepositoryService
    {
        Task<IEnumerable<User>> GetUsersAsync(string userExecutorEmail, bool active);
        Task<UserSystem> GetUserSystemByUserEmailAsync(string userExecutorEmail, string userEmail);
        Task<UserSystem> GetUserSystemByUserEmailAsync(string userExecutorEmail);
        Task<bool> UpdateUserSystemByUserEmailAsync(string userExecutorEmail, string userEmail, User user);
        Task<bool> UpdateUserSystemByUserEmailAsync(string userExecutorEmail, User user);

        Task<IEnumerable<Unit>> GetUnitsAsync(string userExecutorEmail);
        Task AddUnitAsync(string userExecutorEmail, Unit unit);
        
        Task AddCourtAsync(string userExecutorEmail, Court court);

        Task<IEnumerable<Case>> GetCasesAsync(string userExecutorEmail);
        Task<SettingsCase> GetSettingsCaseAsync(string userExecutorEmail);
        Task AddCaseAsync(string userExecutorEmail, Case unit);
    }
}
