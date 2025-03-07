"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QScrollArea = void 0;
const addon_1 = __importDefault(require("../utils/addon"));
const QAbstractScrollArea_1 = require("./QAbstractScrollArea");
/**
 
> A `QScrollArea` provides a scrolling view onto another widget.

* **This class is a JS wrapper around Qt's [QScrollArea class](https://doc.qt.io/qt-5/qscrollarea.html)**

### Example

```javascript
const { QScrollArea } = require("@nodegui/nodegui");

const scrollArea = new QScrollArea();
scrollArea.setInlineStyle("flex: 1; width:'100%';");

const imageLabel = new QLabel();
const pixmap = new QPixmap(
  path.resolve(__dirname, "../extras/assets/kitchen.png")
);
imageLabel.setPixmap(pixmap);

scrollArea.setWidget(imageLabel);
```
 */
class QScrollArea extends QAbstractScrollArea_1.QAbstractScrollArea {
    constructor(parent) {
        let native;
        if (parent) {
            native = new addon_1.default.QScrollArea(parent.native);
        }
        else {
            native = new addon_1.default.QScrollArea();
        }
        super(native);
        this.native = native;
        this.setNodeParent(parent);
        this.setWidgetResizable(true);
    }
    setAlignment(alignment) {
        this.setProperty('alignment', alignment);
    }
    alignment() {
        return this.property('alignment').toInt();
    }
    setWidgetResizable(resizable) {
        this.setProperty('widgetResizable', resizable);
        if (this.contentWidget) {
            this.contentWidget.setFlexNodeSizeControlled(resizable);
        }
    }
    widgetResizable() {
        return this.property('widgetResizable').toBool();
    }
    ensureVisible(x, y, xmargin = 50, ymargin = 50) {
        this.native.ensureVisible(x, y, xmargin, ymargin);
    }
    ensureWidgetVisible(childWidget, xmargin = 50, ymargin = 50) {
        this.native.ensureWidgetVisible(childWidget.native, xmargin, ymargin);
    }
    setWidget(widget) {
        this.contentWidget = widget;
        this.native.setWidget(widget.native);
        this.contentWidget.setFlexNodeSizeControlled(this.widgetResizable());
    }
    widget() {
        if (this.contentWidget) {
            return this.contentWidget;
        }
        return null;
    }
    takeWidget() {
        // react:✓
        const contentWidget = this.contentWidget;
        this.contentWidget = null;
        if (contentWidget) {
            this.native.takeWidget();
            return contentWidget;
        }
        return null;
    }
}
exports.QScrollArea = QScrollArea;
