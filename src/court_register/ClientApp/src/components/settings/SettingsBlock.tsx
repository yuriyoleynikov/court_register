import * as React from 'react';
import { NavLink } from 'react-router-dom';

const SettingsBlock = () => (
    <div>
        <div>
            <NavLink className="text-dark" to="/settings/profile">Профиль</NavLink>
        </div>
        <div>
            <NavLink className="text-dark" to="/settings/users">Пользователи</NavLink>
        </div>
        <div>
            <NavLink className="text-dark" to="/settings/units">Подразделения</NavLink>
        </div>
    </div>
);

export default SettingsBlock;
