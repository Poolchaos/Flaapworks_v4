import { ViewLifecycle, Logger } from "flaapworks";

const logger = new Logger('Members');

export class Members extends ViewLifecycle {
  
  protected activate(): void {
    logger.info(' ::>> activate >>> ');
  }
  protected attached(): void {
    logger.info(' ::>> attached >>> ');
  }
  protected deactivate(): void {
    logger.info(' ::>> deactivate >>> ');
  }
}