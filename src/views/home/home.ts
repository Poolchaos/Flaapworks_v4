import { ViewLifecycle, Logger } from 'flaapworks';
import './desktop.css';
// constants
const logger = new Logger('Home');

export class Home extends ViewLifecycle {
  public members = 10;

  constructor() {
    super();
    logger.info(' ::>> home loaded >>>>>> ');
  }

  protected activate(): void {}

}