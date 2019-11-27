﻿using court_register.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace court_register.Services
{
    public interface IUserRepositoryService
    {
        Task<IEnumerable<User>> GetUsersAsync(string userExecutorEmail);
        Task<UserSystem> GetUserSystemByUserEmailAsync(string userExecutorEmail, string userEmail);
        Task<bool> UpdateUserSystemByUserEmailAsync(string userExecutorEmail, string userEmail, User user);
    }
}
