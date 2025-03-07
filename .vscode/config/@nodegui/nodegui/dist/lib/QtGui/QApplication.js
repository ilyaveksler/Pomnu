"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QApplication = void 0;
const addon_1 = __importDefault(require("../utils/addon"));
const helpers_1 = require("../utils/helpers");
const QClipboard_1 = require("./QClipboard");
const QStyle_1 = require("./QStyle");
const QObject_1 = require("../QtCore/QObject");
/**
 
> QApplication is the root object for the entire application. It manages app level settings.

* **This class is a JS wrapper around Qt's [QApplication class](https://doc.qt.io/qt-5/qapplication.html)**

The QApplication class manages the GUI application's control flow and main settings. In NodeGui you will never create an instance of it manually. NodeGui's internal runtime `Qode` does it for you on app start. You can access the initialised QApplication though if needed.

### Example

```js
const { QApplication } = require("@nodegui/nodegui");

const qApp = QApplication.instance();
qApp.quit();
```
 */
class QApplication extends QObject_1.NodeObject {
    constructor(arg) {
        let native;
        if (helpers_1.checkIfNativeElement(arg)) {
            native = arg;
        }
        else {
            native = new addon_1.default.QApplication();
        }
        super(native);
        this.native = native;
    }
    static clipboard() {
        return new QClipboard_1.QClipboard(addon_1.default.QApplication.clipboard());
    }
    processEvents() {
        this.native.processEvents();
    }
    exec() {
        return this.native.exec();
    }
    static instance() {
        const nativeQApp = addon_1.default.QApplication.instance();
        return new QApplication(nativeQApp);
    }
    quit() {
        return this.native.quit();
    }
    exit(exitCode) {
        return this.native.exit(exitCode);
    }
    setQuitOnLastWindowClosed(quit) {
        this.native.setQuitOnLastWindowClosed(quit);
    }
    quitOnLastWindowClosed() {
        return this.native.quitOnLastWindowClosed();
    }
    static style() {
        return new QStyle_1.QStyle(addon_1.default.QApplication.style());
    }
}
exports.QApplication = QApplication;
