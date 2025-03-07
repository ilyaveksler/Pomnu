"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const QGridLayout_1 = require("./lib/QtWidgets/QGridLayout");
const QLabel_1 = require("./lib/QtWidgets/QLabel");
const QTreeWidget_1 = require("./lib/QtWidgets/QTreeWidget");
const QTreeWidgetItem_1 = require("./lib/QtWidgets/QTreeWidgetItem");
const QIcon_1 = require("./lib/QtGui/QIcon");
const win = new _1.QMainWindow();
win.resize(500, 500);
const outer = new _1.QWidget();
const outerLayout = new QGridLayout_1.QGridLayout();
outer.setLayout(outerLayout);
outer.setInlineStyle('background-color: red');
console.log(outerLayout.rowCount(), outerLayout.columnCount());
outerLayout.setColumnStretch(0, 2);
outerLayout.setRowStretch(1, 2);
outerLayout.setColumnMinimumWidth(1, 200);
outerLayout.setRowMinimumHeight(0, 100);
outerLayout.setHorizontalSpacing(20);
outerLayout.setVerticalSpacing(50);
console.log(outerLayout.columnStretch(0), outerLayout.columnStretch(1));
console.log(outerLayout.rowMinimumHeight(0), outerLayout.rowMinimumHeight(1));
console.log(outerLayout.verticalSpacing(), outerLayout.horizontalSpacing());
const columnOne = new QLabel_1.QLabel();
columnOne.setText('One');
columnOne.setInlineStyle('background-color: blue');
outerLayout.addWidget(columnOne, 0, 0);
const columnTwo = new QLabel_1.QLabel();
columnTwo.setText('Two');
columnTwo.setInlineStyle('background-color: green');
outerLayout.addWidget(columnTwo, 0, 1);
const columnThree = new QLabel_1.QLabel();
columnThree.setText('Three');
columnThree.setInlineStyle('background-color: yellow');
outerLayout.addWidget(columnThree, 1, 0);
const columnFour = new QLabel_1.QLabel();
columnFour.setText('Four');
columnFour.setInlineStyle('background-color: orange');
outerLayout.addWidget(columnFour, 1, 1);
const tree = new QTreeWidget_1.QTreeWidget();
tree.setColumnCount(2);
tree.setHeaderLabels(['First Column', 'Second Column']);
tree.setSortingEnabled(true);
tree.setInlineStyle('font-size: 24px');
outerLayout.addWidget(tree, 2, 0, 2, 0);
console.log(outerLayout.rowCount(), outerLayout.columnCount());
const myImage = './website/static/img/logo.png';
const icon = new QIcon_1.QIcon(myImage);
const item1 = new QTreeWidgetItem_1.QTreeWidgetItem();
item1.setText(0, `item-1`);
item1.setText(1, `1-item-1`);
item1.setIcon(1, icon);
const item2 = new QTreeWidgetItem_1.QTreeWidgetItem();
item2.setText(0, `item-2`);
item2.setText(1, `1-item-2`);
item2.setIcon(1, icon);
const item3 = new QTreeWidgetItem_1.QTreeWidgetItem();
item3.setText(0, `item-3`);
item3.setText(1, `1-item-3`);
item3.setIcon(1, icon);
const item4 = new QTreeWidgetItem_1.QTreeWidgetItem();
item4.setText(0, `item-4`);
item4.setText(1, `1-item-4`);
item4.setIcon(1, icon);
const item5 = new QTreeWidgetItem_1.QTreeWidgetItem();
item5.setText(0, `item-5`);
item5.setText(1, `1-item-5`);
item5.setIcon(1, icon);
const item6 = new QTreeWidgetItem_1.QTreeWidgetItem();
item6.setText(0, `item-6`);
item6.setText(1, `1-item-6`);
item6.setIcon(1, icon);
console.info('item6.icon()=', item6.icon(1));
tree.addTopLevelItem(item1);
tree.insertTopLevelItems(0, [item2, item3]);
tree.addTopLevelItems([item4, item5]);
tree.insertTopLevelItem(2, item6);
// Add children to item1
const c1item1 = new QTreeWidgetItem_1.QTreeWidgetItem(item1);
c1item1.setText(0, `c1item1`);
c1item1.setText(1, `c1item2`);
const c1item2 = new QTreeWidgetItem_1.QTreeWidgetItem(item1);
c1item2.setText(0, `c1item1`);
c1item2.setText(1, `c1item2`);
win.setCentralWidget(outer);
win.show();
global.win = win;
