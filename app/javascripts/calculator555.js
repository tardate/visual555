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
        cycleTime: 0,
        timeHigh: 0,
        timeLow: 0,
        dutyCycle: 0
      };
    };

    Calculator555.prototype.timeHigh = function() {
      return this.values.timeHigh;
    };

    Calculator555.prototype.timeLow = function() {
      return this.values.timeLow;
    };

    Calculator555.prototype.recalc = function(settings) {
      if (settings) {
        $.extend(this.values, settings);
      }
      this.values.frequency = 1.44 * 1000 / (this.values.r1 + 2 * this.values.r2) / this.values.c;
      this.values.timeHigh = 0.693 * (this.values.r1 + this.values.r2) * this.values.c;
      this.values.timeLow = 0.693 * this.values.r2 * this.values.c;
      this.values.cycleTime = this.values.timeHigh + this.values.timeLow;
      this.values.dutyCycle = this.values.timeHigh / this.values.cycleTime * 100.0;
      return this.values;
    };

    return Calculator555;

  })();

}).call(this);
