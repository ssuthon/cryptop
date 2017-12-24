import { take, call, put } from 'redux-saga/effects';
import axios from 'axios'

import {
  fetchStats,
  updateStats
} from '../actions/main';

export function* doFetch(){
  while(true){    
    yield take(`${fetchStats}`);

    let response = yield call(axios.get,'http://d.bonmek.com:8007/stats')
        
    if(response.data){
      yield put(updateStats(response.data))
    }
  }
}