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
        private readonly IUnitRepositoryService _unitRepositoryService;
        private readonly IUserRepositoryService _userRepositoryService;

        public UnitController(IUnitRepositoryService unitRepositoryService, IUserRepositoryService userRepositoryService)
        {
            _unitRepositoryService = unitRepositoryService;
            _userRepositoryService = userRepositoryService;
        }

        [HttpGet]
        [Route("api/unit/get_unit_list")]
        public async Task<IEnumerable<Unit>> GetUnitList()
        {
            if (await GetSelfIsActive(User?.Claims))
            {
                var unitList = await _unitRepositoryService.GetAllUnitsAsync();
                return unitList;
            }

            return null;
        }

        [HttpGet]
        [Route("api/unit/getunit/{id}")]
        public async Task<Unit> GetUnit(int id)
        {
            if (await GetSelfIsAdmin(User?.Claims))
            {
                var unit = await _unitRepositoryService.GetUnitAsync(id);
                return unit;
            }
            return null;
        }

        [HttpPut]
        [Route("api/unit/udpate_unit/{id}")]
        public async Task<bool> UpdateUnit(int id, [FromBody]Unit unit)
        {
            if (await GetSelfIsAdmin(User?.Claims))
            {
                var unitList = await _unitRepositoryService.GetAllUnitsAsync();
                var unitWillUpdate = unitList.Where(un => un.id == id).SingleOrDefault();
                var newUnit = new Unit
                {
                    id = id,
                    name = unit.name,
                    full_name = unit.full_name
                };

                return await _unitRepositoryService.UpdateUnitAsync(id, newUnit);
            }

            return false;
        }

        private string GetUserEmail(IEnumerable<Claim> claimsPrincinal)
        {
            var currentType = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress";

            var email = claimsPrincinal.Where(c => c.Type == currentType).SingleOrDefault().Value;

            return email;
        }

        private async Task<bool> GetSelfIsAdmin(IEnumerable<Claim> claimsPrincinal)
        {
            var email = GetUserEmail(claimsPrincinal);

            var userList = await _userRepositoryService.GetUsersAsync();
            var currentUser = userList.Where(u => u.email == email).SingleOrDefault();
            if (currentUser != null && currentUser.active && currentUser.admin)
            {
                return true;
            }

            return false;
        }

        private async Task<bool> GetSelfIsActive(IEnumerable<Claim> claimsPrincinal)
        {
            var email = GetUserEmail(claimsPrincinal);

            var userList = await _userRepositoryService.GetUsersAsync();
            var currentUser = userList.Where(u => u.email == email).SingleOrDefault();
            if (currentUser != null && currentUser.active)
            {
                return true;
            }

            return false;
        }
    }
}
