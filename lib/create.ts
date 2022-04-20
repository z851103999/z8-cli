import * as path from 'path'
import fs from 'fs-extra'
import inquirer from 'inquirer'
import chalk from 'chalk'
import { createVueApp } from './action'

const createApp = async (projectName: string) => {
	// 返回当前目录
	const cwd = process.cwd()
	// 解析路径
	const targetDir = path.resolve(cwd, projectName)
	const name = path.relative(cwd, projectName)
	// 如果路径存在返回true
	if (fs.existsSync(targetDir)) {
		// 向用户提出问题交互
		const { action } = await inquirer.prompt([
			{
				name: 'action',
				type: 'list',
				message: `目标文件${chalk.cyan(targetDir)}已经存在,请输入其他文件名`,
				choices: [
					{ name: 'Overwrite', value: 'overwrite' },
					{ name: 'Cancel', value: false }
				]
			}
		])
		if (!action) {
			return
		} else if (action === 'overwrite') {
			console.log(`\n 删除${chalk.cyan(targetDir)}...`)
			// https://www.npmjs.com/package/fs-extra
			await fs.remove(targetDir)
		}
	}
	// 向用户提示问题
	const { framework } = await inquirer.prompt([
		{
			type: 'list',
			name: 'framework',
			message: '你想要创建那个框架',
			default: 'Vue',
			choices: ['Vue', 'React'],
			// 验证答案
			validate(val) {
				return true
			}
		}
	])
	// 未来向扩展加入其他框架react
	switch (framework) {
		case 'Vue':
			await createVueApp(name, targetDir)
			break
		default:
			break
	}
}
export default createApp
