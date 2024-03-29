import Logger from 'fl-logger';
import { DraggableService } from './draggable-service';
// import { BindingService } from './binding-service';
// import { ValueService } from './value-service';
import { Constants } from 'fl-event-manager/src/constants';

const logger = new Logger('ActionsService');

export class ActionsService {

  public static async matchActions(action: any, viewModel: any, el: any, attr: string): Promise<any> {
    try {
      let actionFound = false;
      for(let prop in viewModel) {
        let value = viewModel[prop];
        if(!action && action !== '') {
          return;
        }
        switch(attr) {
          case Constants.FRAMEWORK.ATTRIBUTES.DRAG_START:
            ActionsService.addDragStartCallback(el, attr);
            break;
          case Constants.FRAMEWORK.ATTRIBUTES.DRAG_OVER:
            ActionsService.addDragOverCallback(el, attr);
            break;
          case Constants.FRAMEWORK.ATTRIBUTES.DRAG_DROP:
            ActionsService.addDragDropCallback(el, attr);
            break;
          case Constants.FRAMEWORK.ATTRIBUTES.CLICK:
            ActionsService.addClickCallback(action, prop, el, value, attr);
            break;
        }
      }
      return true;
    } catch(e) {
      logger.error('failed with cause', e);
    }
  }

  private static addDragStartCallback(el: HTMLElement, attr: string): void {
    el.setAttribute('draggable', 'true');
    let dragStartCallback = (event: Event) => {
      try {
        // if(value && typeof value === 'function') value(event);
        DraggableService.dragstartHandler(event);
      } catch(e) {
        logger.error(`Failed to call "DragStart"'s callback due to cause:`, e);
      }
    };
    ActionsService.tryAddCallbackEvent('dragstart', '()', '', el, dragStartCallback, attr);
  }

  private static addDragOverCallback(el: HTMLElement, attr: string): void {
    let dragOverCallback = (event: Event) => {
      try {
        // if(value && typeof value === 'function') value(event);
        DraggableService.dragoverHandler(event);
      } catch(e) {
        logger.error(`Failed to call "DragOver"'s callback due to cause:`, e);
      }
    };
    ActionsService.tryAddCallbackEvent('dragover', '()', '', el, dragOverCallback, attr);
  }

  private static addDragDropCallback(el: HTMLElement, attr: string): void {
    let dragDropCallback = (event: Event) => {
      try {
        // if(value && typeof value === 'function') value(event);
        DraggableService.dropHandler(event);
      } catch(e) {
        logger.error(`Failed to call "DragDrop"'s callback due to cause:`, e);
      }
    };
    ActionsService.tryAddCallbackEvent('drop', '()', '', el, dragDropCallback, attr);
  }

  private static addClickCallback(action: string, prop: string, el: HTMLElement, value: string, attr: string): void {
    ActionsService.tryAddCallbackEvent('click', action, prop, el, value, attr);
  }

  public static async tryAddCallbackEvent(eventType: string, action: string, prop: string, el: HTMLElement, value: any, attr: string): Promise<any> {
    if(action.includes('(') && action.includes(')') && prop === action.replace('()', '')) {
      el.addEventListener(eventType, (event: Event) => {
        try {
          value(event);
        } catch(e) {
          logger.error(`Failed to bind callback to ${action} due to cause:`, e);
        }
      });
      return true;
    }
    return false;
  }
}