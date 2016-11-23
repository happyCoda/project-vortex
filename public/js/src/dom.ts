interface IDom {
    grab(selector: string): HTMLElement;
    spawn(nodeName: string, attrs?: any, content?: string): HTMLElement;
    setAttrs(el: HTMLElement, attrs: any): void;
    inject(victim: HTMLElement, parasite: HTMLElement, before?: HTMLElement): void;
}

class Dom implements IDom {

    grab(selector) {
        return document.querySelector(selector);
    }

    spawn(nodeName, attrs?, content?) {
        let el: HTMLElement = document.createElement(nodeName);

        if (content) {
            el.textContent = content;
        }

        if (attrs) {
            this.setAttrs(el, attrs);
        }

        return el;
    }

    setAttrs(el, attrs) {
        Object.keys(attrs).forEach((key) => {
            if (key === 'style') {
                Object.keys(attrs[key]).forEach((subKey) => {
                    el.style[subKey] = attrs[key][subKey];
                });
            } else {
                el.setAttribute(key, attrs[key]);
            }
        });
    }

    inject(victim, parasite, before?) {
        if (before) {
            victim.insertBefore(parasite, before);
        } else {
            victim.appendChild(parasite);
        }
    }
}

export default Dom;
