import { fork } from 'redux-saga/effects';
import * as stats from './stats';

export default function* rootSaga() {
  yield fork(stats.doFetch);  
}