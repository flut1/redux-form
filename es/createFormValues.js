var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import prefixName from './util/prefixName';


var createValues = function createValues(_ref) {
  var getIn = _ref.getIn;
  return function (firstArg) {
    for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    var valuesMap = void 0;

    if (typeof firstArg === 'string') {
      valuesMap = [firstArg].concat(_toConsumableArray(rest)).map(function (k) {
        return {
          prop: k,
          path: k
        };
      });
    } else {
      var config = firstArg;
      valuesMap = Object.keys(config).map(function (k) {
        return {
          prop: k,
          path: config[k]
        };
      });
    }
    if (!valuesMap.length) {
      throw new Error('formValues(): You must specify values to get as formValues(name1, name2, ...) or formValues({propName1: propPath1, ...})');
    }

    // create a class that reads current form name and creates a selector
    // return
    return function (Component) {
      var FormValues = function (_React$Component) {
        _inherits(FormValues, _React$Component);

        function FormValues(props, context) {
          _classCallCheck(this, FormValues);

          var _this = _possibleConstructorReturn(this, (FormValues.__proto__ || Object.getPrototypeOf(FormValues)).call(this, props, context));

          if (!context._reduxForm) {
            throw new Error('formValues() must be used inside a React tree decorated with reduxForm()');
          }
          var formValuesSelector = function formValuesSelector(_, _ref2) {
            var sectionPrefix = _ref2.sectionPrefix;

            // Yes, we're only using connect() for listening to updates.
            // The second argument needs to be there so that connect calls
            // the selector when props change
            var getValues = _this.context._reduxForm.getValues;

            var props = {};
            var values = getValues();
            valuesMap.forEach(function (_ref3) {
              var prop = _ref3.prop,
                  path = _ref3.path;
              return props[prop] = getIn(values, prefixName(_this.context, path));
            });
            return props;
          };
          _this.Component = connect(formValuesSelector, function () {
            return {};
          } // ignore dispatch
          )(function (_ref4) {
            var sectionPrefix = _ref4.sectionPrefix,
                otherProps = _objectWithoutProperties(_ref4, ['sectionPrefix']);

            return React.createElement(Component, otherProps);
          });
          return _this;
        }

        _createClass(FormValues, [{
          key: 'render',
          value: function render() {
            var Component = this.Component;

            return React.createElement(Component
            // so that the connected component updates props when sectionPrefix has changed
            , _extends({ sectionPrefix: this.context._reduxForm.sectionPrefix
            }, this.props));
          }
        }]);

        return FormValues;
      }(React.Component);

      FormValues.contextTypes = {
        _reduxForm: PropTypes.object
      };
      return FormValues;
    };
  };
};

export default createValues;