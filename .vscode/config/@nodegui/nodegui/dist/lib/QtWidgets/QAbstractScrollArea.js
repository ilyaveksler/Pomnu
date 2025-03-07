"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QAbstractScrollArea = void 0;
const QWidget_1 = require("./QWidget");
const QFrame_1 = require("./QFrame");
/**
 
> Abstract class to add functionalities common to all scrollarea based widgets.

**This class implements all methods, properties of Qt's [QAbstractScrollArea class](https://doc.qt.io/qt-5/qabstractscrollarea.html) so that it can be inherited by all scroll based widgets**

`QAbstractScrollArea` is an abstract class and hence no instances of the same should be created. It exists so that we can add similar functionalities to all scrollable widget's easily. If you wish to create a scrollarea use [QScrollArea](api/QScrollArea.md) instead.

**QAbstractScrollArea is the base class for all widgets.**

QAbstractScrollArea will list all methods and properties that are common to all scrollable widgets in the NodeGui world.

 */
class QAbstractScrollArea extends QFrame_1.NodeFrame {
    setViewport(widget) {
        this.viewportWidget = widget;
        this.native.setViewport(widget.native);
    }
    viewport() {
        if (!this.viewportWidget) {
            this.viewportWidget = new QWidget_1.QWidget(this.native.viewport());
        }
        return this.viewportWidget;
    }
    setHorizontalScrollBarPolicy(policy) {
        this.native.setProperty('horizontalScrollBarPolicy', policy);
    }
    setVerticalScrollBarPolicy(policy) {
        this.native.setProperty('verticalScrollBarPolicy', policy);
    }
}
exports.QAbstractScrollArea = QAbstractScrollArea;
