import React from "react";
import { Select, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { SelectContent } from "@radix-ui/react-select";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const CommonForm = ({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
}) => {
  function renderInputsByComponentType(getControlItem) {
    let element = null;
    const value = formData[getControlItem.name];
    switch (getControlItem.component) {
      case "input":
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            type={getControlItem.type}
            id={getControlItem.name}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
      case "select":
        element = (
          <Select value={value} onValueChange={(value)=>{
            setFormData({
              ...formData,
              [getControlItem.name]: value,
            })
          }}>
            <SelectTrigger className="w-full">
              <SelectValue>{getControlItem.placeholder}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {getControlItem.optioms && getControlItem.optioms.length > 0
                ? getControlItem.optioms.map((optionItem) => (
                    <SelectItem>{optionItem.label}</SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;
      case "textarea":
        element = (
          <textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );

      default:
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            type={getControlItem.type}
            id={getControlItem.name}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
    }
    return element;
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-3">
          {formControls.map((controlItem) => (
            <div key={controlItem.name} className="grid w-full gap-1.5">
              <label className="mb-1">{controlItem.label}</label>
              {renderInputsByComponentType(controlItem)}
            </div>
          ))}
        </div>
        <Button type="submit" className="mt-2 w-full">
          {buttonText || "Submit"}
        </Button>
      </form>
    </>
  );
};

export default CommonForm;
