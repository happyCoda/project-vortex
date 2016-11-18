interface IHelper {
  type(thing: any): string;
  clone(from: any, to: any): any;
}

enum TYPE_STRINGS {
  'string' = 0,
  'number',
  'function',
  'array',
  'object',
  'null',
  'undefined'
}

let helpers: IHelper = {

  type(thing) {

  }

  clone(from, to = {}) {
    for (let key in from) {
      let val = from[key];

      // if (typeof val ===)
    }
  }
};
