const initState = {
  history: JSON.parse(localStorage.getItem("history"))
};

const cartReducer = (state = initState, action) => {
  let parsedLocalHistory = JSON.parse(localStorage.getItem("history"));
  const formatDate = date => {
    let dd = String(date.getDate()).padStart(2, "0");
    let mm = String(date.getMonth() + 1).padStart(2, "0");
    let yyyy = date.getFullYear();
    return dd + "/" + mm + "/" + yyyy;
  };
  switch (action.type) {
    case "UPDATE_OFFLINE_HISTORY":
      let today = new Date();
      //if "history" exist in localStorage
      if (parsedLocalHistory) {
        let alreadyLoggedToday = state.history.find(
          eachDay => eachDay.date === formatDate(today)
        );
        let historyWithoutToday = state.history.filter(
          each => each.date !== formatDate(today)
        );
        if (!alreadyLoggedToday) {
          localStorage.setItem(
            "history",
            JSON.stringify([
              {
                logs: [action.productID],
                date: formatDate(today)
              },
              ...JSON.parse(localStorage.getItem("history"))
            ])
          );
        } else {
          let LogsWithoutCurrent = alreadyLoggedToday.logs.filter(
            log => log !== action.productID
          );
          localStorage.setItem(
            "history",
            JSON.stringify([
              {
                logs: [action.productID, ...LogsWithoutCurrent],
                date: alreadyLoggedToday.date
              },
              ...historyWithoutToday
            ])
          );
        }
        //below triggers only if "history" does not exist in localStorage
      } else {
        localStorage.setItem(
          "history",
          JSON.stringify([
            {
              logs: [action.productID],
              date: formatDate(today)
            }
          ])
        );
      }

      return {
        ...state,
        history: JSON.parse(localStorage.getItem("history"))
      };
    case "CLEAR_OFFLINE_HISTORY":
      localStorage.removeItem("history");
      return state;
    default:
      return state;
  }
};

export default cartReducer;
