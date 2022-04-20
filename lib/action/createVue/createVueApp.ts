import ora from 'ora'
import fs from 'fs-extra'
import chalk from 'chalk'
import figlet from 'figlet'
import inquirer from 'inquirer'
import logSymbols from 'log-symbols'
import { downloadFromGithub } from '../../utils'
import REMOTE_URL from '../../value'

const createVueApp = async (projectName: string, targetDir: string) => {
	const { vueVersion } = await inquirer.prompt([
		{
			type: 'list',
			name: 'vueVersion',
			message: '您想创建哪个vue版本',
			default: 'Vue3',
			choices: ['Vue3', 'Vue2'],
			validate(val) {
				return true
			}
		}
	])
	const { author, description, version, package_manager } = await inquirer.prompt([
		{
			type: 'input',
			name: 'description',
			message: '请输入您的项目说明',
			default: 'description',
			validate(val) {
				return true
			}
		},
		{
			type: 'input',
			name: 'author',
			message: '请输入作者姓名',
			default: 'author',
			validate(val) {
				return true
			},
			// 转换显示给用户的值
			transformer(val) {
				return val
			}
		},
		{
			type: 'input',
			name: 'version',
			message: '输入项目版本',
			default: '1.0.0',
			validate(val) {
				return true
			},
			transformer(val) {
				return val
			}
		},
		{
			type: 'list',
			name: 'package_manager',
			message: '您想使用哪个包管理器',
			default: 'Yarn',
			choices: ['Yarn', 'Npm'],
			validate(val) {
				return true
			}
		}
	])
	// 提示
	console.log(chalk.white(`\\n\\n✨ 创建项目 ${chalk.yellow(targetDir)}`))
	console.log(chalk.white(`\\n🗃 初始化git仓库...`))
	const spinner = ora({
		text: `从git仓库下载模板…这可能需要一段时间....\n`
	})
	spinner.start()
	// 下载模板
	downloadFromGithub(vueVersion === 'Vue3' ? REMOTE_URL.VUE3 : REMOTE_URL.VUE2, projectName)
		.then((res) => {
			fs.readFile(`./${projectName}/package.json`, 'utf8', function (err, data) {
				if (err) {
					spinner.stop()
					console.error(err)
					return
				}
				const packageJson = JSON.parse(data)
				packageJson.name = projectName
				packageJson.description = description
				packageJson.author = author
				packageJson.version = version
				let updatePackageJson = JSON.stringify(packageJson, null, 2)
				fs.writeFile(`./${projectName}/package.json`, updatePackageJson, 'utf8', function (err) {
					spinner.stop()
					if (err) {
						console.error(err)
					} else {
						console.log(chalk.white(`📦  安装额外的依赖…\n`))
						// 将node工作目录更改成构建的项目根目录下
						process.chdir(`./${projectName}`)
						// 安装项目依赖
						const child_process = require('child_process')
						if (package_manager === 'Yarn') {
							// 运行命令
							child_process.execSync('yarn', { stdio: [0, 1] })
						} else {
							child_process.execSync('npm install', { stdio: [0] })
						}
						// 依赖安装完成之后给出提示信息
						console.log(chalk.white(`\n🎉  成功创建项目`), chalk.yellow(`${projectName}.`))
						console.log(chalk.white('👉  开始使用一下命令:\n'))
						console.log(`${chalk.cyan(`${chalk.gray('$')} cd ${projectName}`)}`)
						console.log(
							package_manager === 'Yarn'
								? chalk.cyan(`${chalk.gray('$')} yarn start\n\n`)
								: chalk.cyan(`${chalk.gray('$')} npm run start\n\n`)
						)
						console.log(chalk.white(figlet.textSync('cli')))
					}
					process.exit()
				})
			})
		})
		.catch((err) => {
			console.log(logSymbols.error, err)
			spinner.fail(chalk.red('对不起，一定是哪里出错了，请检查一下。 \n'))
			process.exit(-1)
		})
}

export default createVueApp
