const initState = {
  modals: {
    showLogin: false,
    showRegister: false
  },
  showSideMenu: false,
  showLogout: false
};

const liveReducer = (state = initState, action) => {
  switch (action.type) {
    case "SHOW_LOGIN":
      return {
        ...state,
        modals: {
          ...state.modals,
          showLogin: true
        }
      };
    case "HIDE_LOGIN":
      return {
        ...state,
        modals: {
          ...state.modals,
          showLogin: false
        }
      };
    case "SHOW_REGISTER":
      return {
        ...state,
        modals: {
          ...state.modals,
          showRegister: true
        }
      };
    case "HIDE_REGISTER":
      return {
        ...state,
        modals: {
          ...state.modals,
          showRegister: false
        }
      };
    case "SHOW_SIDE_MENU":
      return {
        ...state,
        showSideMenu: true
      };
    case "HIDE_SIDE_MENU":
      return {
        ...state,
        showSideMenu: false
      };
    case "SHOW_LOGOUT":
      return {
        ...state,
        showLogout: true
      };
    case "HIDE_LOGOUT":
      return {
        ...state,
        showLogout: false
      };
    default:
      return state;
  }
};

export default liveReducer;
