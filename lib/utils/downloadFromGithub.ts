// const download = require('download-git-repo')

import download from 'download-git-repo'

const downloadFromGithub = (url: string, name: string) => {
	return new Promise<void>((resolve, reject) => {
		download(`direct:${url}`, name, { clone: true }, function (err: string) {
			if (!err) {
				resolve()
			} else {
				reject(err)
			}
		})
	})
}

export default downloadFromGithub
