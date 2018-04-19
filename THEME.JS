import Core from './core'
import Store from '../../../vuex/store'

//设置主题
export function setTheme() {
  if (Core.IsUseApi) {
    if (!Core.IsAndroid()) {
      Core.SetStatusBarStyle(Store.state.appStatus.theme);
    }
  }
}
