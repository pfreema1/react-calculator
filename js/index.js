"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AutoShrinkingText = function (_React$Component) {
  _inherits(AutoShrinkingText, _React$Component);

  function AutoShrinkingText(props) {
    _classCallCheck(this, AutoShrinkingText);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      scale: 1
    };

    return _this;
  }

  AutoShrinkingText.prototype.componentDidUpdate = function componentDidUpdate() {
    var scale = this.state.scale;

    var node = this.node;
    var parentNode = node.parentNode;

    var availableWidth = parentNode.offsetWidth;
    var actualWidth = node.offsetWidth;
    var actualScale = availableWidth / actualWidth;

    console.log("node:  ");
    console.log(node);
    console.log("parentNode:  ");
    console.log(parentNode);

    console.log("availableWidth:  " + availableWidth);
    console.log("actualWidth:  " + actualWidth);

    if (scale === actualScale) return;

    if (actualScale < 1) {
      this.setState({
        scale: actualScale
      });
    } else if (scale < 1) {
      this.setState({ scale: 1 });
    }
  };

  AutoShrinkingText.prototype.render = function render() {
    var _this2 = this;

    var scale = this.state.scale;

    //questions here:
    //1:  what is the spread operator doing?
    //2:  what is ref?

    return React.createElement(
      "div",
      _extends({
        className: "calculator-display auto-scaling-text"
      }, this.props, {
        style: { transform: "scale(" + scale + "," + scale + ")" },
        ref: function ref(node) {
          return _this2.node = node;
        }
      }),
      this.props.children
    );
  };

  return AutoShrinkingText;
}(React.Component);

var Calculator = function (_React$Component2) {
  _inherits(Calculator, _React$Component2);

  function Calculator(props) {
    _classCallCheck(this, Calculator);

    var _this3 = _possibleConstructorReturn(this, _React$Component2.call(this, props));

    _this3.state = {
      displayValue: '0',
      waitingForOperand: false,
      operator: null,
      value: null
    };
    return _this3;
  }

  Calculator.prototype.inputDigit = function inputDigit(digit) {
    var _state = this.state;
    var displayValue = _state.displayValue;
    var waitingForOperand = _state.waitingForOperand;

    if (waitingForOperand) {
      this.setState({
        displayValue: String(digit),
        waitingForOperand: false
      });
    } else {
      this.setState({
        displayValue: displayValue == '0' ? String(digit) : displayValue + digit
      });
    }
  };

  Calculator.prototype.inputDot = function inputDot() {
    var _state2 = this.state;
    var displayValue = _state2.displayValue;
    var waitingForOperand = _state2.waitingForOperand;

    if (waitingForOperand) {
      this.setState({
        displayValue: '.',
        waitingForOperand: false
      });
    } else if (displayValue.indexOf('.') == -1) {
      this.setState({
        displayValue: displayValue + '.',
        waitingForOperand: false
      });
    }
  };

  Calculator.prototype.clearDisplay = function clearDisplay() {
    this.setState({
      displayValue: '0'

    });
  };

  Calculator.prototype.toggleSign = function toggleSign() {
    var displayValue = this.state.displayValue;

    this.setState({
      displayValue: displayValue.charAt(0) === '-' ? displayValue.slice(1, displayValue.length) : '-' + displayValue
    });
  };

  Calculator.prototype.inputPercent = function inputPercent() {
    var displayValue = this.state.displayValue;

    var value = parseFloat(displayValue);

    this.setState({
      displayValue: String(value / 100)
    });
  };

  Calculator.prototype.performOperation = function performOperation(nextOperator) {
    var _state3 = this.state;
    var displayValue = _state3.displayValue;
    var operator = _state3.operator;
    var value = _state3.value;

    var nextValue = parseFloat(displayValue);

    var operations = {
      '/': function _(prevValue, nextValue) {
        return prevValue / nextValue;
      },
      '*': function _(prevValue, nextValue) {
        return prevValue * nextValue;
      },
      '+': function _(prevValue, nextValue) {
        return prevValue + nextValue;
      },
      '-': function _(prevValue, nextValue) {
        return prevValue - nextValue;
      },
      '=': function _(prevValue, nextValue) {
        return nextValue;
      }
    };

    if (value == null) {
      this.setState({
        value: nextValue
      });
    } else if (operator) {
      var currentValue = value || 0;
      var computedValue = operations[operator](currentValue, nextValue);

      this.setState({
        value: computedValue,
        displayValue: String(computedValue)
      });
    }

    this.setState({
      waitingForOperand: true,
      operator: nextOperator
    });
  };

  Calculator.prototype.render = function render() {
    var _this4 = this;

    var displayValue = this.state.displayValue;

    return React.createElement(
      "div",
      { className: "calculator" },
      React.createElement(
        AutoShrinkingText,
        null,
        displayValue
      ),
      React.createElement(
        "div",
        { className: "calculator-keypad" },
        React.createElement(
          "div",
          { className: "input-keys" },
          React.createElement(
            "div",
            { className: "function-keys" },
            React.createElement(
              "button",
              { className: "calculator-key key-clear", onClick: function onClick() {
                  return _this4.clearDisplay();
                } },
              "AC"
            ),
            React.createElement(
              "button",
              { className: "calculator-key key-sign", onClick: function onClick() {
                  return _this4.toggleSign();
                } },
              "±"
            ),
            React.createElement(
              "button",
              { className: "calculator-key key-percent", onClick: function onClick() {
                  return _this4.inputPercent();
                } },
              "%"
            )
          ),
          React.createElement(
            "div",
            { className: "digit-keys" },
            React.createElement(
              "button",
              { className: "calculator-key key-0", onClick: function onClick() {
                  return _this4.inputDigit(0);
                } },
              "0"
            ),
            React.createElement(
              "button",
              { className: "calculator-key key-dot", onClick: function onClick() {
                  return _this4.inputDot();
                } },
              "●"
            ),
            React.createElement(
              "button",
              { className: "calculator-key key-1", onClick: function onClick() {
                  return _this4.inputDigit(1);
                } },
              "1"
            ),
            React.createElement(
              "button",
              { className: "calculator-key key-2", onClick: function onClick() {
                  return _this4.inputDigit(2);
                } },
              "2"
            ),
            React.createElement(
              "button",
              { className: "calculator-key key-3", onClick: function onClick() {
                  return _this4.inputDigit(3);
                } },
              "3"
            ),
            React.createElement(
              "button",
              { className: "calculator-key key-4", onClick: function onClick() {
                  return _this4.inputDigit(4);
                } },
              "4"
            ),
            React.createElement(
              "button",
              { className: "calculator-key key-5", onClick: function onClick() {
                  return _this4.inputDigit(5);
                } },
              "5"
            ),
            React.createElement(
              "button",
              { className: "calculator-key key-6", onClick: function onClick() {
                  return _this4.inputDigit(6);
                } },
              "6"
            ),
            React.createElement(
              "button",
              { className: "calculator-key key-7", onClick: function onClick() {
                  return _this4.inputDigit(7);
                } },
              "7"
            ),
            React.createElement(
              "button",
              { className: "calculator-key key-8", onClick: function onClick() {
                  return _this4.inputDigit(8);
                } },
              "8"
            ),
            React.createElement(
              "button",
              { className: "calculator-key key-9", onClick: function onClick() {
                  return _this4.inputDigit(9);
                } },
              "9"
            )
          )
        ),
        React.createElement(
          "div",
          { className: "operator-keys" },
          React.createElement(
            "button",
            { className: "calculator-key key-divide", onClick: function onClick() {
                return _this4.performOperation('/');
              } },
            "÷"
          ),
          React.createElement(
            "button",
            { className: "calculator-key key-multiply", onClick: function onClick() {
                return _this4.performOperation('*');
              } },
            "×"
          ),
          React.createElement(
            "button",
            { className: "calculator-key key-subtract", onClick: function onClick() {
                return _this4.performOperation('-');
              } },
            "−"
          ),
          React.createElement(
            "button",
            { className: "calculator-key key-add", onClick: function onClick() {
                return _this4.performOperation('+');
              } },
            "+"
          ),
          React.createElement(
            "button",
            { className: "calculator-key key-equals", onClick: function onClick() {
                return _this4.performOperation('=');
              } },
            "="
          )
        )
      )
    );
  };

  return Calculator;
}(React.Component);

ReactDOM.render(React.createElement(
  "div",
  { id: "wrapper" },
  React.createElement(Calculator, null)
), document.getElementById("app"));