import { app } from '@shared/app';
import Logger from '@config/logger';
const PORT = 3333;

app.listen(PORT, () => {
  Logger.info(`Server started on port http://localhost:${PORT}`);
});
