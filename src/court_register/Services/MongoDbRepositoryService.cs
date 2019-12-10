﻿using court_register.Models;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace court_register.Services
{
    public class MongoDbRepositoryService : IRepositoryService
    {
        private readonly DbContext _context = null;
        public MongoDbRepositoryService(IOptions<DatabaseSettings> databaseSettings)
        {
            _context = new DbContext(databaseSettings);
        }

        private async Task CheckCurrentUserIsExistAsync(string userExecutorEmail)
        {
            var userSystemList = await _context.users.Find<UserSystem>(uS => uS.current.email == userExecutorEmail).ToListAsync();
            var userSystem = userSystemList.SingleOrDefault();

            if (userSystem != null)
                return;

            try
            {
                var userList = await _context.users
                            .Find(user => true).ToListAsync();
                var newId = 0;
                if (userList.Any())
                {
                    newId = userList.Max(us => us.current._id) + 1;
                }

                var newUser = new UserSystem
                {
                    current = new User
                    {
                        active = false,
                        created = new Created
                        {
                            date = DateTime.Now,
                            userInfo = new UserInfo
                            {
                                email = userExecutorEmail,
                                _id = newId,
                                version = 0
                            }
                        },
                        email = userExecutorEmail,
                        version = 0,
                        permission = new Permission { admin = false },
                        _id = newId
                    }
                };

                await _context.users.InsertOneAsync(newUser);

            }
            catch (Exception ex)
            {
                throw ex;
            }

            return;
        }
        private async Task<bool> GetCurrentUserIsActiveAsync(string userExecutorEmail)
        {
            var userSystem = await _context.users.Find<UserSystem>(uS => uS.current.email == userExecutorEmail).SingleOrDefaultAsync();
            return userSystem.current.active;
        }
        private async Task<bool> GetCurrentUserIsAdminAsync(string userExecutorEmail)
        {
            var userSystem = await _context.users.Find<UserSystem>(uS => uS.current.email == userExecutorEmail).SingleOrDefaultAsync();
            return userSystem.current.permission.admin;
        }

        public async Task<IEnumerable<User>> GetUsersAsync(string userExecutorEmail)
        {
            try
            {
                await CheckCurrentUserIsExistAsync(userExecutorEmail);

                var isAvtive = await GetCurrentUserIsActiveAsync(userExecutorEmail);
                if (!isAvtive)
                    return null;

                var isAdmin = await GetCurrentUserIsAdminAsync(userExecutorEmail);
                if (!isAdmin)
                    return null;

                var userSystemList = await _context.users
                        .Find(userSystem => true).ToListAsync();

                var userList = userSystemList.Select(userSystem => userSystem.current);

                return userList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<UserSystem> GetUserSystemByUserEmailAsync(string userExecutorEmail, string userEmail)
        {
            try
            {
                await CheckCurrentUserIsExistAsync(userExecutorEmail);

                var isAvtive = await GetCurrentUserIsActiveAsync(userExecutorEmail);
                if (!isAvtive)
                    return null;

                var isAdmin = await GetCurrentUserIsAdminAsync(userExecutorEmail);
                if (!(isAdmin || userExecutorEmail == userEmail))
                    return null;

                var userSystem = await _context.users
                        .Find<UserSystem>(userSystem => userSystem.current.email == userEmail).SingleOrDefaultAsync();

                return userSystem;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<UserSystem> GetUserSystemByUserEmailAsync(string userExecutorEmail)
        {
            try
            {
                await CheckCurrentUserIsExistAsync(userExecutorEmail);

                var userSystem = await _context.users
                        .Find<UserSystem>(userSystem => userSystem.current.email == userExecutorEmail).SingleOrDefaultAsync();

                return userSystem;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<bool> UpdateUserSystemByUserEmailAsync(string userExecutorEmail, string userEmail, User user)
        {
            try
            {
                await CheckCurrentUserIsExistAsync(userExecutorEmail);

                var isAcvtive = await GetCurrentUserIsActiveAsync(userExecutorEmail);
                if (!isAcvtive)
                    return false;

                //var isAdmin = await GetCurrentUserIsAdminAsync(userExecutorEmail);
                //if (!(isAdmin || userExecutorEmail == userEmail))
                //    return false;

                var userSystem = await _context.users
                        .Find<UserSystem>(userSystem => userSystem.current.email == userEmail).SingleOrDefaultAsync();
                var newChanges = new List<User> { };
                if (userSystem.changes != null)
                {
                    newChanges = userSystem.changes.ToList();
                }

                newChanges.Add(userSystem.current);

                userSystem.changes = newChanges;
                var newVersion = userSystem.current.version + 1;
                userSystem.current = user;
                var userExecutor = (await GetUserSystemByUserEmailAsync(userExecutorEmail)).current;
                userSystem.current.created = new Created
                {
                    date = DateTime.Now,
                    userInfo = new UserInfo
                    {
                        email = userExecutor.email,
                        first_name = userExecutor.first_name,
                        permission = userExecutor.permission,
                        second_name = userExecutor.second_name,
                        third_name = userExecutor.third_name,
                        version = userExecutor.version,
                        _id = userExecutor._id
                    }
                };
                userSystem.current.version = newVersion;

                ReplaceOneResult actionResult
                    = await _context.users
                                    .ReplaceOneAsync(u => u.current.email == userEmail
                                            , userSystem
                                            , new UpdateOptions { IsUpsert = true });
                return actionResult.IsAcknowledged
                    && actionResult.ModifiedCount > 0;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<bool> UpdateUserSystemByUserEmailAsync(string userExecutorEmail, User user)
        {
            try
            {
                await CheckCurrentUserIsExistAsync(userExecutorEmail);

                var isAvtive = await GetCurrentUserIsActiveAsync(userExecutorEmail);
                if (!isAvtive)
                    return false;

                //var isAdmin = await GetCurrentUserIsAdminAsync(userExecutorEmail);
                //if (!(isAdmin || userExecutorEmail == userEmail))
                //    return false;

                var userSystem = await _context.users
                        .Find<UserSystem>(userSystem => userSystem.current.email == userExecutorEmail).SingleOrDefaultAsync();
                var newChanges = new List<User> { };
                if (userSystem.changes != null)
                {
                    newChanges = userSystem.changes.ToList();
                }

                newChanges.Add(userSystem.current);

                userSystem.changes = newChanges;
                var newVersion = userSystem.current.version + 1;
                userSystem.current = user;
                var userExecutor = (await GetUserSystemByUserEmailAsync(userExecutorEmail)).current;
                userSystem.current.created = new Created
                {
                    date = DateTime.Now,
                    userInfo = new UserInfo
                    {
                        email = userExecutor.email,
                        first_name = userExecutor.first_name,
                        permission = userExecutor.permission,
                        second_name = userExecutor.second_name,
                        third_name = userExecutor.third_name,
                        version = userExecutor.version,
                        _id = userExecutor._id
                    }
                };
                userSystem.current.version = newVersion;

                ReplaceOneResult actionResult
                    = await _context.users
                                    .ReplaceOneAsync(u => u.current.email == userExecutorEmail
                                            , userSystem
                                            , new UpdateOptions { IsUpsert = true });
                return actionResult.IsAcknowledged
                    && actionResult.ModifiedCount > 0;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IEnumerable<Unit>> GetUnitsAsync(string userExecutorEmail)
        {
            try
            {
                await CheckCurrentUserIsExistAsync(userExecutorEmail);

                var isActive = await GetCurrentUserIsActiveAsync(userExecutorEmail);
                if (!isActive)
                    return null;

                var unitSystemList = await _context.units
                        .Find(unitSystem => true).ToListAsync();

                var unitList = unitSystemList.Select(userSystem => userSystem.current);

                return unitList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task AddUnitAsync(string userExecutorEmail, Unit unit)
        {
            try
            {
                await CheckCurrentUserIsExistAsync(userExecutorEmail);

                var isActive = await GetCurrentUserIsActiveAsync(userExecutorEmail);
                if (!isActive)
                    return;

                var isAdmin = await GetCurrentUserIsAdminAsync(userExecutorEmail);
                if (!(isAdmin))
                    return;

                var newUnitSystem = new UnitSystem();
                var newId = 0;
                if (await _context.units.Find<UnitSystem>(_ => true).AnyAsync())
                {
                    var unitSystemList = await _context.units.Find<UnitSystem>(_ => true).ToListAsync();
                    newId = unitSystemList.Max(us => us.current._id ?? 0) + 1;
                }
                var userExecutor = (await GetUserSystemByUserEmailAsync(userExecutorEmail)).current;

                newUnitSystem.current = unit;
                newUnitSystem.current._id = newId;
                newUnitSystem.current.version = 0;
                newUnitSystem.current.created = new Created
                {
                    date = DateTime.Now,
                    userInfo = new UserInfo
                    {
                        email = userExecutor.email,
                        first_name = userExecutor.first_name,
                        second_name = userExecutor.second_name,
                        third_name = userExecutor.third_name,
                        version = userExecutor.version,
                        _id = userExecutor._id,
                        permission = userExecutor.permission
                    }
                };
                newUnitSystem.current.deleted = false;

                await _context.units.InsertOneAsync(newUnitSystem);

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IEnumerable<Case>> GetCasesAsync(string userExecutorEmail)
        {
            try
            {
                await CheckCurrentUserIsExistAsync(userExecutorEmail);

                var isActive = await GetCurrentUserIsActiveAsync(userExecutorEmail);
                if (!isActive)
                    return null;

                var caseSystemList = await _context.cases
                        .Find(unitSystem => true).ToListAsync();

                var caseList = caseSystemList.Select(caseSystem => caseSystem.current);

                return caseList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task AddCaseAsync(string userExecutorEmail, Case @case)
        {
            try
            {
                await CheckCurrentUserIsExistAsync(userExecutorEmail);

                var isActive = await GetCurrentUserIsActiveAsync(userExecutorEmail);
                if (!isActive)
                    return;

                var isAdmin = await GetCurrentUserIsAdminAsync(userExecutorEmail);
                if (!(isAdmin))
                    return;

                var newCaseSystem = new CaseSystem();
                var newId = 0;
                if (await _context.cases.Find<CaseSystem>(_ => true).AnyAsync())
                {
                    var caseSystemList = await _context.cases.Find<CaseSystem>(_ => true).ToListAsync();
                    newId = caseSystemList.Max(us => us.current._id ?? 0) + 1;
                }
                var userExecutor = (await GetUserSystemByUserEmailAsync(userExecutorEmail)).current;

                newCaseSystem.current = @case;
                newCaseSystem.current._id = newId;
                newCaseSystem.current.version = 0;
                newCaseSystem.current.created = new Created
                {
                    date = DateTime.Now,
                    userInfo = new UserInfo
                    {
                        email = userExecutor.email,
                        first_name = userExecutor.first_name,
                        second_name = userExecutor.second_name,
                        third_name = userExecutor.third_name,
                        version = userExecutor.version,
                        _id = userExecutor._id,
                        permission = userExecutor.permission
                    }
                };
                newCaseSystem.current.deleted = false;

                await _context.cases.InsertOneAsync(newCaseSystem);

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<SettingsCase> GetSettingsCaseAsync(string userExecutorEmail)
        {
            try
            {
                await CheckCurrentUserIsExistAsync(userExecutorEmail);

                var isActive = await GetCurrentUserIsActiveAsync(userExecutorEmail);
                if (!isActive)
                    return null;

                var settingsCase = new SettingsCase();


                var unitSystemList = await _context.units
                        .Find(unitSystem => true).ToListAsync();
                var unitList = unitSystemList
                    .Where(unitSystem => !(unitSystem.current.deleted ?? false))
                    .Select(unitSystem => unitSystem.current);
                settingsCase.units = unitList.ToList();


                var courtSystemList = await _context.courts
                        .Find(courtSystem => true).ToListAsync();
                var courtList = courtSystemList
                    .Where(courtSystem => !(courtSystem.current.deleted ?? false))
                    .Select(courtSystem => courtSystem.current);
                settingsCase.courts = courtList.ToList();

                return settingsCase;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}