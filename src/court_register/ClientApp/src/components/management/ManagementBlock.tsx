import * as React from 'react';
import { NavLink } from 'react-router-dom';

export default () => (
    <div>
        <div>
            <NavLink className="text-dark" to="/management/users?active=true">Пользователи</NavLink>
        </div>
    </div>
);
