(function() {
  var root;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.AppController = (function() {
    function AppController(container, canvas) {
      this.container = container;
      this.visualizer = root.Visual555.get_instance($(canvas));
      this.init();
    }

    AppController.prototype.init = function() {
      var instance;
      instance = this;
      this.snaffleUrlParams();
      this.recalc();
      return $('.form-control', this.container).on('change keyup', function() {
        instance.recalc();
        return true;
      });
    };

    AppController.prototype.recalc = function() {
      var values;
      if (!this.visualizer) {
        return;
      }
      values = this.visualizer.recalc({
        r1: parseFloat($('#R1', this.container).val()),
        r2: parseFloat($('#R2', this.container).val()),
        c: parseFloat($('#C', this.container).val())
      });
      $('#frequency', this.container).html(values.frequency.toFixed(3) + ' Hz');
      $('#timeHigh', this.container).html(values.timeHigh.toFixed(3) + ' ms');
      $('#timeLow', this.container).html(values.timeLow.toFixed(3) + ' ms');
      $('#cycleTime', this.container).html(values.cycleTime.toFixed(3) + ' ms');
      $('#dutyCycle', this.container).html(values.dutyCycle.toFixed(3) + ' %');
      return $('#permalink', this.container).attr('href', '?r1=' + values.r1 + '&r2=' + values.r2 + '&c=' + values.c);
    };

    AppController.prototype.snaffleUrlParams = function() {
      $('#R1', this.container).val(this.param('r1') || 1);
      $('#R2', this.container).val(this.param('r2') || 330);
      return $('#C', this.container).val(this.param('c') || 2.2);
    };

    AppController.prototype.param = function(name) {
      var values;
      if (values = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search)) {
        return decodeURIComponent(values[1]);
      }
    };

    return AppController;

  })();

  jQuery(function() {
    return new root.AppController('#visual555', '#visual555_canvas');
  });

}).call(this);

(function() {
  var root,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.Component = (function() {
    function Component(settings) {
      this.values = this.baseDefaults();
      $.extend(this.values, this.componentDefaults());
      if (settings) {
        $.extend(this.values, settings);
      }
      this.pins = this.pinPositions();
    }

    Component.prototype.baseDefaults = function() {
      return {
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        orientation: 0,
        lineWidth: 1,
        connectorStandoff: 10,
        label: '',
        font: '14px monospace',
        textBaseline: 'top'
      };
    };

    Component.prototype.componentDefaults = function() {
      return {};
    };

    Component.prototype.draw = function(context) {};

    Component.prototype.pinPosition = function(pin) {
      return this.pins[pin];
    };

    Component.prototype.pinPositions = function() {
      return {};
    };

    return Component;

  })();

  root.Resistor = (function(_super) {
    __extends(Resistor, _super);

    function Resistor() {
      return Resistor.__super__.constructor.apply(this, arguments);
    }

    Resistor.prototype.componentDefaults = function() {
      return {
        width: 10,
        height: 60
      };
    };

    Resistor.prototype.pinPositions = function() {
      var pp;
      pp = {};
      pp['1'] = {
        x: this.values.x + this.values.width / 2,
        y: this.values.y
      };
      pp['2'] = {
        x: this.values.x + this.values.width / 2,
        y: this.values.y + this.values.height
      };
      return pp;
    };

    Resistor.prototype.draw = function(context) {
      context.beginPath();
      context.strokeStyle = 'black';
      context.fillStyle = 'white';
      context.rect(this.values.x, this.values.y + this.values.connectorStandoff, this.values.width, this.values.height - 2 * this.values.connectorStandoff);
      context.fill();
      context.stroke();
      context.closePath();
      context.beginPath();
      context.strokeStyle = 'black';
      context.fillStyle = 'black';
      context.fillText(this.values.label, this.values.x + this.values.width + 3, this.values.y + this.values.height / 2 - 7);
      context.moveTo(this.values.x + this.values.width / 2, this.values.y);
      context.lineTo(this.values.x + this.values.width / 2, this.values.y + this.values.connectorStandoff);
      context.moveTo(this.values.x + this.values.width / 2, this.values.y + this.values.height - this.values.connectorStandoff);
      context.lineTo(this.values.x + this.values.width / 2, this.values.y + this.values.height);
      context.stroke();
      context.closePath();
    };

    return Resistor;

  })(root.Component);

  root.CeramicCapacitor = (function(_super) {
    __extends(CeramicCapacitor, _super);

    function CeramicCapacitor() {
      return CeramicCapacitor.__super__.constructor.apply(this, arguments);
    }

    CeramicCapacitor.prototype.componentDefaults = function() {
      return {
        width: 10,
        height: 25,
        lineWidth: 2
      };
    };

    CeramicCapacitor.prototype.pinPositions = function() {
      var pp;
      pp = {};
      pp['1'] = {
        x: this.values.x + this.values.width / 2,
        y: this.values.y
      };
      pp['2'] = {
        x: this.values.x + this.values.width / 2,
        y: this.values.y + this.values.height
      };
      return pp;
    };

    CeramicCapacitor.prototype.draw = function(context) {
      context.beginPath();
      context.fillStyle = 'black';
      context.fillText(this.values.label, this.values.x + this.values.width + 3, this.values.y + this.values.height / 2 - 7);
      context.rect(this.values.x, this.values.y + this.values.connectorStandoff, this.values.width, this.values.lineWidth);
      context.rect(this.values.x, this.values.y + this.values.height - this.values.connectorStandoff, this.values.width, this.values.lineWidth);
      context.moveTo(this.values.x + +this.values.width / 2, this.values.y);
      context.lineTo(this.values.x + +this.values.width / 2, this.values.y + this.values.connectorStandoff);
      context.moveTo(this.values.x + +this.values.width / 2, this.values.y + this.values.height - this.values.connectorStandoff);
      context.lineTo(this.values.x + +this.values.width / 2, this.values.y + this.values.height);
      context.fill();
      context.stroke();
      context.closePath();
    };

    return CeramicCapacitor;

  })(root.Component);

  root.Led = (function(_super) {
    __extends(Led, _super);

    function Led() {
      return Led.__super__.constructor.apply(this, arguments);
    }

    Led.prototype.componentDefaults = function() {
      return {
        width: 20,
        height: 30,
        color: 'red'
      };
    };

    Led.prototype.pinPositions = function() {
      var pp;
      pp = {};
      pp['1'] = {
        x: this.values.x + this.values.width / 2,
        y: this.values.y
      };
      pp['2'] = {
        x: this.values.x + this.values.width / 2,
        y: this.values.y + this.values.height
      };
      return pp;
    };

    Led.prototype.draw = function(context, in_on_state) {
      var component_color;
      component_color = in_on_state ? this.values.color : 'black';
      context.beginPath();
      context.strokeStyle = 'black';
      context.moveTo(this.values.x + this.values.width / 2, this.values.y);
      context.lineTo(this.values.x + this.values.width / 2, this.values.y + this.values.connectorStandoff);
      context.moveTo(this.values.x + this.values.width / 2, this.values.y + this.values.height - this.values.connectorStandoff);
      context.lineTo(this.values.x + this.values.width / 2, this.values.y + this.values.height);
      context.stroke();
      context.closePath();
      context.beginPath();
      context.strokeStyle = component_color;
      context.fillStyle = component_color;
      context.moveTo(this.values.x + this.values.width, this.values.y + this.values.connectorStandoff);
      context.lineTo(this.values.x, this.values.y + this.values.connectorStandoff);
      context.lineTo(this.values.x + this.values.width / 2, this.values.y + this.values.height - this.values.connectorStandoff);
      context.lineTo(this.values.x + this.values.width, this.values.y + this.values.connectorStandoff);
      context.moveTo(this.values.x - 14, this.values.y + 12);
      context.lineTo(this.values.x - 20, this.values.y + 18);
      context.moveTo(this.values.x - 13, this.values.y + 16);
      context.lineTo(this.values.x - 19, this.values.y + 22);
      context.rect(this.values.x, this.values.y + this.values.height - this.values.connectorStandoff + 1, this.values.width, 2);
      context.fill();
      context.stroke();
      context.closePath();
    };

    return Led;

  })(root.Component);

  root.LM555 = (function(_super) {
    __extends(LM555, _super);

    function LM555() {
      return LM555.__super__.constructor.apply(this, arguments);
    }

    LM555.prototype.componentDefaults = function() {
      return {
        width: 100,
        height: 120
      };
    };

    LM555.prototype.pinPositions = function() {
      var pp;
      pp = {};
      pp['8'] = {
        x: this.values.x + 40,
        y: this.values.y
      };
      pp['4'] = {
        x: this.values.x + 60,
        y: this.values.y
      };
      pp['7'] = {
        x: this.values.x,
        y: this.values.y + 30
      };
      pp['6'] = {
        x: this.values.x,
        y: this.values.y + 70
      };
      pp['2'] = {
        x: this.values.x,
        y: this.values.y + 90
      };
      pp['1'] = {
        x: this.values.x + 40,
        y: this.values.y + 120
      };
      pp['5'] = {
        x: this.values.x + 60,
        y: this.values.y + 120
      };
      pp['3'] = {
        x: this.values.x + this.values.width,
        y: this.values.y + 60
      };
      return pp;
    };

    LM555.prototype.draw = function(context) {
      var connectorStandoff, x, y;
      x = this.values.x;
      y = this.values.y;
      connectorStandoff = this.values.connectorStandoff;
      context.strokeStyle = "black";
      context.lineWidth = this.values.lineWidth;
      context.beginPath();
      context.fillStyle = 'white';
      context.rect(x + connectorStandoff, y + connectorStandoff, this.values.width - 2 * connectorStandoff, this.values.height - 2 * connectorStandoff);
      context.fill();
      context.stroke();
      context.closePath();
      context.beginPath();
      context.fillStyle = 'black';
      context.moveTo(x + 40, y);
      context.lineTo(x + 40, y + connectorStandoff);
      context.fillText("8", x + 36, y + 15);
      context.moveTo(x + 60, y);
      context.lineTo(x + 60, y + connectorStandoff);
      context.fillText("4", x + 56, y + 15);
      context.moveTo(x, y + 30);
      context.lineTo(x + connectorStandoff, y + 30);
      context.fillText("7", x + 13, y + 24);
      context.moveTo(x, y + 70);
      context.lineTo(x + connectorStandoff, y + 70);
      context.fillText("6", x + 13, y + 64);
      context.moveTo(x, y + 90);
      context.lineTo(x + connectorStandoff, y + 90);
      context.fillText("2", x + 13, y + 84);
      context.moveTo(x + 40, y + 110);
      context.lineTo(x + 40, y + 120);
      context.fillText("1", x + 36, y + 95);
      context.moveTo(x + 60, y + 110);
      context.lineTo(x + 60, y + 120);
      context.fillText("5", x + 56, y + 95);
      context.moveTo(x + 90, y + 60);
      context.lineTo(x + 100, y + 60);
      context.fillText("3", x + 78, y + 54);
      context.fill();
      context.stroke();
      return context.closePath();
    };

    return LM555;

  })(root.Component);

  root.CommonRail = (function(_super) {
    __extends(CommonRail, _super);

    function CommonRail() {
      return CommonRail.__super__.constructor.apply(this, arguments);
    }

    CommonRail.prototype.pinPosition = function(pin) {
      return {
        x: pin,
        y: this.values.y
      };
    };

    CommonRail.prototype.draw = function(context) {
      context.beginPath();
      context.strokeStyle = "black";
      context.lineWidth = this.values.lineWidth;
      context.moveTo(this.values.x, this.values.y);
      context.lineTo(this.values.x + this.values.width, this.values.y + this.values.height);
      context.stroke();
      this.draw_label(context);
      return context.closePath();
    };

    return CommonRail;

  })(root.Component);

  root.PowerRail = (function(_super) {
    __extends(PowerRail, _super);

    function PowerRail() {
      return PowerRail.__super__.constructor.apply(this, arguments);
    }

    PowerRail.prototype.componentDefaults = function() {
      return {
        x: 0,
        y: 30,
        width: 400,
        height: 0,
        lineWidth: 2,
        label: 'Vcc'
      };
    };

    PowerRail.prototype.draw_label = function(context) {
      context.fillText(this.values.label, this.values.x + 20, this.values.y - 15);
      return context.stroke();
    };

    return PowerRail;

  })(root.CommonRail);

  root.GroundRail = (function(_super) {
    __extends(GroundRail, _super);

    function GroundRail() {
      return GroundRail.__super__.constructor.apply(this, arguments);
    }

    GroundRail.prototype.componentDefaults = function() {
      return {
        x: 0,
        y: 340,
        width: 400,
        height: 0,
        lineWidth: 2,
        label: 'Gnd'
      };
    };

    GroundRail.prototype.draw_label = function(context) {
      var gnd_mid, gnd_offset;
      context.fillText(this.values.label, this.values.x + 20, this.values.y + 3);
      gnd_mid = this.values.x + this.values.width - 50;
      gnd_offset = this.values.y + this.values.height;
      context.lineWidth = 1;
      context.moveTo(gnd_mid, gnd_offset);
      context.lineTo(gnd_mid, gnd_offset + 8);
      context.moveTo(gnd_mid - 10, gnd_offset + 8);
      context.lineTo(gnd_mid + 10, gnd_offset + 8);
      context.moveTo(gnd_mid - 6, gnd_offset + 11);
      context.lineTo(gnd_mid + 6, gnd_offset + 11);
      context.moveTo(gnd_mid - 3, gnd_offset + 14);
      context.lineTo(gnd_mid + 3, gnd_offset + 14);
      return context.stroke();
    };

    return GroundRail;

  })(root.CommonRail);

  root.ConnectingWire = (function(_super) {
    __extends(ConnectingWire, _super);

    function ConnectingWire(part1, part1_pin, part2, part2_pin) {
      this.part1 = part1;
      this.part1_pin = part1_pin;
      this.part2 = part2;
      this.part2_pin = part2_pin;
      ConnectingWire.__super__.constructor.call(this);
    }

    ConnectingWire.prototype.draw = function(context) {
      var part1_position, part2_position;
      part1_position = this.part1.pinPosition(this.part1_pin);
      part2_position = this.part2.pinPosition(this.part2_pin);
      if (!(part1_position && part2_position)) {
        return;
      }
      context.beginPath();
      context.strokeStyle = "black";
      context.lineWidth = this.values.lineWidth;
      context.moveTo(part1_position.x, part1_position.y);
      context.lineTo(part2_position.x, part2_position.y);
      context.stroke();
      return context.closePath();
    };

    return ConnectingWire;

  })(root.Component);

}).call(this);

(function() {
  var root;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.Visual555 = (function() {
    Visual555.get_instance = function(element) {
      if (this.supported()) {
        return new root.Visual555(element);
      }
    };

    Visual555.supported = function() {
      var e;
      try {
        return Modernizr.canvas;
      } catch (_error) {
        e = _error;
        return false;
      }
    };

    function Visual555(container) {
      this.container = container;
      this.components = [];
      this.calculator = new root.Calculator555();
      this.context = this.container.get(0).getContext("2d");
      this.applyDefaults();
      this.drawCircuit();
      this.startAnimationLoop();
      true;
    }

    Visual555.prototype.applyDefaults = function() {
      this.context.translate(0.5, 0.5);
      this.context.font = '14px monospace';
      return this.context.textBaseline = 'top';
    };

    Visual555.prototype.startAnimationLoop = function() {
      var f, instance, output_high;
      instance = this;
      output_high = true;
      f = function() {
        var t, th;
        if ((th = instance.calculator.timeHigh()) > 0) {
          t = output_high ? (instance.ledOn(), th) : (instance.ledOff(), instance.calculator.timeLow());
          output_high = !output_high;
        } else {
          t = 500;
          output_high = false;
        }
        return setTimeout(f, t);
      };
      return f();
    };

    Visual555.prototype.recalc = function(values) {
      return this.calculator.recalc(values);
    };

    Visual555.prototype.addComponent = function(component) {
      this.components.push(component);
      return component;
    };

    Visual555.prototype.drawCircuit = function() {
      var c1, c2, gnd, r1, r2, r3, timer, vcc, width, y_gnd, y_vcc;
      y_vcc = 30;
      y_gnd = 340;
      width = 400;
      vcc = this.addComponent(new root.PowerRail({
        y: y_vcc,
        width: width
      }));
      gnd = this.addComponent(new root.GroundRail({
        y: y_gnd,
        width: width
      }));
      r1 = this.addComponent(new root.Resistor({
        x: 100,
        y: y_vcc + 20,
        label: 'R1'
      }));
      r2 = this.addComponent(new root.Resistor({
        x: 100,
        y: y_vcc + 100,
        label: 'R2'
      }));
      c1 = this.addComponent(new root.CeramicCapacitor({
        x: 100,
        y: y_vcc + 170,
        label: 'C1'
      }));
      timer = this.addComponent(new root.LM555({
        x: 160,
        y: y_vcc + 70
      }));
      c2 = this.addComponent(new root.CeramicCapacitor({
        x: 215,
        y: 220,
        label: 'C2'
      }));
      r3 = this.addComponent(new root.Resistor({
        x: 300,
        y: y_vcc + 130,
        label: 'R3'
      }));
      this.output_led = this.addComponent(new root.Led({
        x: 295,
        y: 230,
        color: 'red'
      }));
      this.addComponent(new root.ConnectingWire(vcc, 105, r1, '1'));
      this.addComponent(new root.ConnectingWire(r1, '2', r2, '1'));
      this.addComponent(new root.ConnectingWire(r2, '2', c1, '1'));
      this.addComponent(new root.ConnectingWire(c1, '2', gnd, 105));
      this.addComponent(new root.ConnectingWire(vcc, 200, timer, '8'));
      this.addComponent(new root.ConnectingWire(vcc, 220, timer, '4'));
      this.addComponent(new root.ConnectingWire(r2, '1', timer, '7'));
      this.addComponent(new root.ConnectingWire(r2, '2', timer, '2'));
      this.addComponent(new root.ConnectingWire(timer, '6', timer, '2'));
      this.addComponent(new root.ConnectingWire(timer, '1', gnd, 200));
      this.addComponent(new root.ConnectingWire(timer, '3', r3, '1'));
      this.addComponent(new root.ConnectingWire(r3, '2', this.output_led, '1'));
      this.addComponent(new root.ConnectingWire(this.output_led, '2', gnd, 305));
      this.addComponent(new root.ConnectingWire(timer, '5', c2, '1'));
      this.addComponent(new root.ConnectingWire(c2, '2', gnd, 220));
      return this.redraw();
    };

    Visual555.prototype.redraw = function() {
      var component, _i, _len, _ref, _results;
      _ref = this.components;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        component = _ref[_i];
        _results.push(component.draw(this.context));
      }
      return _results;
    };

    Visual555.prototype.ledOff = function() {
      if (this.output_led) {
        return this.output_led.draw(this.context, false);
      }
    };

    Visual555.prototype.ledOn = function() {
      if (this.output_led) {
        return this.output_led.draw(this.context, true);
      }
    };

    return Visual555;

  })();

}).call(this);
