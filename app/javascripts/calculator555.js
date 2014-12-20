(function() {
  var root;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.Calculator555 = (function() {
    function Calculator555(settings) {
      this.reset();
      this.recalc(settings);
    }

    Calculator555.prototype.reset = function() {
      return this.values = {
        r1: 0,
        r2: 0,
        c: 0,
        frequency: 0,
        cycle_time: 0,
        time_high: 0,
        time_low: 0,
        duty_cycle: 0
      };
    };

    Calculator555.prototype.time_high = function() {
      return this.values.time_high;
    };

    Calculator555.prototype.time_low = function() {
      return this.values.time_low;
    };

    Calculator555.prototype.recalc = function(settings) {
      if (settings) {
        $.extend(this.values, settings);
      }
      this.values.frequency = 1.44 * 1000 / (this.values.r1 + 2 * this.values.r2) / this.values.c;
      this.values.time_high = 0.693 * (this.values.r1 + this.values.r2) * this.values.c;
      this.values.time_low = 0.693 * this.values.r2 * this.values.c;
      this.values.cycle_time = this.values.time_high + this.values.time_low;
      this.values.duty_cycle = this.values.time_high / this.values.cycle_time * 100.0;
      return this.values;
    };

    return Calculator555;

  })();

}).call(this);
