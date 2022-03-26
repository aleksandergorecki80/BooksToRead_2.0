export class BaseComponent {
    constructor(templateId, hosElementId, insertAtStart) {
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hosElementId);
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.attach(insertAtStart);
    }
    attach(insertAtStart) {
        this.hostElement.insertAdjacentElement(insertAtStart ? 'afterbegin' : 'beforeend', this.element);
    }
}
//# sourceMappingURL=base-component.js.map