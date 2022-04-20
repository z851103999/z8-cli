import { CommanderStatic } from 'commander'
import { checkNodeVersion, downloadFromGithub } from 'lib/utils'
import { stringify } from 'querystring'

declare namespace cli {
	interface Cli {
		/**
		 * 检查node版本
		 */
		checkNodeVersion: (wanted: string, id: string) => void
		/**
		 * 下载github仓库模板
		 */
		downloadFromGithub: (url: string, name: string) => Promise<void>
		/**
		 * 增强消息错误提示
		 */
		enhanceErrorMessages: (program: CommanderStatic, methodName: string, log: any) => void
		/**
		 * 帮助命令
		 */
		suggestCommands: (program: CommanderStatic, cmd: any) => void
		/**
		 * 创建应用
		 */
		createApp: (projectName: string) => Promise<void>
		/**
		 * 创建vue
		 */
		createVueApp: (projectName: string, targetDir: string) => Promise<void>
	}
}

declare const Cli: cli.Cli
export = Cli
