import React from "react";
import Select, { components } from "react-select";

const Option = (props) => (
        <components.Option {...props}>{props.children}</components.Option>
    );


const IndicatorSeparator = ({
    innerProps
}) => <span style={{ display: "none" }} {...innerProps} />;


const CustomSelect = ({ ...rest }) => (
        <Select
            components={{ Option, IndicatorSeparator }}
            classNamePrefix="select"
            {...rest}
        // menuIsOpen={true}
         />
    );
export default CustomSelect;