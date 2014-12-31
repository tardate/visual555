describe("Component()", function() {
  var subject = new Component();

  it("should construct object with default values reset", function() {
    expect(subject.values.x).toEqual(0);
    expect(subject.values.y).toEqual(0);
    expect(subject.values.width).toEqual(100);
    expect(subject.values.height).toEqual(100);
  });

});