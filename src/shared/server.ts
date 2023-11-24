import { app } from '@shared/app';
import Logger from '@config/logger';

app.listen(3333, () => {
  Logger.info('Server started on port 3333');
});
