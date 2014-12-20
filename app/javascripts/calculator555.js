(function() {
  var root;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.Calculator555 = (function() {
    function Calculator555(settings) {
      this.reset();
      if (settings) {
        this.r1 = settings.r1;
        this.r2 = settings.r2;
        this.c = settings.c;
        this.recalc();
      }
    }

    Calculator555.prototype.reset = function() {
      this.r1 = 0;
      this.r2 = 0;
      this.c = 0;
      this.frequency = 0;
      this.cycle_time = 0;
      this.time_high = 0;
      this.time_low = 0;
      return this.duty_cycle = 0;
    };

    Calculator555.prototype.recalc = function(values) {
      var v;
      if (v = values.r1) {
        this.r1 = v;
      }
      if (v = values.r2) {
        this.r2 = v;
      }
      if (v = values.c) {
        this.c = v;
      }
      this.frequency = 1.44 * 1000 / (this.r1 + 2 * this.r2) / this.c;
      this.time_high = 0.693 * (this.r1 + this.r2) * this.c;
      this.time_low = 0.693 * this.r2 * this.c;
      this.cycle_time = this.time_high + this.time_low;
      this.duty_cycle = this.time_high / this.cycle_time * 100.0;
      return {
        r1: this.r1,
        r2: this.r2,
        c: this.c,
        frequency: this.frequency,
        time_high: this.time_high,
        time_low: this.time_low,
        cycle_time: this.cycle_time,
        duty_cycle: this.duty_cycle
      };
    };

    return Calculator555;

  })();

}).call(this);
