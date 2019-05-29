export const statusSelector = state => state.auth.get('status');
export const tokenSelector = state => state.auth.get('token');
export const userSelector = state => state.auth.get('user');
export const getUserName = state => state.auth.getIn(['user', 'name']);
export const getUserEmail = state => state.auth.getIn(['user', 'email']);
