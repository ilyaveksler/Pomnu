import { NodeLayout } from './QLayout';
import { NativeElement } from '../core/Component';
import { WidgetAttribute, WindowType, ContextMenuPolicy, FocusReason } from '../QtEnums';
import { QIcon } from '../QtGui/QIcon';
import { QCursor } from '../QtGui/QCursor';
import { CursorShape, WindowState } from '../QtEnums';
import { YogaWidget } from '../core/YogaWidget';
import { QPoint } from '../QtCore/QPoint';
import { QSize } from '../QtCore/QSize';
import { QRect } from '../QtCore/QRect';
import { QObjectSignals } from '../QtCore/QObject';
import { QFont } from '../QtGui/QFont';
import { QAction } from './QAction';
import { QGraphicsEffect } from './QGraphicsEffect';
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
export declare abstract class NodeWidget<Signals extends QWidgetSignals> extends YogaWidget<Signals> {
    layout?: NodeLayout<Signals>;
    actions: Set<QAction>;
    _rawInlineStyle: string;
    type: string;
    private _effect?;
    constructor(native: NativeElement);
    show(): void;
    hide(): void;
    isVisible(): boolean;
    close(): boolean;
    mapFromGlobal(pos: QPoint): QPoint;
    mapFromParent(pos: QPoint): QPoint;
    mapToGlobal(pos: QPoint): QPoint;
    mapToParent(pos: QPoint): QPoint;
    setStyleSheet(styleSheet: string): void;
    styleSheet(): string;
    setInlineStyle(style: string): void;
    setGeometry(x: number, y: number, w: number, h: number): void;
    geometry(): QRect;
    setMouseTracking(isMouseTracked: boolean): void;
    hasMouseTracking(): boolean;
    setEnabled(enabled: boolean): void;
    isEnabled(): boolean;
    setWindowOpacity(opacity: number): void;
    windowOpacity(): number;
    setWindowTitle(title: string): void;
    windowTitle(): string;
    setWindowState(state: WindowState): void;
    windowState(): number;
    setCursor(cursor: CursorShape | QCursor): void;
    setWindowIcon(icon: QIcon): void;
    setMinimumSize(minw: number, minh: number): void;
    minimumSize(): QSize;
    setMaximumSize(maxw: number, maxh: number): void;
    maximumSize(): QSize;
    setFixedSize(width: number, height: number): void;
    resize(width: number, height: number): void;
    size(): QSize;
    move(x: number, y: number): void;
    pos(): {
        x: number;
        y: number;
    };
    repaint(): void;
    update(): void;
    updateGeometry(): void;
    setAttribute(attribute: WidgetAttribute, switchOn: boolean): void;
    testAttribute(attribute: WidgetAttribute): boolean;
    setWindowFlag(windowType: WindowType, switchOn: boolean): void;
    setLayout(parentLayout: NodeLayout<Signals>): void;
    adjustSize(): void;
    activateWindow(): void;
    raise(): void;
    lower(): void;
    setObjectName(objectName: string): void;
    setContextMenuPolicy(contextMenuPolicy: ContextMenuPolicy): void;
    showFullScreen(): void;
    showMinimized(): void;
    showMaximized(): void;
    showNormal(): void;
    setFont(font: QFont): void;
    font(): QFont;
    addAction(action: QAction | string): QAction;
    removeAction(action: QAction): void;
    repolish(): void;
    setGraphicsEffect(effect: QGraphicsEffect<any>): void;
    setAcceptDrops(on: boolean): void;
    acceptDrops(): boolean;
    setFocus(reason: FocusReason): void;
}
export interface QWidgetSignals extends QObjectSignals {
    windowTitleChanged: (title: string) => void;
    windowIconChanged: (iconNative: NativeElement) => void;
    customContextMenuRequested: (pos: {
        x: number;
        y: number;
    }) => void;
}
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
export declare class QWidget extends NodeWidget<QWidgetSignals> {
    native: NativeElement;
    constructor(arg?: NodeWidget<QWidgetSignals> | NativeElement);
}
