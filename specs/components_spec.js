describe("Component()", function() {
  var subject = new Component();

  it("should construct object with values reset", function() {
    expect(subject.values.x).toEqual(0);
    expect(subject.values.y).toEqual(0);
  });

});