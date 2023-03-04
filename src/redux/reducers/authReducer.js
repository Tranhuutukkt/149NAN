import { SIGNIN_SUCCESS, SIGNOUT_SUCCESS } from '../constants';

const initState = null;
// {
// id: 'test-123',
// role: 'ADMIN',
// provider: 'password'
// };

export default (state = initState, action) => {
    switch (action.type) {
        case SIGNIN_SUCCESS:
            return {
                id: action.payload.id,
                email: action.payload.email,
                role: action.payload.role,
                provider: action.payload.provider,
                emailVerified: action.payload.emailVerified
            };
        case SIGNOUT_SUCCESS:
            return null;
        default:
            return state;
    }
};
