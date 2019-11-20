using court_register.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace court_register.Services
{
    public interface IUserRepositoryService
    {
        Task<IEnumerable<User>> GetAllUsersAsync();
        Task<User> GetUserAsync(int id);
        Task AddUserAsync(User user);
        Task<bool> RemoveUserAsync(int id);
        Task<bool> UpdateUserAsync(int id, User user);
    }
}
