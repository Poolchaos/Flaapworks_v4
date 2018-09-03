import Logger from 'fl-logger';
import { DtlController } from 'fl-pal';

Logger.logLevel = Logger.LOG_LEVELS.DEBUG;
const logger = new Logger('Flaapworks');

logger.debug('This is my test log');


class Flaapworks {

  public static async initialise(): Promise<any> {
    try {
      await DtlController.initialise();
      return Flaapworks;
    } catch (e) {
      logger.error('Failed to load dtlController due to cause:', e);
    }
  }

  public static async withRouter(): Promise<any> {
    return Flaapworks;
  }
}
export { Flaapworks, Logger };

Flaapworks.initialise();
Flaapworks.withRouter();