import { proxy } from 'valtio';

/**
 * 全局状态，用于跨组件间的通信，详见 https://github.com/pmndrs/valtio
 * eg:
 *  监听状态改变：
 *    import { useSnapshot } from 'valtio'
 *    import { state } from 'src/models/state';
 *
 *    const snap = useSnapshot(state);
 *    console.log(snap.count)
 *
 *  触发状态改变：
 *    import { state } from 'src/models/state';
 *    events: () => ++state.count
 */
export const state = proxy({ count: 0 });
