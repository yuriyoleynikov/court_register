using court_register.Models;
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

        public async Task<IEnumerable<User>> GetUsersAsync(string userExecutorEmail, bool active)
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

                var userList = userSystemList.Select(userSystem => userSystem.current).Where(user => user.active == active);

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

        public async Task AddCourtAsync(string userExecutorEmail, Court court)
        {
            try
            {
                await CheckCurrentUserIsExistAsync(userExecutorEmail);

                var isActive = await GetCurrentUserIsActiveAsync(userExecutorEmail);
                if (!isActive)
                    return;

                var newCourtSystem = new CourtSystem();
                var newId = 0;
                if (await _context.courts.Find<CourtSystem>(_ => true).AnyAsync())
                {
                    var courtSystemList = await _context.courts.Find<CourtSystem>(_ => true).ToListAsync();
                    newId = courtSystemList.Max(us => us.current._id ?? 0) + 1;
                }
                var userExecutor = (await GetUserSystemByUserEmailAsync(userExecutorEmail)).current;

                newCourtSystem.current = court;
                newCourtSystem.current._id = newId;
                newCourtSystem.current.version = 0;
                newCourtSystem.current.created = new Created
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
                newCourtSystem.current.deleted = false;

                await _context.courts.InsertOneAsync(newCourtSystem);

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
                        .Find(caseSystem => true).ToListAsync();

                var caseList = caseSystemList.Select(caseSystem => caseSystem.current).ToList();

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

                var typeRoleCaseSystem = await _context.roles_in_case
                    .Find<TypeRoleCaseSystem>(_ => _.current.name == @case.type_role.name)
                    .SingleOrDefaultAsync();
                newCaseSystem.current.type_role = typeRoleCaseSystem.current;

                var typeCategorySystem = await _context.category
                    .Find<CategorySystem>(_ => _.current.name == @case.category.name)
                    .SingleOrDefaultAsync();
                newCaseSystem.current.category = typeCategorySystem.current;

                await _context.cases.InsertOneAsync(newCaseSystem);

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<string> CreateCaseAsync(string userExecutorEmail)
        {
            try
            {
                await CheckCurrentUserIsExistAsync(userExecutorEmail);

                var isActive = await GetCurrentUserIsActiveAsync(userExecutorEmail);
                if (!isActive)
                    return null;

                var isAdmin = await GetCurrentUserIsAdminAsync(userExecutorEmail);
                if (!(isAdmin))
                    return null;

                var newCaseSystem = new CaseSystem();
                var newId = 0;
                if (await _context.cases.Find<CaseSystem>(_ => true).AnyAsync())
                {
                    var caseSystemList = await _context.cases.Find<CaseSystem>(_ => true).ToListAsync();
                    newId = caseSystemList.Max(us => us.current._id ?? 0) + 1;
                }
                var userExecutor = (await GetUserSystemByUserEmailAsync(userExecutorEmail)).current;

                newCaseSystem.current = new Case();
                var createNumber = "1";
                newCaseSystem.current.case_number = createNumber;
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

                return newId.ToString();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private async Task CreateTypesRoleInCase(string userExecutorEmail)
        {
            try
            {
                var userExecutor = (await GetUserSystemByUserEmailAsync(userExecutorEmail)).current;


                var typeRoleCaseSystemList = new List<TypeRoleCaseSystem>{
                    new TypeRoleCaseSystem
                    {
                    current = new TypeRoleCase
                    {
                        _id = 0,
                        created = new Created
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
                        },
                        name = "Истец",
                        deleted = false,
                        full_name = null,
                        version = 0
                    },
                    changes = null
                },
                    new TypeRoleCaseSystem
                    {
                    current = new TypeRoleCase
                    {
                        _id = 1,
                        created = new Created
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
                        },
                        name = "Ответчик",
                        deleted = false,
                        full_name = null,
                        version = 0
                    },
                    changes = null
                },
                    new TypeRoleCaseSystem
                    {
                    current = new TypeRoleCase
                    {
                        _id = 2,
                        created = new Created
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
                        },
                        name = "Третье лицо",
                        deleted = false,
                        full_name = null,
                        version = 0
                    },
                    changes = null
                }
                };

                await _context.roles_in_case.InsertManyAsync(typeRoleCaseSystemList);

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        private async Task CreateCategoryInCase(string userExecutorEmail)
        {
            try
            {
                var userExecutor = (await GetUserSystemByUserEmailAsync(userExecutorEmail)).current;

                var typeCategorySystemList = new List<CategorySystem>{
                    new CategorySystem
                    {
                    current = new Category
                    {
                        _id = 0,
                        created = new Created
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
                        },
                        name = "Категория 1",
                        deleted = false,
                        full_name = null,
                        version = 0
                    },
                    changes = null
                },
                    new CategorySystem
                    {
                    current = new Category
                    {
                        _id = 1,
                        created = new Created
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
                        },
                        name = "Категория 2",
                        deleted = false,
                        full_name = null,
                        version = 0
                    },
                    changes = null
                },
                    new CategorySystem
                    {
                    current = new Category
                    {
                        _id = 2,
                        created = new Created
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
                        },
                        name = "Категория 3",
                        deleted = false,
                        full_name = null,
                        version = 0
                    },
                    changes = null
                }
                };

                await _context.category.InsertManyAsync(typeCategorySystemList);

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        private async Task CreateStatusesInCase(string userExecutorEmail)
        {
            try
            {
                var userExecutor = (await GetUserSystemByUserEmailAsync(userExecutorEmail)).current;

                var statusSystemList = new List<StatusSystem>{
                    new StatusSystem
                    {
                    current = new Status
                    {
                        _id = 0,
                        created = new Created
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
                        },
                        name = "В процессе",
                        deleted = false,
                        short_sign= "?",
                        version = 0
                    },
                    changes = null
                },
                    new StatusSystem
                    {
                    current = new Status
                    {
                        _id = 1,
                        created = new Created
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
                        },
                        name = "Отрицательно",
                        deleted = false,
                        short_sign= "-",
                        version = 0
                    },
                    changes = null
                },
                    new StatusSystem
                    {
                    current = new Status
                    {
                        _id = 2,
                        created = new Created
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
                        },
                        name = "Положительно",
                        deleted = false,
                        short_sign= "+",
                        version = 0
                    },
                    changes = null
                }
                };

                await _context.statuses.InsertManyAsync(statusSystemList);

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

                var roleInCaseSystemList = await _context.roles_in_case
                        .Find(courtSystem => true).ToListAsync();
                var roleInCaseList = roleInCaseSystemList
                    .Select(roleInCaseSystem => roleInCaseSystem.current);
                settingsCase.type_roles = roleInCaseList.ToList();

                var categoryInCaseSystemList = await _context.category
                        .Find(categorySystem => true).ToListAsync();
                var categoryInCaseList = categoryInCaseSystemList
                    .Select(categoryInCaseSystem => categoryInCaseSystem.current);
                settingsCase.category = categoryInCaseList.ToList();

                var statusSystemList = await _context.statuses
                        .Find(statusSystem => true).ToListAsync();
                var statusList = statusSystemList
                    .Select(statusSystem => statusSystem.current);
                settingsCase.statuses = statusList.ToList();

                var userSystemList = await _context.users
                        .Find(userSystem => true).ToListAsync();
                var userList = userSystemList
                    .Select(userSystem => userSystem.current)
                    .Where(user => user.active && !String.IsNullOrEmpty(user.second_name));
                settingsCase.executors = userList.Select(user => new Executor
                {
                    _id = user._id,
                    created = user.created,
                    deleted = false,
                    first_name = user.first_name,
                    second_name = user.second_name,
                    third_name = user.third_name,
                    version = user.version
                }).ToList();

                return settingsCase;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<CaseSystem> GetCaseSystemByIdAsync(string userExecutorEmail, int _id)
        {
            try
            {
                await CheckCurrentUserIsExistAsync(userExecutorEmail);

                var isActive = await GetCurrentUserIsActiveAsync(userExecutorEmail);
                if (!isActive)
                    return null;

                var caseSystemList = await _context.cases
                        .Find(caseSystem => true).ToListAsync();

                var @case = caseSystemList.Where(caseSystem => caseSystem.current._id == _id).FirstOrDefault();

                return @case;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
