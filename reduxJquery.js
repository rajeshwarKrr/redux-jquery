var initialState = {
  count: 0,
  id: 0,
  todos: [],
};

const rootReducer = (state = initialState, action) => {
  //   debugger;
  switch (action.type) {
    case "INC": {
      const newState = { ...state };
      newState.count++;
      return newState;
    }
    case "DEC": {
      const newState = { ...state };
      newState.count--;
      return newState;
    }
    case "ADD_TODO": {
      const newState = { ...state };
      newState.id++;
      return {
        ...newState,
        todos: [...newState.todos, { task: action.payload, id: newState.id }],
      };
    }
    case "REMOVE_TODO": {
      const newState = { ...state };
      return {
        ...newState,
        todos: newState.todos.filter((todo) => action.payload !== todo.id),
      };
    }

    default:
      return state;
  }
};

const store = Redux.createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

$(document).ready(() => {
  let currentState = store.getState();
  $("#counter").text(currentState.count);

  $("#inc").on("click", () => {
    store.dispatch({
      type: "INC",
    });
    let currentState = store.getState();
    $("#counter").text(currentState.count);
  });

  $("#dec").on("click", () => {
    store.dispatch({
      type: "DEC",
    });
    let currentState = store.getState();
    $("#counter").text(currentState.count);
  });

  $("#todos").on("click", "button", (e) => {
    store.dispatch({
      type: "REMOVE_TODO",
      payload: Number($(e.target).attr("id")),
    });

    $(e.target).parent().remove();
  });

  $("#todoForm").on("submit", (e) => {
    e.preventDefault();
    const newTask = $("#task").val();

    store.dispatch({
      type: "ADD_TODO",
      payload: newTask,
    });

    let currentState = store.getState();

    const newLi = $("<li>", {
      text: newTask,
    });

    const newButton = $("<button>", {
      text: "x",
      id: currentState.id,
    });

    newLi.append(newButton);

    $("#todos").append(newLi);

    $("#todoForm").trigger("reset");
  });
});
