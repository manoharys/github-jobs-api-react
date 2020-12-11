import { useReducer, useEffect } from "react";
import axios from "axios";

const ACTIONS = {
  MAKE_REQUEST: "makeRequest",
  GET_REQUEST: "getRequest",
  ERROR: "error",
};

const BASE_URL = "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json";

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return {
        jobs: [],
        loading: true,
      };
    case ACTIONS.GET_REQUEST:
      return {
        ...state,
        jobs: action.payLoad.jobs,
        loading: false,
        error: false,
      };

    case ACTIONS.ERROR:
      return {
        jobs: [],
        loading: false,
        error: action.payLoad.error,
      };

    default:
      return state;
  }
};

const useFetchJobs = (params, page) => {
  const [state, dispatch] = useReducer(reducer, { jobs: [], loading: true });

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    console.log("HYY");
    dispatch({ type: ACTIONS.MAKE_REQUEST });
    axios
      .get(BASE_URL, {
        cancelToken: cancelToken.token,
        params: { markdown: true, page: page, ...params },
      })
      .then((res) => {
        console.log(res);
        dispatch({ type: ACTIONS.GET_REQUEST, payLoad: { jobs: res.data } });
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        dispatch({ type: ACTIONS.ERROR, payLoad: { error: e } });
      });

    return () => {
      cancelToken.cancel();
    };
  }, []);
  return state;
};

export default useFetchJobs;
