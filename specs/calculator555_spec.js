describe("Calculator555()", function() {
  var subject = new Calculator555();

  it("should construct object with values reset", function() {
    expect(subject.time_high()).toEqual(0);
    expect(subject.time_low()).toEqual(0);
  });

});

describe("Calculator555({..})", function() {
  var subject = new Calculator555({r1: 10, r2: 330, c: 2.2});

  it("should construct object with values calculated given options", function() {
    expect(subject.values.frequency).toEqual(0.976933514246947);
  });

  describe(".values", function() {
    it("provides direct access to internal data collection", function() {
      expect(subject.values.r1).toEqual(10);
      expect(subject.values.r2).toEqual(330);
      expect(subject.values.c).toEqual(2.2);
      expect(subject.values.time_high).toEqual(518.364);
      expect(subject.values.time_low).toEqual(503.118);
    });
  });

  describe(".time_high()", function() {
    it("should return correct value", function() {
      expect(subject.time_high()).toEqual(518.364);
    });
  });

  describe(".time_low()", function() {
    it("should return correct value", function() {
      expect(subject.time_low()).toEqual(503.118);
    });
  });

});

describe("Calculator555.recalc()", function() {

  it("calculates astable correctly given r1,r2,c", function() {
    var subject = new Calculator555();
    var result = subject.recalc({
      r1: 10,
      r2: 330,
      c: 2.2
    });
    expect(result.frequency).toEqual(0.976933514246947);
    expect(result.cycle_time).toEqual(1021.482);
    expect(result.time_high).toEqual(518.364);
    expect(result.time_low).toEqual(503.118);
    expect(result.duty_cycle).toEqual(50.74626865671642);
  });

});

describe("Calculator555.reset()", function() {
  var subject = new Calculator555({r1: 10, r2: 330, c: 2.2});

  it("should reset all values to 0", function() {
    expect(subject.time_high()).toEqual(518.364);
    subject.reset();
    expect(subject.time_high()).toEqual(0);
    expect(subject.time_low()).toEqual(0);
  });

});

