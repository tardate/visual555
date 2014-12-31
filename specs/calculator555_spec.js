describe("Calculator555()", function() {
  var subject = new Calculator555();

  it("should construct object with values reset and default astable mode", function() {
    expect(subject.timeHigh()).toEqual(0);
    expect(subject.timeLow()).toEqual(0);
    expect(subject.mode()).toEqual('astable');
  });

});

describe("Calculator555({..})", function() {
  var subject = new Calculator555({r1: 10, r2: 330, c: 2.2});

  it("should construct object with values calculated given options", function() {
    expect(subject.values.frequency).toEqual(0.976933514246947);
    expect(subject.values.mode).toEqual('astable');
  });

  describe(".values", function() {
    it("provides direct access to internal data collection", function() {
      expect(subject.values.r1).toEqual(10);
      expect(subject.values.r2).toEqual(330);
      expect(subject.values.c).toEqual(2.2);
      expect(subject.values.timeHigh).toEqual(518.364);
      expect(subject.values.timeLow).toEqual(503.118);
    });
  });

  describe(".timeHigh()", function() {
    it("should return correct value", function() {
      expect(subject.timeHigh()).toEqual(518.364);
    });
  });

  describe(".timeLow()", function() {
    it("should return correct value", function() {
      expect(subject.timeLow()).toEqual(503.118);
    });
  });

  describe(".recalc()", function() {

    it("calculates with new values", function() {
      var result = subject.recalc({
        r1: 10,
        r2: 4.7,
        c: 0.01
      });
      expect(result.frequency).toEqual(7422.6804123711345);
      expect(result.cycleTime).toEqual(0.134442);
      expect(result.timeHigh).toEqual(0.10187099999999999);
      expect(result.timeLow).toEqual(0.032571);
      expect(result.dutyCycle).toEqual(75.77319587628864);
    });


    it("with mode change calculates with new values", function() {
      var result = subject.recalc({
        r1: 33,
        c: 47,
        mode: 'monostable'
      });
      expect(result.mode).toEqual('monostable');
      expect(result.frequency).toEqual(NaN);
      expect(result.cycleTime).toEqual(NaN);
      expect(result.timeHigh).toEqual(1.1 * 33 * 47);
      expect(result.timeLow).toEqual(NaN);
      expect(result.dutyCycle).toEqual(NaN);
    });

  });

  describe(".reset()", function() {

    it("should reset all values to 0", function() {
      subject.reset();
      expect(subject.mode()).toEqual('astable');
      expect(subject.timeHigh()).toEqual(0);
      expect(subject.timeLow()).toEqual(0);
    });

  });

});

describe("Calculator555({.., mode: 'monostable'})", function() {
  var subject = new Calculator555({r1: 10, c: 47, mode: 'monostable'});

  it("should construct object with values calculated given options", function() {
    expect(subject.values.timeHigh).toEqual(1.1 * 10 * 47);
    expect(subject.values.mode).toEqual('monostable');
  });

  describe(".recalc()", function() {

    it("calculates with new values", function() {
      var result = subject.recalc({
        r1: 33,
        c: 47
      });
      expect(result.mode).toEqual('monostable');
      expect(result.frequency).toEqual(NaN);
      expect(result.cycleTime).toEqual(NaN);
      expect(result.timeHigh).toEqual(1.1 * 33 * 47);
      expect(result.timeLow).toEqual(NaN);
      expect(result.dutyCycle).toEqual(NaN);
    });

    it("with mode change should calculates with new values", function() {
      var result = subject.recalc({
        r1: 10,
        r2: 4.7,
        c: 0.01,
        mode: 'astable'
      });
      expect(result.mode).toEqual('astable');
      expect(result.frequency).toEqual(7422.6804123711345);
      expect(result.cycleTime).toEqual(0.134442);
      expect(result.timeHigh).toEqual(0.10187099999999999);
      expect(result.timeLow).toEqual(0.032571);
      expect(result.dutyCycle).toEqual(75.77319587628864);
    });

  });

  describe(".reset()", function() {

    it("should reset all values to 0", function() {
      subject.reset();
      expect(subject.mode()).toEqual('astable');
      expect(subject.timeHigh()).toEqual(0);
      expect(subject.timeLow()).toEqual(0);
    });

  });

});



