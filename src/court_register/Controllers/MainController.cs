using court_register.Models;
using court_register.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace court_register.Controllers
{
    [ApiController]
    [Authorize]
    public class MainController : ControllerBase
    {
        private readonly IRepositoryService _repositoryService;

        public MainController(IRepositoryService repositoryService)
        {
            _repositoryService = repositoryService;
        }

        #region API/COURTS
        [HttpGet]
        [Route("api/courts")]
        public async Task<IEnumerable<Court>> GetCourtListAsync()
        {
            string _userExecutorEmail = null;
            _userExecutorEmail = GetCurrentUserEmail();

            var courtList = await _repositoryService.GetCourtsAsync(_userExecutorEmail);
            return courtList;
        }

        [HttpPost]
        [Route("api/court")]
        public async Task<bool> UpdateCourtAsync([FromBody]Court court)
        {
            string _userExecutorEmail = null;
            _userExecutorEmail = GetCurrentUserEmail();

            var result = await _repositoryService.UpdateCourtAsync(_userExecutorEmail, court);

            return result;
        }

        [HttpGet]
        [Route("api/court/create")]
        public async Task<string> CreateCourtAsync()
        {
            string _userExecutorEmail = null;
            _userExecutorEmail = GetCurrentUserEmail();

            var result = await _repositoryService.CreateCourtAsync(_userExecutorEmail);

            return result;
        }

        [HttpGet]
        [Route("api/court")]
        public async Task<CourtSystem> GetCourtByIdAsync([FromQuery] string _id)
        {
            string _userExecutorEmail = null;
            _userExecutorEmail = GetCurrentUserEmail();

            int id = 0;
            if (!String.IsNullOrEmpty(_id))
            {
                if (!Int32.TryParse(_id, out id))
                {
                    return null;
                }
            }

            var courtSystem = await _repositoryService.GetCourtSystemByIdAsync(_userExecutorEmail, id);
            return courtSystem;
        }

        [HttpGet]
        [Route("api/court/delete")]
        public async Task<bool> DeleteCourtByIdAsync([FromQuery] string _id)
        {
            string _userExecutorEmail = null;
            _userExecutorEmail = GetCurrentUserEmail();

            int id = 0;
            if (!String.IsNullOrEmpty(_id))
            {
                if (!Int32.TryParse(_id, out id))
                {
                    return false;
                }
            }

            var result = await _repositoryService.DeleteCourtByIdAsync(_userExecutorEmail, id);
            return result;
        }


        #endregion API/COURTS

        #region API/PERSONS
        [HttpGet]
        [Route("api/persons")]
        public async Task<IEnumerable<Person>> GetPersonListAsync([FromQuery] string _type)
        {
            string _userExecutorEmail = null;
            _userExecutorEmail = GetCurrentUserEmail();

            var personList = await _repositoryService.GetPersonsAsync(_userExecutorEmail, _type);
            return personList;
        }

        [HttpPost]
        [Route("api/person")]
        public async Task<bool> UpdatePersonAsync([FromBody]Person person)
        {
            string _userExecutorEmail = null;
            _userExecutorEmail = GetCurrentUserEmail();

            var result = await _repositoryService.UpdatePersonAsync(_userExecutorEmail, person);

            return result;
        }

        [HttpGet]
        [Route("api/person/create")]
        public async Task<string> CreatePersonAsync([FromQuery] string _type)
        {
            string _userExecutorEmail = null;
            _userExecutorEmail = GetCurrentUserEmail();

            var result = await _repositoryService.CreatePersonAsync(_userExecutorEmail, _type);

            return result;
        }

        [HttpGet]
        [Route("api/person")]
        public async Task<PersonSystem> GetPersonByIdAsync([FromQuery] string _id)
        {
            string _userExecutorEmail = null;
            _userExecutorEmail = GetCurrentUserEmail();

            int id = 0;
            if (!String.IsNullOrEmpty(_id))
            {
                if (!Int32.TryParse(_id, out id))
                {
                    return null;
                }
            }

            var personSystem = await _repositoryService.GetPersonSystemByIdAsync(_userExecutorEmail, id);
            return personSystem;
        }

        [HttpGet]
        [Route("api/person/delete")]
        public async Task<bool> DeletePersonByIdAsync([FromQuery] string _id)
        {
            string _userExecutorEmail = null;
            _userExecutorEmail = GetCurrentUserEmail();

            int id = 0;
            if (!String.IsNullOrEmpty(_id))
            {
                if (!Int32.TryParse(_id, out id))
                {
                    return false;
                }
            }

            var result = await _repositoryService.DeletePersonByIdAsync(_userExecutorEmail, id);
            return result;
        }
        #endregion API/PERSONS

        #region API/UNITS
        [HttpGet]
        [Route("api/units")]
        public async Task<IEnumerable<Unit>> GetUnitListAsync()
        {
            string _userExecutorEmail = null;
            _userExecutorEmail = GetCurrentUserEmail();

            var unitList = await _repositoryService.GetUnitsAsync(_userExecutorEmail);
            return unitList;
        }

        [HttpPost]
        [Route("api/unit")]
        public async Task<bool> UpdateUnitAsync([FromBody]Unit unit)
        {
            string _userExecutorEmail = null;
            _userExecutorEmail = GetCurrentUserEmail();

            var result = await _repositoryService.UpdateUnitAsync(_userExecutorEmail, unit);

            return result;
        }

        [HttpGet]
        [Route("api/unit/create")]
        public async Task<string> CreateUnitAsync()
        {
            string _userExecutorEmail = null;
            _userExecutorEmail = GetCurrentUserEmail();

            var result = await _repositoryService.CreateUnitAsync(_userExecutorEmail);

            return result;
        }

        [HttpGet]
        [Route("api/unit")]
        public async Task<UnitSystem> GetUnitByIdAsync([FromQuery] string _id)
        {
            string _userExecutorEmail = null;
            _userExecutorEmail = GetCurrentUserEmail();

            int id = 0;
            if (!String.IsNullOrEmpty(_id))
            {
                if (!Int32.TryParse(_id, out id))
                {
                    return null;
                }
            }

            var unitSystem = await _repositoryService.GetUnitSystemByIdAsync(_userExecutorEmail, id);
            return unitSystem;
        }

        [HttpGet]
        [Route("api/unit/delete")]
        public async Task<bool> DeleteUnitByIdAsync([FromQuery] string _id)
        {
            string _userExecutorEmail = null;
            _userExecutorEmail = GetCurrentUserEmail();

            int id = 0;
            if (!String.IsNullOrEmpty(_id))
            {
                if (!Int32.TryParse(_id, out id))
                {
                    return false;
                }
            }

            var result = await _repositoryService.DeleteUnitByIdAsync(_userExecutorEmail, id);
            return result;
        }
        #endregion API/UNITS

        #region API/USERS
        [HttpGet]
        [Route("api/users")]
        public async Task<IEnumerable<User>> GetUserListAsync([FromQuery]string active)
        {
            string _userExecutorEmail = null;
            _userExecutorEmail = GetCurrentUserEmail();
            var userList = await _repositoryService.GetUsersAsync(_userExecutorEmail, active == "true" ? true : false);
            return userList;
        }

        [HttpGet]
        [Route("api/user/{userEmail}")]
        public async Task<UserSystem> GetUserByUserEmailAsync(string userEmail)
        {
            string _userExecutorEmail = null;
            _userExecutorEmail = GetCurrentUserEmail();
            var userSystem = await _repositoryService.GetUserSystemByUserEmailAsync(_userExecutorEmail, userEmail);
            return userSystem;
        }

        [HttpGet]
        [Route("api/user")]
        public async Task<UserSystem> GetCurrentUserSystemAsync()
        {
            string _userExecutorEmail = null;
            _userExecutorEmail = GetCurrentUserEmail();
            var userSystem = await _repositoryService.GetUserSystemByUserEmailAsync(_userExecutorEmail);
            return userSystem;
        }

        [HttpPut]
        [Route("api/user")]
        public async Task<bool> UpdateUserAsync([FromBody]User user)
        {
            string _userExecutorEmail = null;
            _userExecutorEmail = GetCurrentUserEmail();

            var userSystemResult = await _repositoryService.UpdateUserSystemByUserEmailAsync(_userExecutorEmail, user);
            return userSystemResult;
        }

        [HttpPut]
        [Route("api/user/{userEmail}")]
        public async Task<bool> UpdateUserByUserEmailAsync(string userEmail, User user)
        {
            string _userExecutorEmail = null;
            _userExecutorEmail = GetCurrentUserEmail();

            var userSystemResult = await _repositoryService.UpdateUserSystemByUserEmailAsync(_userExecutorEmail, userEmail, user);
            return userSystemResult;
        }

        [HttpGet]
        [Route("api/user/activate/{userEmail}")]
        public async Task<bool> ActivateUserByUserEmailAsync(string userEmail)
        {
            string _userExecutorEmail = null;
            _userExecutorEmail = GetCurrentUserEmail();

            var user = (await _repositoryService.GetUserSystemByUserEmailAsync(_userExecutorEmail, userEmail)).current;
            user.active = true;

            return await UpdateUserByUserEmailAsync(userEmail, user);
        }

        [HttpGet]
        [Route("api/user/deactivate/{userEmail}")]
        public async Task<bool> DeactivateUserByUserEmailAsync(string userEmail)
        {
            string _userExecutorEmail = null;
            _userExecutorEmail = GetCurrentUserEmail();

            var user = (await _repositoryService.GetUserSystemByUserEmailAsync(_userExecutorEmail, userEmail)).current;
            user.active = false;

            return await UpdateUserByUserEmailAsync(userEmail, user);
        }
        #endregion API/USERS

        #region API/CASES
        [HttpGet]
        [Route("api/cases")]
        public async Task<IEnumerable<Case>> GetCaseListAsync([FromQuery]string filter1, [FromQuery]string filter2)
        {
            string _userExecutorEmail = null;
            _userExecutorEmail = GetCurrentUserEmail();

            var caseList = await _repositoryService.GetCasesAsync(_userExecutorEmail);
            return caseList;
        }

        [HttpGet]
        [Route("api/case/settings")]
        public async Task<SettingsCase> GetSettingsCaseAsync()
        {
            string _userExecutorEmail = null;
            _userExecutorEmail = GetCurrentUserEmail();

            var settingsCase = await _repositoryService.GetSettingsCaseAsync(_userExecutorEmail);
            return settingsCase;
        }

        [HttpPost]
        [Route("api/case")]
        public async Task<bool> AddCaseAsync([FromBody]Case @case)
        {
            string _userExecutorEmail = null;
            _userExecutorEmail = GetCurrentUserEmail();

            var result = await _repositoryService.EditCaseAsync(_userExecutorEmail, @case);
            return result;
        }

        [HttpGet]
        [Route("api/case")]
        public async Task<CaseSystem> GetCaseByIdAsync([FromQuery] string _id)
        {
            string _userExecutorEmail = null;
            _userExecutorEmail = GetCurrentUserEmail();

            int id = 0;
            if (!String.IsNullOrEmpty(_id))
            {
                if (!Int32.TryParse(_id, out id))
                {
                    return null;
                }
            }

            var caseSystem = await _repositoryService.GetCaseSystemByIdAsync(_userExecutorEmail, id);
            return caseSystem;
        }

        [HttpGet]
        [Route("api/case/create")]
        public async Task<string> CreateCaseAsync()
        {
            string _userExecutorEmail = null;
            _userExecutorEmail = GetCurrentUserEmail();

            var id = await _repositoryService.CreateCaseAsync(_userExecutorEmail);
            return id;
        }
        #endregion API/CASES

        private string GetCurrentUserEmail()
        {
            if (User != null)
            {
                var currentType = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress";
                var email = User?.Claims.Where(c => c.Type == currentType).SingleOrDefault().Value;
                return email;
            }
            return null;
            throw new Exception();
        }
    }
}