import updateNotifier from 'update-notifier'
// https://www.npmjs.com/package/update-notifier
import { currentPackageJson } from './common'
/**
 * 更新通知
 */
const notifier = updateNotifier({ pkg: currentPackageJson, updateCheckInterval: 0 })

export default notifier
