"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QColor = void 0;
const Component_1 = require("../core/Component");
const addon_1 = __importDefault(require("../utils/addon"));
const helpers_1 = require("../utils/helpers");
class QColor extends Component_1.Component {
    constructor(arg, g = 0, b = 0, a = 255) {
        super();
        if (helpers_1.checkIfNativeElement(arg)) {
            this.native = arg;
        }
        else if (typeof arg === 'number') {
            if (arguments.length === 1) {
                // This is for QGlobalColor enum
                this.native = new addon_1.default.QColor(arg);
            }
            else {
                this.native = new addon_1.default.QColor(arg, g, b, a);
            }
        }
        else if (typeof arg === 'string') {
            this.native = new addon_1.default.QColor(arg);
        }
        else {
            this.native = new addon_1.default.QColor();
        }
    }
    setRed(value) {
        this.native.setRed(value);
    }
    red() {
        return this.native.red();
    }
    setGreen(value) {
        this.native.setGreen(value);
    }
    green() {
        return this.native.green();
    }
    setBlue(value) {
        this.native.setBlue(value);
    }
    blue() {
        return this.native.blue();
    }
    setAlpha(value) {
        this.native.setAlpha(value);
    }
    alpha() {
        return this.native.alpha();
    }
    static fromQVariant(variant) {
        return new QColor(addon_1.default.QColor.fromQVariant(variant.native));
    }
}
exports.QColor = QColor;
