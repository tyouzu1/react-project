import {
/** *
   * 和 takeEvery 不同，在任何时刻 takeLatest 只允许一个 fetchData 任务在执行。
   * 并且这个任务是最后被启动的那个。
   * 如果已经有一个任务在执行的时候启动另一个 fetchData ，那之前的这个任务会被自动取消。
   */
// takeLatest,
/**
   * takeEvery 允许多个 fetchData 实例同时启动。
   * 在某个特定时刻，尽管之前还有一个或多个 fetchData 尚未结束，我们还是可以启动一个新的 fetchData 任务，
   */
// takeEvery,
} from 'redux-saga/effects';

export default function* rootSaga() {
  yield [

  ];
}
