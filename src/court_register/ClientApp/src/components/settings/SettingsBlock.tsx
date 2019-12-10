import * as React from 'react';
import { NavLink } from 'react-router-dom';

const SettingsBlock = () => (
    <div>
        <NavLink className="text-dark" to="/settings/profile">Профиль</NavLink>
        <NavLink className="text-dark" to="/settings/users">Пользователи</NavLink>
        <NavLink className="text-dark" to="/settings/units">Подразделения</NavLink>
    </div>
);

export default SettingsBlock;
