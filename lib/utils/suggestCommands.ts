import chalk from 'chalk'
import didYouMean from 'didYouMean'
import { Command } from 'commander'

const suggestCommands = (program: Command, cmd) => {
	const availableCommands = program.commands.map((cmd) => {
		return cmd.name
	})
	const suggestion = didYouMean(cmd, availableCommands)
	if (suggestion) {
		console.log('  ' + chalk.red(`Did you mean ${chalk.yellow(suggestion)}?`))
	}
}
export default suggestCommands
