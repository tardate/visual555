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

    Calculator555.prototype.recalc = function() {
      this.frequency = 1.44 * 1000 / (this.r1 + 2 * this.r2) / this.c;
      this.time_high = 0.693 * (this.r1 + this.r2) * this.c;
      this.time_low = 0.693 * this.r2 * this.c;
      this.cycle_time = this.time_high + this.time_low;
      return this.duty_cycle = this.time_high / this.cycle_time * 100.0;
    };

    return Calculator555;

  })();

}).call(this);
