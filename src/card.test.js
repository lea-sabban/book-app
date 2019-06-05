import Card from "./card";
import React from "react";
import { shallow } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });
describe("card", function() {
  it("test the edit button", function() {
    const book = {
      id: "1",
      title: "test book",
      author: "test"
    };
    const onEdit = jest.fn();

    const wrapper = shallow(<Card color="#000" onEdit={onEdit} data={book} />);
    const button = wrapper.find(".edit");
    expect(button.length).toEqual(1);

    button.simulate("click");
    expect(onEdit).toHaveBeenCalledWith(book);
  });
});
