function createTypes(namespace, typesObj) {
  const types = {};
  Object.keys(typesObj).forEach((key) => { types[key] = `${namespace}/${typesObj[key]}`; });
  return types;
}
export const types = createTypes('USER', {
  AUTO_LOGIN: 'AUTH_AUTO_LOGIN',
  SIGNUP_REQUEST: 'SIGNUP_REQUEST',
  SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',
  SIGNUP_FAILURE: 'SIGNUP_FAILURE',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
});

export const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SIGNUP_REQUEST:
    case types.LOGIN_REQUEST:
      return { ...state, isLoading: true, error: null };

    case types.SIGNUP_SUCCESS:
    case types.LOGIN_SUCCESS:
      return { ...state, isLoading: false, user: action.user };

    case types.SIGNUP_FAILURE:
    case types.LOGIN_FAILURE:
      return { ...state, isLoading: false, error: action.error };

    case types.LOGOUT:
      return { ...state, user: null };

    default:
      return state;
  }
};

export const actions = {
  signup: (email, password) => ({ type: types.SIGNUP_REQUEST, email, password }),
  login: (email, password) => ({ type: types.LOGIN_REQUEST, email, password }),
  logout: () => ({ type: types.LOGOUT }),
};

// export const getProduct = state => state.product.products;
// export const getProductById = (state, id) => find(state.product.products, id);
// export const getProductSortedByName = state => sortBy(state.product.products, 'name');
// export const getExpiredProducts = state => filter(state.product.products, { isExpired: true });
