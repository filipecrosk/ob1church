import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "hrefToJS"
})
export class HrefToJSPipe implements PipeTransform {
  transform(text: string): string {
    const regex = /href="([\S]+)"/g;

    return text.replace(regex, `onClick="window.open('$1', '_system')"`);
  }
}
