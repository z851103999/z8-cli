#!/usr/bin/env node
import * as config from '../package.json'
import chalk from 'chalk'
import commander from 'commander'
import didYouMean from 'didYouMean'
import create from '../lib/create'
import { checkNodeVersion, suggestCommands, enhanceErrorMessages } from '../lib/utils'

const requiredVersion = config.engines.node
didYouMean.threshold = 0.6

const program = new commander.Command()

/**
 * 检查节点版本要求>=9.0
 */
checkNodeVersion(requiredVersion, 'cli')

/**
 * 创建项目
 */
program.version(config.version).usage('<command> [options]')
program
	.command('create <app-name>')
	.description('使用来自git存储库的模板创建一个项目')
	.action((name, cmd) => {
		create(name)
	})

/**
 * 输出未知命令的帮助信息
 */
program.arguments('<command>').action((cmd: NodeJS.Process) => {
	program.outputHelp()
	console.log('  ' + chalk.red(`未知命令 ${chalk.yellow(cmd)}`))
	console.log()
	suggestCommands(program, cmd)
})

/**
 * 增强错误提示
 */
enhanceErrorMessages(program, 'missingArgument', (argName: string) => {
	return `缺少必需的参数 ${chalk.yellow(`<${argName}>`)}.`
})

enhanceErrorMessages(program, 'unknownOption', (optionName: string) => {
	return `未知选项 ${chalk.yellow(optionName)}.`
})

enhanceErrorMessages(program, 'optionMissingArgument', (option, flag) => {
	return `缺少所需要的参数 ${chalk.yellow(option.flags)}` + (flag ? `, got ${chalk.yellow(flag)}` : '')
})

program.parse(process.argv)
/**
 * 添加下有用的帮助信息
 */
program.on('--help', () => {
	console.log()
	console.log(`  Run ${chalk.cyan('<command> --help')} 有关给定命令的详细用法。`)
	console.log()
})
if (!process.argv.slice(2).length) {
	program.outputHelp()
}
