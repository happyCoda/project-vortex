import Dom from './dom';

let myDom = new Dom(),
  content = myDom.grab('.content'),
  textNode = myDom.spawn('p', {
    class: 'ololo',
    style: {
      color: 'red'
    }
  }, 'fooBar');

myDom.inject(content, textNode);

console.log(content);
