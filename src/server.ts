import app, { init } from '@/app'

const PORT = process.env.PORT || 5000

init().then(() => {
	app.listen(PORT, () => {
		console.log('Express server listening on port ' + PORT)
	})
})

