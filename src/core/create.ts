import { checkConfigJson, createModule, selectModule } from '../utils/create'

export default async function create(moduleName: string): Promise<void> {
  checkConfigJson()

  let moduleStr

  // 当用户初始化子路由的时候不需要用户选择创建什么模块
  if (moduleName.split('/').length == 1) {
    moduleStr = await selectModule()
  }

  createModule(moduleStr, moduleName)
}
