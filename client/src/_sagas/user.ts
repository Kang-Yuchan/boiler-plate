import {
  all,
  fork,
  takeLatest,
  call,
  put,
  takeEvery
} from "redux-saga/effects";
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  AUTH_REQUEST,
  Action,
  AUTH_SUCCESS,
  AUTH_FAILURE
} from "../_reducer/user";
import Axios from "axios";

function loginAPI(loginData: Action) {
  return Axios.post("/users/login", loginData, {
    withCredentials: true
  });
}

function* login(action: Action): Generator {
  try {
    const result: any = yield call(loginAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOG_IN_FAILURE,
      reason: error.response && error.response.data
    });
  }
}

function* watchLogin(): Generator {
  yield takeLatest(LOG_IN_REQUEST, login);
}

function logoutAPI() {
  //request to server
  return Axios.post(
    "/users/logout",
    {},
    {
      withCredentials: true
    }
  );
}

function* logout(): Generator {
  try {
    yield call(logoutAPI);
    yield put({
      type: LOG_OUT_SUCCESS
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOG_OUT_FAILURE,
      error: error
    });
  }
}

function* watchLogout(): Generator {
  yield takeLatest(LOG_OUT_REQUEST, logout);
}

function signUpAPI(signUpData: Action) {
  return Axios.post("/users/register", signUpData);
}

function* signUp(action: Action): Generator {
  try {
    yield call(signUpAPI, action.data);
    yield put({
      type: SIGN_UP_SUCCESS
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: SIGN_UP_FAILURE,
      error: error
    });
  }
}

function* watchSignup(): Generator {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function authAPI() {
  return Axios.get("/users/auth", {
    withCredentials: true
  });
}

function* auth(): Generator {
  try {
    yield call(authAPI);
    yield put({
      type: AUTH_SUCCESS
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: AUTH_FAILURE,
      error: error
    });
  }
}

function* watchAuth(): Generator {
  yield takeEvery(AUTH_REQUEST, auth);
}

export default function* userSaga(): Generator {
  yield all([
    fork(watchLogin),
    fork(watchLogout),
    fork(watchSignup),
    fork(watchAuth)
  ]);
}
