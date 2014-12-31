(function() {
  var root;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.AppController = (function() {
    function AppController(container, canvas) {
      this.container = container;
      this.snaffleUrlParams();
      this.visualizer = root.Visual555.get_instance($(canvas), this.mode);
      this.init();
    }

    AppController.prototype.init = function() {
      var instance;
      instance = this;
      this.recalc();
      return $('.recalc_trigger', this.container).on('change keyup', function() {
        instance.recalc();
        return true;
      });
    };

    AppController.prototype.recalc = function() {
      var circuit_title, permalink, values;
      if (!this.visualizer) {
        return;
      }
      this.mode = $("input:radio[name='Mode']:checked", this.container).val();
      values = this.visualizer.recalc({
        r1: parseFloat($('#R1', this.container).val()),
        r2: parseFloat($('#R2', this.container).val()),
        c: parseFloat($('#C', this.container).val()),
        mode: this.mode
      });
      $('#frequency', this.container).html(values.frequency.toFixed(3) + ' Hz');
      $('#timeHigh', this.container).html(values.timeHigh.toFixed(3) + ' ms');
      $('#timeLow', this.container).html(values.timeLow.toFixed(3) + ' ms');
      $('#cycleTime', this.container).html(values.cycleTime.toFixed(3) + ' ms');
      $('#dutyCycle', this.container).html(values.dutyCycle.toFixed(3) + ' %');
      if (this.mode === 'monostable') {
        $('.astable-only', this.container).hide();
        permalink = '?mode=monostable&r1=' + values.r1 + '&c=' + values.c;
        circuit_title = "555 Timer Monostable Circuit";
      } else {
        $('.astable-only', this.container).show();
        permalink = '?mode=astable&r1=' + values.r1 + '&r2=' + values.r2 + '&c=' + values.c;
        circuit_title = "555 Timer A-stable Oscillator Circuit";
      }
      $('#circuit_title').html(circuit_title);
      return $('#visual555_permalink').attr('href', permalink);
    };

    AppController.prototype.snaffleUrlParams = function() {
      $('#R1', this.container).val(this.param('r1') || 1);
      $('#R2', this.container).val(this.param('r2') || 330);
      $('#C', this.container).val(this.param('c') || 2.2);
      this.mode = this.param('mode') || 'astable';
      return $("input[name='Mode'][value='" + this.mode + "']", this.container).prop("checked", true);
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
      var i, y, y_step, _i;
      context.beginPath();
      context.strokeStyle = 'black';
      context.fillStyle = 'black';
      context.fillText(this.values.label, this.values.x + this.values.width + 3, this.values.y + this.values.height / 2 - 7);
      context.moveTo(this.values.x + this.values.width / 2, this.values.y);
      y_step = (this.values.height - 2 * this.values.connectorStandoff) / 16;
      y = this.values.y + this.values.connectorStandoff;
      context.lineTo(this.values.x + this.values.width / 2, y);
      y += y_step;
      context.lineTo(this.values.x + this.values.width, y);
      for (i = _i = 0; _i <= 2; i = _i += 1) {
        y += y_step * 2;
        context.lineTo(this.values.x, y);
        y += y_step * 2;
        context.lineTo(this.values.x + this.values.width, y);
      }
      y += y_step * 2;
      context.lineTo(this.values.x, y);
      y += y_step;
      context.lineTo(this.values.x + this.values.width / 2, y);
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
      context.strokeStyle = 'black';
      context.fillStyle = 'black';
      context.fillText(this.values.label, this.values.x + this.values.width + 3, this.values.y + this.values.height / 2 - 7);
      context.rect(this.values.x, this.values.y + this.values.connectorStandoff, this.values.width, this.values.lineWidth);
      context.rect(this.values.x, this.values.y + this.values.height - this.values.connectorStandoff, this.values.width, this.values.lineWidth);
      context.moveTo(this.values.x + this.values.width / 2, this.values.y);
      context.lineTo(this.values.x + this.values.width / 2, this.values.y + this.values.connectorStandoff);
      context.moveTo(this.values.x + this.values.width / 2, this.values.y + this.values.height - this.values.connectorStandoff);
      context.lineTo(this.values.x + this.values.width / 2, this.values.y + this.values.height);
      context.fill();
      context.stroke();
      context.closePath();
    };

    return CeramicCapacitor;

  })(root.Component);

  root.SpstSwitch = (function(_super) {
    __extends(SpstSwitch, _super);

    function SpstSwitch() {
      return SpstSwitch.__super__.constructor.apply(this, arguments);
    }

    SpstSwitch.prototype.componentDefaults = function() {
      return {
        width: 20,
        height: 40
      };
    };

    SpstSwitch.prototype.pinPositions = function() {
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

    SpstSwitch.prototype.draw = function(context, with_switch_closed) {
      context.beginPath();
      context.strokeStyle = 'black';
      context.fillStyle = 'black';
      context.clearRect(this.values.x - 1, this.values.y + 1, this.values.width + 20, this.values.height - 2);
      context.fillText(this.values.label, this.values.x + this.values.width + 3, this.values.y + this.values.height / 2 - 7);
      context.moveTo(this.values.x + this.values.width / 2, this.values.y);
      context.lineTo(this.values.x + this.values.width / 2, this.values.y + this.values.connectorStandoff);
      context.moveTo(this.values.x + this.values.width / 2, this.values.y + this.values.height - this.values.connectorStandoff);
      context.lineTo(this.values.x + this.values.width / 2, this.values.y + this.values.height);
      context.moveTo(this.values.x + this.values.width / 2, this.values.y + this.values.height - this.values.connectorStandoff);
      if (with_switch_closed) {
        context.lineTo(this.values.x + this.values.width / 2, this.values.y + this.values.connectorStandoff);
      } else {
        context.lineTo(this.values.x, this.values.y + this.values.connectorStandoff);
      }
      context.moveTo(this.values.x + this.values.width / 2, this.values.y + this.values.height - this.values.connectorStandoff);
      context.arc(this.values.x + this.values.width / 2, this.values.y + this.values.height - this.values.connectorStandoff, 2, 0, 2 * Math.PI);
      context.moveTo(this.values.x + this.values.width / 2, this.values.y + this.values.connectorStandoff);
      context.arc(this.values.x + this.values.width / 2, this.values.y + this.values.connectorStandoff, 2, 0, 2 * Math.PI);
      context.fill();
      context.stroke();
      context.closePath();
    };

    return SpstSwitch;

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

    Led.prototype.draw = function(context, with_led_on) {
      var component_color, ray_offset;
      component_color = with_led_on ? this.values.color : 'black';
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
      ray_offset = this.values.x - 2;
      context.moveTo(ray_offset - 1, this.values.y + 13);
      context.lineTo(ray_offset - 6, this.values.y + 19);
      context.moveTo(ray_offset, this.values.y + 17);
      context.lineTo(ray_offset - 5, this.values.y + 23);
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
      context.closePath();
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
      context.strokeStyle = 'black';
      context.fillStyle = 'black';
      context.lineWidth = this.values.lineWidth;
      context.moveTo(this.values.x, this.values.y);
      context.lineTo(this.values.x + this.values.width, this.values.y + this.values.height);
      context.stroke();
      this.draw_label(context);
      context.closePath();
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
      context.stroke();
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
      context.stroke();
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
      context.strokeStyle = 'black';
      context.lineWidth = this.values.lineWidth;
      context.moveTo(part1_position.x, part1_position.y);
      context.lineTo(part2_position.x, part2_position.y);
      context.moveTo(part1_position.x, part1_position.y);
      context.arc(part1_position.x, part1_position.y, 1, 0, 2 * Math.PI);
      context.moveTo(part2_position.x, part2_position.y);
      context.arc(part2_position.x, part2_position.y, 1, 0, 2 * Math.PI);
      context.stroke();
      context.closePath();
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

    function Visual555(container, mode) {
      this.container = container;
      this.mode = mode;
      this.components = [];
      this.calculator = new root.Calculator555();
      this.canvas = this.container.get(0);
      this.context = this.canvas.getContext("2d");
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
      var f, instance, output_high, switch_open;
      instance = this;
      output_high = false;
      switch_open = true;
      f = function() {
        var t, th;
        th = instance.calculator.timeHigh();
        t = th > 0 ? instance.mode === 'monostable' ? switch_open && !output_high ? (instance.ledOn(), instance.switchClosed(), output_high = true, switch_open = false, th) : !switch_open && output_high ? (instance.ledOff(), output_high = false, th) : (switch_open = true, output_high = false, instance.switchOpen(), th * 2) : output_high ? (output_high = false, instance.ledOff(), instance.calculator.timeLow()) : (output_high = true, instance.ledOn(), th) : 500;
        return setTimeout(f, t);
      };
      return f();
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

    Visual555.prototype.switchOpen = function() {
      if (this["switch"]) {
        return this["switch"].draw(this.context, false);
      }
    };

    Visual555.prototype.switchClosed = function() {
      if (this["switch"]) {
        return this["switch"].draw(this.context, true);
      }
    };

    Visual555.prototype.recalc = function(values) {
      var new_mode;
      new_mode = values.mode;
      if (new_mode && new_mode !== this.mode) {
        this.mode = new_mode;
        this.drawCircuit();
      }
      return this.calculator.recalc(values);
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

    Visual555.prototype.addComponent = function(component) {
      this.components.push(component);
      return component;
    };

    Visual555.prototype.drawCircuit = function() {
      this.components = [];
      this.output_led = null;
      this["switch"] = null;
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      if (this.mode === 'monostable') {
        this.drawMonostableCircuit();
      } else {
        this.drawAstableCircuit();
      }
      return this.redraw();
    };

    Visual555.prototype.drawAstableCircuit = function() {
      var c1, c2, gnd, r1, r2, rl, timer, vcc, width, y_gnd, y_vcc;
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
        y: y_vcc + 180,
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
      rl = this.addComponent(new root.Resistor({
        x: 300,
        y: y_vcc + 130,
        label: 'RL'
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
      this.addComponent(new root.ConnectingWire(timer, '3', rl, '1'));
      this.addComponent(new root.ConnectingWire(rl, '2', this.output_led, '1'));
      this.addComponent(new root.ConnectingWire(this.output_led, '2', gnd, 305));
      this.addComponent(new root.ConnectingWire(timer, '5', c2, '1'));
      return this.addComponent(new root.ConnectingWire(c2, '2', gnd, 220));
    };

    Visual555.prototype.drawMonostableCircuit = function() {
      var c1, c2, gnd, r1, rl, rp, timer, vcc, width, y_gnd, y_vcc;
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
        x: 120,
        y: y_vcc + 40,
        label: 'R1'
      }));
      c1 = this.addComponent(new root.CeramicCapacitor({
        x: 120,
        y: y_vcc + 180,
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
      rl = this.addComponent(new root.Resistor({
        x: 300,
        y: y_vcc + 130,
        label: 'RL'
      }));
      this.output_led = this.addComponent(new root.Led({
        x: 295,
        y: 230,
        color: 'red'
      }));
      rp = this.addComponent(new root.Resistor({
        x: 70,
        y: y_vcc + 100,
        label: 'RP'
      }));
      this["switch"] = this.addComponent(new root.SpstSwitch({
        x: 65,
        y: y_vcc + 200,
        label: 'S1'
      }));
      this.addComponent(new root.ConnectingWire(vcc, 125, r1, '1'));
      this.addComponent(new root.ConnectingWire(r1, '2', c1, '1'));
      this.addComponent(new root.ConnectingWire(r1, '2', timer, '7'));
      this.addComponent(new root.ConnectingWire(c1, '2', gnd, 125));
      this.addComponent(new root.ConnectingWire(vcc, 75, rp, '1'));
      this.addComponent(new root.ConnectingWire(timer, '2', rp, '2'));
      this.addComponent(new root.ConnectingWire(rp, '2', this["switch"], '1'));
      this.addComponent(new root.ConnectingWire(this["switch"], '2', gnd, 75));
      this.addComponent(new root.ConnectingWire(vcc, 200, timer, '8'));
      this.addComponent(new root.ConnectingWire(vcc, 220, timer, '4'));
      this.addComponent(new root.ConnectingWire(timer, '6', timer, '7'));
      this.addComponent(new root.ConnectingWire(timer, '1', gnd, 200));
      this.addComponent(new root.ConnectingWire(timer, '3', rl, '1'));
      this.addComponent(new root.ConnectingWire(rl, '2', this.output_led, '1'));
      this.addComponent(new root.ConnectingWire(this.output_led, '2', gnd, 305));
      this.addComponent(new root.ConnectingWire(timer, '5', c2, '1'));
      return this.addComponent(new root.ConnectingWire(c2, '2', gnd, 220));
    };

    return Visual555;

  })();

}).call(this);
