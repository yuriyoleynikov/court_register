using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using court_register.Models;
using court_register.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace court_register.Controllers
{
    [ApiController]
    [Authorize]
    public class UnitController : ControllerBase
    {
        private readonly IRepositoryService _repositoryService;

        public UnitController(IRepositoryService repositoryService)
        {
            _repositoryService = repositoryService;
        }

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
        public async Task<bool> AddUnitAsync([FromBody]Unit unit)
        {
            string _userExecutorEmail = null;
            _userExecutorEmail = GetCurrentUserEmail();

            await _repositoryService.AddUnitAsync(_userExecutorEmail, unit);

            return true;
        }

        //[HttpPut]
        //[Route("api/unit/udpate_unit/{id}")]
        //public async Task<bool> UpdateUnit(int id, [FromBody]Unit unit)
        //{
        //    if (await GetSelfIsAdmin(User?.Claims))
        //    {
        //        var unitList = await _unitRepositoryService.GetAllUnitsAsync();
        //        var unitWillUpdate = unitList.Where(un => un.id == id).SingleOrDefault();
        //        var newUnit = new Unit
        //        {
        //            id = id,
        //            name = unit.name,
        //            full_name = unit.full_name
        //        };

        //        return await _unitRepositoryService.UpdateUnitAsync(id, newUnit);
        //    }

        //    return false;
        //}

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
