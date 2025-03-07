import { NodeWidget } from './QWidget';
import { NativeElement, NativeRawPointer } from '../core/Component';
import { QAbstractButton, QAbstractButtonSignals } from './QAbstractButton';
import { CheckState } from '../QtEnums';
/**
 
> Create and control checkbox.

* **This class is a JS wrapper around Qt's [QCheckBox class](https://doc.qt.io/qt-5/qcheckbox.html)**

A `QCheckBox` provides ability to add and manipulate native checkbox widgets.

### Example

```javascript
const { QCheckBox } = require("@nodegui/nodegui");

const checkbox = new QCheckBox();
checkbox.setText("Hello");
```
 */
export declare class QCheckBox extends QAbstractButton<QCheckBoxSignals> {
    native: NativeElement;
    constructor();
    constructor(parent: NodeWidget<any>);
    constructor(rawPointer: NativeRawPointer<any>, disableNativeDeletion?: boolean);
    setTristate(y?: boolean): void;
    isTristate(): boolean;
    checkState(): CheckState;
    setCheckState(state: CheckState): void;
}
export interface QCheckBoxSignals extends QAbstractButtonSignals {
    stateChanged: (state: number) => void;
}
