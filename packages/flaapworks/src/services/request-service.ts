import Logger from 'fl-logger';
import { BindingService } from './binding-service';

let logger = new Logger('RequestService');
export class RequestService {
  
  public static fetch(ModuleName: string): any {
    return {
      asHtml: () => {
        try {
          return require(`html-loader!../${ModuleName}.html`);
        } catch (e) {
          logger.error(`Failed to get html resource ${ModuleName} due to cause:`, e);
        }
      },
      asTs: () => {
        console.log(' ::>> fetch .>>>>> ', `html-loader!../${ModuleName}.ts`);
        try {
          return require(`../${ModuleName}.ts`);
        } catch (e) {
          logger.error(`Failed to get ts resource ${ModuleName} due to cause:`, e);
        }
      }
    };
  }

  public static parseHtmlString(htmlString: string): Document {
    const parser = new DOMParser();
    return parser.parseFromString(htmlString, 'text/html');
  }

  public static async parseXmlString(moduleName: string, templateId: string, htmlString: string): Promise<any> {
    try {
      const parser = new DOMParser();
      let doc: any = RequestService.parseHtmlString(htmlString);
      let script = document.createElement('script');
      script.id = templateId;
      script.type = 'text/template';
      await script.insertAdjacentHTML('afterbegin', doc.body.innerHTML);
      return script;
    } catch (e) {
      logger.error(`Failed to parse module '${moduleName}' due to cause:`, e);
    }
  }

  public static async parseFetchedXml(moduleName: string, templateId: string): Promise<any> {
    try {
      logger.debug(' ::>> parseFetchedXml ', moduleName, templateId);
      let htmlString: string = await RequestService.fetch(moduleName).asHtml();
      logger.debug(' ::>> htmlString 1 ', htmlString);
      htmlString = await BindingService.identifyTemplateElements(htmlString);
      logger.debug(' ::>> htmlString 2 ', htmlString);
      let doc: any = RequestService.parseHtmlString(htmlString);
      logger.debug(' ::>> doc ', doc);
      let script = document.createElement('script');
      script.id = templateId;
      script.type = 'text/template';
      await script.appendChild(doc.head.firstChild.content);
      return script;
    } catch (e) {
      logger.error(`Failed to parse module '${moduleName}' due to cause:`, e);
    }
  }
}