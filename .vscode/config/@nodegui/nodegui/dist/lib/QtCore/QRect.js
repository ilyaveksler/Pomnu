"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QRect = void 0;
const Component_1 = require("../core/Component");
const addon_1 = __importDefault(require("../utils/addon"));
const helpers_1 = require("../utils/helpers");
class QRect extends Component_1.Component {
    constructor(arg, y = 0, width = 0, height = 0) {
        super();
        const count = arguments.length;
        if (count > 1) {
            this.native = new addon_1.default.QRect(arg, y, width, height);
        }
        else if (count == 1 && helpers_1.checkIfNativeElement(arg)) {
            this.native = arg;
        }
        else {
            this.native = new addon_1.default.QRect();
        }
    }
    setWidth(width) {
        return this.native.setWidth(width);
    }
    width() {
        return this.native.width();
    }
    setHeight(height) {
        return this.native.setHeight(height);
    }
    height() {
        return this.native.height();
    }
    left() {
        return this.native.left();
    }
    setLeft(height) {
        return this.native.setLeft(height);
    }
    top() {
        return this.native.top();
    }
    setTop(height) {
        return this.native.setTop(height);
    }
    static fromQVariant(variant) {
        return new QRect(addon_1.default.QRect.fromQVariant(variant.native));
    }
}
exports.QRect = QRect;
