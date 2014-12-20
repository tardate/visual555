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
      values = this.visualizer.recalc({
        r1: parseFloat($('#R1', this.container).val()),
        r2: parseFloat($('#R2', this.container).val()),
        c: parseFloat($('#C', this.container).val())
      });
      $('#frequency', this.container).html(values.frequency.toFixed(3) + ' Hz');
      $('#time_high', this.container).html(values.time_high.toFixed(3) + ' ms');
      $('#time_low', this.container).html(values.time_low.toFixed(3) + ' ms');
      $('#cycle_time', this.container).html(values.cycle_time.toFixed(3) + ' ms');
      $('#duty_cycle', this.container).html(values.duty_cycle.toFixed(3) + ' %');
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
      this.calculator = new root.Calculator555();
      this.context = this.container.get(0).getContext("2d");
      this.apply_defaults();
      this.draw_circuit();
      this.init_animation_loop();
      true;
    }

    Visual555.prototype.apply_defaults = function() {
      this.context.translate(0.5, 0.5);
      this.context.font = '14px monospace';
      return this.context.textBaseline = 'top';
    };

    Visual555.prototype.init_animation_loop = function() {
      var f, instance, output_high;
      instance = this;
      output_high = true;
      f = function() {
        var t, th;
        if ((th = instance.calculator.time_high()) > 0) {
          t = output_high ? (instance.led_on(), th) : (instance.led_off(), instance.calculator.time_low());
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

    Visual555.prototype.draw_circuit = function() {
      var y_gnd, y_vcc;
      y_vcc = 30;
      y_gnd = 340;
      this.draw_wire(10, y_vcc, 400, y_vcc);
      this.draw_wire(10, y_gnd, 400, y_gnd);
      this.draw_resistor(100, y_vcc + 20, 'R1');
      this.draw_resistor(100, y_vcc + 100, 'R2');
      this.draw_capacitor(100, y_vcc + 170, 'C1');
      this.draw_wire(105, y_vcc, 105, y_vcc + 20);
      this.draw_wire(105, y_vcc + 80, 105, y_vcc + 100);
      this.draw_wire(105, y_vcc + 160, 105, y_vcc + 170);
      this.draw_wire(105, y_vcc + 200, 105, y_gnd);
      this.draw_wire(105, y_vcc + 100, 160, y_vcc + 100);
      this.draw_wire(105, y_vcc + 160, 160, y_vcc + 160);
      this.draw_wire(160, y_vcc + 140, 160, y_vcc + 160);
      this.draw_wire(200, y_vcc, 200, y_vcc + 70);
      this.draw_wire(220, y_vcc, 220, y_vcc + 70);
      this.draw_timer(160, y_vcc + 70);
      this.draw_wire(200, 220, 200, y_gnd);
      this.draw_capacitor(215, 220, 'C2');
      this.draw_wire(220, 220 + 30, 220, y_gnd);
      this.draw_wire(260, y_vcc + 130, 305, y_vcc + 130);
      this.draw_resistor(300, y_vcc + 130, 'R3');
      this.draw_wire(305, y_vcc + 190, 305, y_vcc + 200);
      this.draw_wire(305, y_vcc + 230, 305, y_gnd);
      return this.led_off();
    };

    Visual555.prototype.led_off = function() {
      return this.draw_led(305, 230, 'black');
    };

    Visual555.prototype.led_on = function() {
      return this.draw_led(305, 230, 'red');
    };

    Visual555.prototype.draw_wire = function(x1, y1, x2, y2) {
      this.context.strokeStyle = "black";
      this.context.lineWidth = 1;
      this.context.beginPath();
      this.context.moveTo(x1, y1);
      this.context.lineTo(x2, y2);
      this.context.stroke();
      return this.context.closePath();
    };

    Visual555.prototype.draw_resistor = function(x, y, label) {
      this.context.strokeStyle = "black";
      this.context.beginPath();
      this.context.fillStyle = 'white';
      this.context.rect(x, y + 10, 10, 40);
      this.context.fill();
      this.context.stroke();
      this.context.closePath();
      this.context.beginPath();
      this.context.fillStyle = 'black';
      this.context.fillText(label, x + 13, y + 23);
      this.context.moveTo(x + 5, y);
      this.context.lineTo(x + 5, y + 10);
      this.context.moveTo(x + 5, y + 50);
      this.context.lineTo(x + 5, y + 60);
      this.context.stroke();
      return this.context.closePath();
    };

    Visual555.prototype.draw_capacitor = function(x, y, label) {
      this.context.beginPath();
      this.context.fillStyle = 'black';
      this.context.fillText(label, x + 13, y + 13);
      this.context.rect(x, y + 10, 10, 2);
      this.context.rect(x, y + 15, 10, 2);
      this.context.moveTo(x + 5, y);
      this.context.lineTo(x + 5, y + 10);
      this.context.moveTo(x + 5, y + 17);
      this.context.lineTo(x + 5, y + 30);
      this.context.fill();
      this.context.stroke();
      return this.context.closePath();
    };

    Visual555.prototype.draw_led = function(x, y, color) {
      this.context.beginPath();
      this.context.strokeStyle = 'black';
      this.context.moveTo(x, y);
      this.context.lineTo(x, y + 10);
      this.context.moveTo(x, y + 24);
      this.context.lineTo(x, y + 40);
      this.context.stroke();
      this.context.closePath();
      this.context.beginPath();
      this.context.strokeStyle = color;
      this.context.fillStyle = color;
      this.context.moveTo(x, y + 10);
      this.context.lineTo(x - 10, y + 10);
      this.context.lineTo(x, y + 20);
      this.context.lineTo(x + 10, y + 10);
      this.context.lineTo(x, y + 10);
      this.context.moveTo(x - 14, y + 12);
      this.context.lineTo(x - 20, y + 18);
      this.context.moveTo(x - 13, y + 16);
      this.context.lineTo(x - 19, y + 22);
      this.context.rect(x - 10, y + 21, 20, 2);
      this.context.fill();
      this.context.stroke();
      return this.context.closePath();
    };

    Visual555.prototype.draw_timer = function(x, y) {
      this.context.strokeStyle = "black";
      this.context.lineWidth = 1;
      this.context.beginPath();
      this.context.fillStyle = 'white';
      this.context.rect(x + 10, y + 10, 80, 100);
      this.context.fill();
      this.context.stroke();
      this.context.closePath();
      this.context.beginPath();
      this.context.fillStyle = 'black';
      this.context.moveTo(x + 40, y);
      this.context.lineTo(x + 40, y + 10);
      this.context.fillText("8", x + 36, y + 15);
      this.context.moveTo(x + 60, y);
      this.context.lineTo(x + 60, y + 10);
      this.context.fillText("4", x + 56, y + 15);
      this.context.moveTo(x, y + 30);
      this.context.lineTo(x + 10, y + 30);
      this.context.fillText("7", x + 13, y + 24);
      this.context.moveTo(x, y + 70);
      this.context.lineTo(x + 10, y + 70);
      this.context.fillText("6", x + 13, y + 64);
      this.context.moveTo(x, y + 90);
      this.context.lineTo(x + 10, y + 90);
      this.context.fillText("2", x + 13, y + 84);
      this.context.moveTo(x + 40, y + 110);
      this.context.lineTo(x + 40, y + 120);
      this.context.fillText("1", x + 36, y + 95);
      this.context.moveTo(x + 60, y + 110);
      this.context.lineTo(x + 60, y + 120);
      this.context.fillText("5", x + 56, y + 95);
      this.context.moveTo(x + 90, y + 60);
      this.context.lineTo(x + 100, y + 60);
      this.context.fillText("3", x + 78, y + 54);
      this.context.fill();
      this.context.stroke();
      return this.context.closePath();
    };

    return Visual555;

  })();

}).call(this);
