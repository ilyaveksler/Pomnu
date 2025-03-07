import { NodeWidget } from './QWidget';
import { NativeElement, Component } from '../core/Component';
import { ScrollHint, SortOrder } from '../QtEnums';
import { QTableWidgetItem } from './QTableWidgetItem';
import { QAbstractScrollArea, QAbstractScrollAreaSignals } from './QAbstractScrollArea';
/**
 
> Creates and item-based table view.

* **This class is a JS wrapper around Qt's [QTableWidget class](https://doc.qt.io/qt-5/qtablewidget.html)**

### Example

```javascript
const { QTableWidget, QMainWindow, QTableWidgetItem } = require("@nodegui/nodegui");

const win = new QMainWindow();
const table = new QTableWidget(2, 3);
table.setHorizontalHeaderLabels(['first', 'second', 'third']);

const cell00 = new QTableWidgetItem('C00');
const cell01 = new QTableWidgetItem('C01');
const cell10 = new QTableWidgetItem('C10');
const cell11 = new QTableWidgetItem('C11');

table.setItem(0, 0, cell00);
table.setItem(0, 1, cell01);
table.setItem(1, 0, cell10);
table.setItem(1, 1, cell11);

win.setCentralWidget(table);
win.show();
(global as any).win = win;

```
 */
export declare class QTableWidget extends QAbstractScrollArea<QTableWidgetSignals> {
    native: NativeElement;
    items: Set<NativeElement | Component>;
    constructor(rows: number, columns: number);
    constructor(rows: number, columns: number, parent: NodeWidget<any>);
    selectedRanges(): Range[];
    closePersistentEditor(item: QTableWidgetItem): void;
    editItem(item: Component): void;
    setCellWidget(row: number, column: number, widget: NodeWidget<any>): void;
    setItem(row: number, column: number, item: QTableWidgetItem): void;
    setHorizontalHeaderItem(column: number, item: QTableWidgetItem): void;
    setHorizontalHeaderLabels(labels: string[]): void;
    setVerticalHeaderItem(row: number, item: QTableWidgetItem): void;
    setVerticalHeaderLabels(labels: string[]): void;
    clear(): void;
    clearContents(): void;
    insertColumn(column: number): void;
    removeColumn(column: number): void;
    insertRow(row: number): void;
    removeRow(row: number): void;
    scrollToItem(item: QTableWidgetItem, hint?: ScrollHint): void;
    hideColumn(column: number): void;
    hideRow(row: number): void;
    resizeColumnToContents(column: number): void;
    resizeColumnsToContents(): void;
    resizeRowToContents(row: number): void;
    resizeRowsToContents(): void;
    selectColumn(column: number): void;
    selectRow(row: number): void;
    setShowGrid(show: boolean): void;
    showGrid(): boolean;
    showColumn(column: number): void;
    showRow(row: number): void;
    sortByColumn(column: number, order: SortOrder): void;
    setColumnWidth(column: number, width: number): void;
    setRowHeight(row: number, height: number): void;
    columnCount(): number;
    rowCount(): number;
    setColumnCount(count: number): void;
    setRowCount(count: number): void;
    setSortingEnabled(enable: boolean): void;
    isSortingEnabled(): boolean;
}
interface Range {
    topRow: number;
    rightColumn: number;
    bottomRow: number;
    leftColumn: number;
    columnCount: number;
    rowCount: number;
}
export interface QTableWidgetSignals extends QAbstractScrollAreaSignals {
    cellActivated: (row: number, col: number) => void;
    cellChanged: (row: number, col: number) => void;
    cellClicked: (row: number, col: number) => void;
    cellDoubleClicked: (row: number, col: number) => void;
    cellEntered: (row: number, col: number) => void;
    cellPressed: (row: number, col: number) => void;
    currentCellChanged: (currentRow: number, currentColumn: number, previousRow: number, previousColumn: number) => void;
}
export {};
