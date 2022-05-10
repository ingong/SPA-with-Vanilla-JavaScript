export const createStore = (reducer) => {
  let state = reducer();

  const publish = () => listener.forEach(({ subscriber, context }) => subscriber.call(context));

  const dispatch = (action) => {
    state = reducer(state, action);
    publish();
  };

  const listener = [];

  const subscribe = (subscriber, context = null) => listener.push({ subscriber, context });

  const getState = () => (state?.length > 0 ? state : []);

  return { getState, dispatch, subscribe };
};
