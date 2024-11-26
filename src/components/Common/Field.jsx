/* eslint-disable react/prop-types */
import React from "react";

const Field = ({ label, children, htmlFor, error }) => {
    const id = htmlFor || getChildId(children);

    // Check if the child is a checkbox
    const isCheckbox = children?.type === "input" && children.props?.type === "checkbox";

    return (
        <div
            className={`flex ${isCheckbox ? "flex-row-reverse justify-end gap-2 items-center text-center" : "flex-col"} items-start justify-start mt-2 p-0 w-full mr-2`}
        >
            {label && <label htmlFor={id} className={`${isCheckbox? "mr-2" :"mb-1 mr-2"}`}>{label}</label>}
            {children}
            {!!error && <div className="text-red-500">{error.message}</div>}
        </div>
    );
};

const getChildId = (children) => {
    const child = React.Children.only(children);

    if ("id" in child?.props) {
        return child.props.id;
    }
};

export default Field;
