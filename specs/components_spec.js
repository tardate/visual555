describe("Component()", function() {
  var subject = new Component();

  it("should construct object with default values reset", function() {
    expect(subject.values.x).toEqual(0);
    expect(subject.values.y).toEqual(0);
    expect(subject.values.width).toEqual(100);
    expect(subject.values.height).toEqual(100);
  });

});

describe("Resistor()", function() {
  var subject = new Resistor();

  it("should construct object with default values reset", function() {
    expect(subject.values.x).toEqual(0);
    expect(subject.values.y).toEqual(0);
    expect(subject.values.width).toEqual(10);
    expect(subject.values.height).toEqual(60);
  });

});

describe("CeramicCapacitor()", function() {
  var subject = new CeramicCapacitor();

  it("should construct object with default values reset", function() {
    expect(subject.values.x).toEqual(0);
    expect(subject.values.y).toEqual(0);
    expect(subject.values.width).toEqual(10);
    expect(subject.values.height).toEqual(25);
  });

});

describe("Led()", function() {
  var subject = new Led();

  it("should construct object with default values reset", function() {
    expect(subject.values.x).toEqual(0);
    expect(subject.values.y).toEqual(0);
    expect(subject.values.width).toEqual(20);
    expect(subject.values.height).toEqual(30);
    expect(subject.values.color).toEqual('red');
  });

});

describe("LM555()", function() {
  var subject = new LM555();

  it("should construct object with default values reset", function() {
    expect(subject.values.x).toEqual(0);
    expect(subject.values.y).toEqual(0);
    expect(subject.values.width).toEqual(100);
    expect(subject.values.height).toEqual(120);
  });

});

describe("PowerRail()", function() {
  var subject = new PowerRail();

  it("should construct object with default values reset", function() {
    expect(subject.values.x).toEqual(0);
    expect(subject.values.y).toEqual(30);
    expect(subject.values.width).toEqual(400);
    expect(subject.values.height).toEqual(0);
    expect(subject.values.label).toEqual('Vcc');
  });

});

describe("GroundRail()", function() {
  var subject = new GroundRail();

  it("should construct object with default values reset", function() {
    expect(subject.values.x).toEqual(0);
    expect(subject.values.y).toEqual(340);
    expect(subject.values.width).toEqual(400);
    expect(subject.values.height).toEqual(0);
    expect(subject.values.label).toEqual('Gnd');
  });

});

describe("ConnectingWire()", function() {
  var subject = new ConnectingWire();

  it("should construct object with default values reset", function() {
    expect(subject.values.x).toEqual(0);
    expect(subject.values.y).toEqual(0);
  });

});
