// @ts-ignore
import { v4 as uuidv4 } from 'uuid';
// @ts-ignore
import Logger from 'fl-logger';
import { Constants } from './constants';

const logger = new Logger('Eventing');

export class Eventing {

  private static handlers: any = {};

  public static subscribe(eventName: string, callback: (event: IMessage) => void, subscriber?: string): void {
    try {
      subscriber = subscriber || uuidv4();
      Eventing.handlers[eventName] = Eventing.handlers[eventName] || {};
      Eventing.handlers[eventName][subscriber] = callback;
    } catch(e) {
      logger.error(`Error: Unable to add subscription to event '${eventName}' with cause `, new Error(e));
    }
  }

  public static subscribeOnce(eventName: string, callback: (event: IMessage) => void): void {
    const subscriberId = uuidv4();
    Eventing.subscribe(eventName, async (data: any) => {
      await Eventing.unsubscribe(eventName, subscriberId);
      Promise.resolve();
    }, subscriberId);
  }

  public static publish(event: string, payload: any): void {
    const _message: IMessage = {
      pipe: Constants.EVENT.PIPE,
      event,
      payload,
      timestamp: Date.now()
    };
    try {
      for(let subscriber in Eventing.handlers[event]) {
        if(Eventing.handlers[event].hasOwnProperty(subscriber)) {
          Eventing.handlers[event][subscriber](payload);
        }
      }
    } catch(e) {
      logger.error(`Error: Failed to handle event with cause `, new Error(e));
    }
  }

  private static unsubscribe(eventName: string, subscriber: string): void {
    try {
      delete Eventing.handlers[eventName][subscriber];
      if(Object.keys(Eventing.handlers[eventName]).length <= 0) {
        try {
          delete Eventing.handlers[eventName];
        } catch(e) {
          logger.error('Failed to remove subscription by event with cause ', new Error(e));
        }
      }
    } catch(e) {
      logger.error('Failed to remove subscription with cause ', new Error(e));
    }
  }

  // todo: handle unsubscribing from class
}

export interface IMessage {
  pipe: string;
  event: string;
  payload: any;
  timestamp: number;
}