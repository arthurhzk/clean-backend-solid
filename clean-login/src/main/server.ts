import { setupApp } from '@/main/config/app'
import { env } from '@/main/env'

const app = setupApp()
app.listen(env.PORT, () => console.log('Server running at port ' + env.PORT))
