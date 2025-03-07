"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QScrollBar = void 0;
const addon_1 = __importDefault(require("../utils/addon"));
const QAbstractSlider_1 = require("./QAbstractSlider");
/**
 
> Create and control scollbar widgets.

* **This class is a JS wrapper around Qt's [QScrollBar class](https://doc.qt.io/qt-5/qscrollbar.html)**

A `QScrollBar` provides ability to add and manipulate native scrollbar widgets.

### Example

```javascript
const { QScrollBar } = require("@nodegui/nodegui");

const scrollbar = new QScrollBar();
```
 */
class QScrollBar extends QAbstractSlider_1.QAbstractSlider {
    constructor(parent) {
        let native;
        if (parent) {
            native = new addon_1.default.QScrollBar(parent.native);
        }
        else {
            native = new addon_1.default.QScrollBar();
        }
        super(native);
        this.native = native;
        this.setNodeParent(parent);
    }
}
exports.QScrollBar = QScrollBar;
