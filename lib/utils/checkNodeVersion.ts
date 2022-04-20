import chalk from 'chalk'
import semver from 'semver'
// https://www.npmjs.com/package/semver

/**
 * 检查Node版本
 * @param wanted 范围版本
 * @param id 版本号
 */
const checkNodeVersion = (wanted: string, id: string) => {
	if (!semver.satisfies(process.version, wanted)) {
		console.log(
			chalk.red(
				'你正在使用的Node' + process.version + ',但是这个版本的' + id + '需要Node' + wanted + '.\n请升级您的Node版本'
			)
		)
		process.exit(1)
	}
}

export default checkNodeVersion
