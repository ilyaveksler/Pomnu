"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QMainWindow = void 0;
const addon_1 = __importDefault(require("../utils/addon"));
const QWidget_1 = require("./QWidget");
/**
 
> Create and control windows.

* **This class is a JS wrapper around Qt's [QMainWindow class](https://doc.qt.io/qt-5/qmainwindow.html)**

A `QMainWindow` provides a main application window. Every widget in NodeGui should be a child/nested child of QMainWindow. QMainWindow in NodeGui is also responsible for FlexLayout calculations of its children.

### Example

```javascript
const { QMainWindow, QWidget } = require("@nodegui/nodegui");

const win = new QMainWindow();

const centralWidget = new QWidget();
win.setCentralWidget(centralWidget);

win.show();

global.win = win; // prevent's gc of win
```

QMainWindow needs to have a central widget set before other widgets can be added as a children/nested children.
Once a central widget is set you can add children/layout to the central widget.
 */
class QMainWindow extends QWidget_1.NodeWidget {
    constructor(parent) {
        let native;
        if (parent) {
            native = new addon_1.default.QMainWindow(parent.native);
        }
        else {
            native = new addon_1.default.QMainWindow();
        }
        super(native);
        this.native = native;
        this.setNodeParent(parent);
        this.setLayout = (parentLayout) => {
            if (this.centralWidget) {
                this.centralWidget.setLayout(parentLayout);
            }
            else {
                this.native.setLayout(parentLayout.native);
                super.layout = parentLayout;
            }
        };
    }
    setCentralWidget(widget) {
        this.native.setCentralWidget(widget.native);
        this.centralWidget = widget;
        this.centralWidget.setFlexNodeSizeControlled(true);
    }
    takeCentralWidget() {
        const centralWidget = this.centralWidget;
        this.centralWidget = null;
        if (centralWidget) {
            this.native.takeCentralWidget();
            return centralWidget;
        }
        return null;
    }
    setMenuBar(menuBar) {
        this.native.setMenuBar(menuBar.native);
        this._menuBar = menuBar;
    }
    menuBar() {
        return this._menuBar;
    }
    setMenuWidget(menuWidget) {
        this.native.setMenuWidget(menuWidget.native);
    }
    get layout() {
        if (this.centralWidget) {
            return this.centralWidget.layout;
        }
        return super.layout;
    }
    center() {
        this.native.center();
    }
    /**
     * Sets the status bar for the main window to statusbar.
     * Note: QMainWindow takes ownership of the statusbar pointer and deletes it at the appropriate time.
     * @param statusBar The status bar.
     */
    setStatusBar(statusBar) {
        this.native.setStatusBar(statusBar.native);
        this._statusBar = statusBar;
    }
    /**
     * Removes the status bar from the main window.
     */
    removeStatusBar() {
        this.native.setStatusBar(null);
        this._statusBar = null;
    }
    /**
     * Returns the status bar for the main window.
     */
    statusBar() {
        return this.native.statusBar();
    }
}
exports.QMainWindow = QMainWindow;
