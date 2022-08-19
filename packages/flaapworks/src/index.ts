import Logger from 'fl-logger';
import { DtlController } from 'fl-pal';
import { ViewLifecycle } from './base';
import { ModuleLoader } from './services/module-loader';

Logger.logLevel = Logger.LOG_LEVELS.DEBUG;
const logger = new Logger('Flaapworks');

// todo: implement router
const Router = {
  configure: (data: any[]) => {},
  navigate: (route: string) => {}
};


class Flaapworks {
  public static router: typeof Router;

  constructor() {
    logger.debug('This is my test log');
  }

  public static async initialise(): Promise<any> {
    logger.debug(' ::>> Flaapworks initialising...');
    try {
      await DtlController.initialise();
      await ModuleLoader.initialise();
      return Flaapworks;
    } catch (e) {
      logger.error('Failed to load dtlController due to cause:', e);
    }
  }

  public static async withRouter(): Promise<any> {
    this.router = Router;
    // await Router.initialise();
    return Flaapworks;
  }
}
export { Flaapworks, ViewLifecycle, Logger };
