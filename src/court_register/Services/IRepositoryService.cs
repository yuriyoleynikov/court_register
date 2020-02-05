using court_register.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace court_register.Services
{
    public interface IRepositoryService
    {
        #region USERS
        Task<IEnumerable<User>> GetUsersAsync(string userExecutorEmail, bool active);
        Task<UserSystem> GetUserSystemByUserEmailAsync(string userExecutorEmail, string userEmail);
        Task<UserSystem> GetUserSystemByUserEmailAsync(string userExecutorEmail);
        Task<bool> UpdateUserSystemByUserEmailAsync(string userExecutorEmail, string userEmail, User user);
        Task<bool> UpdateUserSystemByUserEmailAsync(string userExecutorEmail, User user);
        #endregion USERS

        #region UNITS
        Task<IEnumerable<Unit>> GetUnitsAsync(string userExecutorEmail);
        Task<bool> UpdateUnitAsync(string userExecutorEmail, Unit unit);
        Task<string> CreateUnitAsync(string userExecutorEmail);
        Task<UnitSystem> GetUnitSystemByIdAsync(string userExecutorEmail, int id);
        Task<bool> DeleteUnitByIdAsync(string userExecutorEmail, int _id);
        #endregion UNITS

        #region COURTS
        Task<IEnumerable<Court>> GetCourtsAsync(string userExecutorEmail);
        Task<bool> UpdateCourtAsync(string userExecutorEmail, Court court);        
        Task<string> CreateCourtAsync(string userExecutorEmail);
        Task<CourtSystem> GetCourtSystemByIdAsync(string userExecutorEmail, int id);
        Task<bool> DeleteCourtByIdAsync(string userExecutorEmail, int _id);
        #endregion COURTS

        #region CASES
        Task<IEnumerable<Case>> GetCasesAsync(string userExecutorEmail);
        Task<SettingsCase> GetSettingsCaseAsync(string userExecutorEmail);
        Task<bool> EditCaseAsync(string userExecutorEmail, Case unit);
        Task<string> CreateCaseAsync(string userExecutorEmail);
        Task<CaseSystem> GetCaseSystemByIdAsync(string userExecutorEmail, int id);
        #endregion CASES
    }
}
