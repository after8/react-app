import { delay } from "redux-saga/effects";
import { put } from "redux-saga/effects";
import axios from "axios";

import * as actions from "../actions/index";

// Generator
// Functions that can be executed incrementally
// You can call them and they don't run from start to end immediatelly
// You can pause function execution to wait for asynchronous code to finish
// If you have synchronous code you can execute it form start to end immediatelly
// Prepend each step you execute with yield key word
// Because of yield each step will be finished before it goes to the next one
export function* logoutSaga(action) {
  //yield localStorage.removeItem("token");
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("expirationDate");
  yield localStorage.removeItem("userId");
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };
  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
    process.env.REACT_APP_FIREBASE_KEY;
  if (!action.isSignup) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
      process.env.REACT_APP_FIREBASE_KEY;
  }
  try {
    const response = yield axios.post(url, authData);

    const expirationDate = yield new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    yield localStorage.setItem("token", response.data.idToken);
    yield localStorage.setItem("expirationDate", expirationDate);
    yield localStorage.setItem("userId", response.data.localId);
    yield put(
      actions.authSuccess(response.data.idToken, response.data.localId)
    );
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch (error) {
    yield put(actions.authFail(error.response.data.error));
  }
}

export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem("token");
  if (!token) {
    yield put(actions.logout());
  } else {
    const expirationDate = yield new Date(
      localStorage.getItem("expirationDate")
    );
    if (expirationDate <= new Date()) {
      yield put(actions.logout());
    } else {
      const userId = yield localStorage.getItem("userId");
      yield put(actions.authSuccess(token, userId));
      yield put(
        actions.checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    }
  }
}
