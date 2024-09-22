import sanic
import motor.motor_asyncio
import dotenv
import os
import blueprints

dotenv.load_dotenv()

app = sanic.Sanic("unical")
app.blueprint(blueprints.blueprints)


@app.after_server_start
async def after_start(unical: sanic.Sanic, loop):
	app.ctx.db_client = motor.motor_asyncio.AsyncIOMotorClient(os.getenv('MONGODB_URL'), tls=True,
															   tlsCertificateKeyFile=os.getenv('MONGODB_CERT'),
															   io_loop=loop)
	app.ctx.db = app.ctx.db_client['test']
	await app.ctx.db['classes'].create_index('subject')
	await app.ctx.db['classes'].create_index('classId')
	await app.ctx.db['classes'].create_index('termId')
	await app.ctx.db['sections'].create_index('subject')
	await app.ctx.db['sections'].create_index('classId')
	await app.ctx.db['sections'].create_index('termId')
	await app.ctx.db['sections'].create_index('seatsRemaining')
	await app.ctx.db['sections'].create_index('waitRemaining')


if __name__ == '__main__':
	app.run(host='0.0.0.0')
