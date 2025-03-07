"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlexLayout = void 0;
const addon_1 = __importDefault(require("../utils/addon"));
const QLayout_1 = require("../QtWidgets/QLayout");
/**
 
> Custom layout to help layout child widgets using flex layout.

* **This class is a JS wrapper around custom Qt layout implemented using [Yoga](https://github.com/facebook/yoga)**

A `FlexLayout` can be used to layout all child NodeGui widgets using flex.

### Example

```javascript
const { FlexLayout, QWidget, QLabel } = require("@nodegui/nodegui");

const view = new QWidget();
const layout = new FlexLayout();
view.setLayout(layout);

const label = new QLabel();
label.setText("label1");
const label2 = new QLabel();
label2.setText("label2");

layout.addWidget(label);
layout.addWidget(label2);
```
 */
class FlexLayout extends QLayout_1.NodeLayout {
    constructor(parent) {
        let native;
        if (parent) {
            native = new addon_1.default.FlexLayout(parent.native);
        }
        else {
            native = new addon_1.default.FlexLayout();
        }
        super(native);
        this.native = native;
        if (parent) {
            this.setFlexNode(parent.getFlexNode());
        }
    }
    addWidget(childWidget, childFlexNode) {
        const childYogaNode = childFlexNode || childWidget.getFlexNode();
        if (this.nodeChildren.has(childWidget)) {
            this.removeWidget(childWidget, childYogaNode);
        }
        this.nodeChildren.add(childWidget);
        this.native.addWidget(childWidget.native, childYogaNode);
    }
    insertChildBefore(childWidget, beforeChildWidget, childFlexNode, beforeChildFlexNode) {
        const childYogaNode = childFlexNode || childWidget.getFlexNode();
        if (this.nodeChildren.has(childWidget)) {
            this.removeWidget(childWidget, childYogaNode);
        }
        const beforeChildYogaNode = beforeChildFlexNode || beforeChildWidget.getFlexNode();
        const widgetArr = Array.from(this.nodeChildren);
        const beforeChildIndex = this.getChildIndex(beforeChildWidget);
        if (beforeChildIndex !== -1) {
            widgetArr.splice(beforeChildIndex, 0, childWidget);
        }
        this.nodeChildren = new Set(widgetArr);
        this.native.insertChildBefore(childWidget.native, beforeChildYogaNode, childYogaNode);
    }
    removeWidget(childWidget, childFlexNode) {
        if (!this.nodeChildren.has(childWidget)) {
            return;
        }
        const childYogaNode = childFlexNode || childWidget.getFlexNode();
        this.native.removeWidget(childWidget.native, childYogaNode);
        this.nodeChildren.delete(childWidget);
    }
    setFlexNode(flexNode) {
        this.flexNode = flexNode;
        this.native.setFlexNode(flexNode);
    }
    getChildIndex(childWidget) {
        const widgetArr = Array.from(this.nodeChildren);
        return widgetArr.indexOf(childWidget);
    }
    getNextSibling(childWidget) {
        const childIndex = this.getChildIndex(childWidget);
        const widgetArr = Array.from(this.nodeChildren);
        if (childIndex !== -1) {
            return widgetArr[childIndex + 1] || null;
        }
        return null;
    }
}
exports.FlexLayout = FlexLayout;
