import { onShotMeKeyboardClick } from "../src/components/shot-me/actions/keyboardActions";

var expect = require("chai").expect;

describe("Keyboard tests", () => {
  it("it should retuns empty string on given 10", () => {
    expect(onShotMeKeyboardClick("12345", "clear")).to.equal("");
  });
  it("it should retuns cutted phoneNumber on backspace", () => {
    expect(onShotMeKeyboardClick("12345", "backspace")).to.equal("1234");
  });
  it("it hould retuns added phone number on given number", () => {
    expect(onShotMeKeyboardClick("12345", 1)).to.equal("123451");
  });
  it("it should retuns added phone number on given number 10th  number", () => {
    expect(onShotMeKeyboardClick("123456789", 1)).to.equal("123456789");
  });
});
