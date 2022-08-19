import Logger from 'fl-logger';
import { Flaapworks } from 'flaapworks';

Logger.logLevel = Logger.LOG_LEVELS.DEBUG;
const logger = new Logger('Index');

logger.debug('this is a test');
logger.info('this is a test');
logger.error('this is a test');
// new Router();

(async function() {
  logger.debug('initialising app');
  await Flaapworks.withRouter();
  await Flaapworks.initialise();
  logger.exclaim('FLAAP-APP INITALISED');
})();
 