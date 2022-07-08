import { Message } from '../messages/schemas/messages.schema';

export class FilterResponseService {
  filterResponse(response, keys: string[]): Record<string, unknown> {
    const obj = {};

    keys.forEach((key: string) => (obj[key] = response[key]));

    return obj;
  }
}
