"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QWidget = exports.NodeWidget = void 0;
const addon_1 = __importDefault(require("../utils/addon"));
const StyleSheet_1 = require("../core/Style/StyleSheet");
const helpers_1 = require("../utils/helpers");
const YogaWidget_1 = require("../core/YogaWidget");
const QPoint_1 = require("../QtCore/QPoint");
const QSize_1 = require("../QtCore/QSize");
const QRect_1 = require("../QtCore/QRect");
const QFont_1 = require("../QtGui/QFont");
const QAction_1 = require("./QAction");
const memoize_one_1 = __importDefault(require("memoize-one"));
/**
 
> Abstract class to add functionalities common to all Widgets.

**This class implements all methods, properties of Qt's [QWidget class](https://doc.qt.io/qt-5/qwidget.html) so that it can be inherited by all widgets**

`NodeWidget` is an abstract class and hence no instances of the same should be created. It exists so that we can add similar functionalities to all widget's easily. Additionally it helps in type checking process. If you wish to create a `div` like widget use [QWidget](api/QWidget.md) instead.

**NodeWidget is the base class for all widgets.**

### Example

```javascript
const {
  NodeWidget,
  QPushButton,
  QWidget,
  QRadioButton
} = require("@nodegui/nodegui");

// showWidget can accept any widget since it expects NodeWidget
const showWidget = (widget: NodeWidget) => {
  widget.show();
};

showWidget(new QPushButton());
showWidget(new QWidget());
showWidget(new QRadioButton());
```
All Widgets should extend from NodeWidget
Implement all native QWidget methods here so that all widgets get access to those aswell

 */
class NodeWidget extends YogaWidget_1.YogaWidget {
    constructor(native) {
        super(native);
        this._rawInlineStyle = '';
        this.type = 'widget';
        this.actions = new Set();
        this.setStyleSheet = memoize_one_1.default(this.setStyleSheet);
        this.setInlineStyle = memoize_one_1.default(this.setInlineStyle);
        this.setObjectName = memoize_one_1.default(this.setObjectName);
    }
    show() {
        this.native.show();
    }
    hide() {
        this.native.hide();
    }
    isVisible() {
        return this.native.isVisible();
    }
    close() {
        return this.native.close();
    }
    mapFromGlobal(pos) {
        return new QPoint_1.QPoint(this.native.mapFromGlobal(pos.native));
    }
    mapFromParent(pos) {
        return new QPoint_1.QPoint(this.native.mapFromParent(pos.native));
    }
    mapToGlobal(pos) {
        return new QPoint_1.QPoint(this.native.mapToGlobal(pos.native));
    }
    mapToParent(pos) {
        return new QPoint_1.QPoint(this.native.mapToParent(pos.native));
    }
    setStyleSheet(styleSheet) {
        const preparedSheet = StyleSheet_1.StyleSheet.create(styleSheet);
        this.native.setStyleSheet(preparedSheet);
    }
    styleSheet() {
        return this.native.styleSheet();
    }
    setInlineStyle(style) {
        this._rawInlineStyle = style;
        const preparedSheet = StyleSheet_1.prepareInlineStyleSheet(this, style);
        this.native.setStyleSheet(preparedSheet);
    }
    setGeometry(x, y, w, h) {
        this.native.setGeometry(x, y, w, h);
    }
    geometry() {
        return QRect_1.QRect.fromQVariant(this.property('geometry'));
    }
    setMouseTracking(isMouseTracked) {
        this.native.setMouseTracking(isMouseTracked);
    }
    hasMouseTracking() {
        return this.native.hasMouseTracking();
    }
    setEnabled(enabled) {
        this.native.setEnabled(enabled);
    }
    isEnabled() {
        return this.native.isEnabled();
    }
    setWindowOpacity(opacity) {
        this.native.setWindowOpacity(opacity);
    }
    windowOpacity() {
        return this.native.windowOpacity();
    }
    setWindowTitle(title) {
        return this.native.setWindowTitle(title);
    }
    windowTitle() {
        return this.native.windowTitle();
    }
    setWindowState(state) {
        return this.native.setWindowState(state);
    }
    windowState() {
        return this.native.windowState();
    }
    setCursor(cursor) {
        //TODO:getter
        if (typeof cursor === 'number') {
            this.native.setCursor(cursor);
        }
        else {
            this.native.setCursor(cursor.native);
        }
    }
    setWindowIcon(icon) {
        //TODO:getter
        this.native.setWindowIcon(icon.native);
    }
    setMinimumSize(minw, minh) {
        this.native.setMinimumSize(minw, minh);
    }
    minimumSize() {
        return new QSize_1.QSize(this.native.minimumSize());
    }
    setMaximumSize(maxw, maxh) {
        this.native.setMaximumSize(maxw, maxh);
    }
    maximumSize() {
        return new QSize_1.QSize(this.native.maximumSize());
    }
    setFixedSize(width, height) {
        this.native.setFixedSize(width, height);
    }
    resize(width, height) {
        this.native.resize(width, height);
    }
    size() {
        return new QSize_1.QSize(this.native.size());
    }
    move(x, y) {
        this.native.move(x, y);
    }
    pos() {
        return this.native.pos();
    }
    repaint() {
        // react:⛔️
        this.native.repaint();
    }
    update() {
        // react:⛔️
        this.native.update();
    }
    updateGeometry() {
        // react:⛔️
        this.native.updateGeometry();
    }
    setAttribute(attribute, switchOn) {
        // react:⛔️
        return this.native.setAttribute(attribute, switchOn);
    }
    testAttribute(attribute) {
        // react:⛔️
        return this.native.testAttribute(attribute);
    }
    setWindowFlag(windowType, switchOn) {
        // react:⛔️
        return this.native.setWindowFlag(windowType, switchOn);
    }
    setLayout(parentLayout) {
        const flexLayout = parentLayout;
        this.native.setLayout(parentLayout.native);
        if (flexLayout.setFlexNode) {
            //if flex layout set the flexnode
            flexLayout.setFlexNode(this.getFlexNode());
        }
        this.layout = parentLayout;
    }
    adjustSize() {
        this.native.adjustSize();
    }
    activateWindow() {
        this.native.activateWindow();
    }
    raise() {
        this.native.raise();
    }
    lower() {
        this.native.lower();
    }
    setObjectName(objectName) {
        super.setObjectName(objectName);
        if (this._rawInlineStyle) {
            this.setInlineStyle(this._rawInlineStyle);
        }
        this.repolish();
    }
    setContextMenuPolicy(contextMenuPolicy) {
        this.setProperty('contextMenuPolicy', contextMenuPolicy);
    }
    showFullScreen() {
        this.native.showFullScreen();
    }
    showMinimized() {
        this.native.showMinimized();
    }
    showMaximized() {
        this.native.showMaximized();
    }
    showNormal() {
        this.native.showNormal();
    }
    setFont(font) {
        this.native.setProperty('font', font.native);
    }
    font() {
        return QFont_1.QFont.fromQVariant(this.property('font'));
    }
    addAction(action) {
        if (typeof action === 'string') {
            const qaction = new QAction_1.QAction();
            qaction.setText(action);
            this.native.addAction(qaction.native);
            this.actions.add(qaction);
            return qaction;
        }
        this.native.addAction(action.native);
        this.actions.add(action);
        return action;
    }
    removeAction(action) {
        this.native.removeAction(action.native);
        this.actions.delete(action);
    }
    repolish() {
        this.native.repolish();
    }
    setGraphicsEffect(effect) {
        this._effect = effect;
        this.native.setGraphicsEffect(effect.native);
    }
    setAcceptDrops(on) {
        this.native.setAcceptDrops(on);
    }
    acceptDrops() {
        return this.native.acceptDrops();
    }
    setFocus(reason) {
        this.native.setFocus(reason);
    }
}
exports.NodeWidget = NodeWidget;
/**
 > Create and control views.

* **This class is a JS wrapper around Qt's [QWidget class](https://doc.qt.io/qt-5/qwidget.html)**

A `QWidget` can be used to encapsulate other widgets and provide structure. It functions similar to a `div` in the web world.


### Example

```javascript
const { QWidget } = require("@nodegui/nodegui");

const view = new QWidget();
view.setObjectName("container"); //Similar to setting `id` on the web
view.setLayout(new FlexLayout());
```
 */
class QWidget extends NodeWidget {
    constructor(arg) {
        let native;
        let parent;
        if (helpers_1.checkIfNativeElement(arg)) {
            native = arg;
        }
        else if (arg) {
            parent = arg;
            native = new addon_1.default.QWidget(parent.native);
        }
        else {
            native = new addon_1.default.QWidget();
        }
        super(native);
        this.setNodeParent(parent);
        this.native = native;
    }
}
exports.QWidget = QWidget;
