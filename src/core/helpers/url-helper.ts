import { Injectable } from '@angular/core';
import { appUrls } from 'app/app-urls';

@Injectable({
  providedIn: 'root'
})
export class UrlHelper {
  getUrl(name: string, urlParams?: any): string {
    if (Object.prototype.hasOwnProperty.call(appUrls, name)) {
      let url = appUrls[name];
      // selects url parameters e.g. from url /accounts/:id will select :id
      // eslint-disable-next-line prefer-regex-literals
      const urlPatern = new RegExp('(:[a-zA-Z]+[a-zA-Z0-9]*)', 'g');
      const urlParamsTemplates: string[] = url.match(urlPatern);
      if (urlParamsTemplates && urlParamsTemplates.length > 0) {
        if (urlParams) {
          for (const urlParamTemplate of urlParamsTemplates) {
            if (!urlParamTemplate || urlParamTemplate.length < 1) {
              throw new Error(`Invalid parameter name: "${urlParamTemplate}" in url "${url}".`);
            }
            const urlParamName = urlParamTemplate.substr(1);
            if (Object.prototype.hasOwnProperty.call(urlParams, urlParamName)) {
              url = url.replace(urlParamTemplate, urlParams[urlParamName]);
            } else if (urlParamsTemplates.length === 1) {
              url = url.replace(urlParamTemplate, urlParams);
            } else {
              throw new Error('Please set required url parameter: ' + urlParamName + '.');
            }
          }
        } else {
          throw new Error(`Please set required url parameters: ${urlParamsTemplates}.`);
        }
      }
      return url;
    } else {
      throw new Error('Invalid url item name: ' + name + '.');
    }
  }
}
