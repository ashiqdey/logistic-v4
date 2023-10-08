import React, { useState, cloneElement, Fragment, useRef } from "react";
// import useRipple from "../../hooks/useRipple";
// import useFocus from "../../hooks/useFocus";
// import useOnOutside from "../../hooks/useOnOutside";

// import noData from "../../assets/svg/no-data.svg";
import { urls } from '../../configs';


/*--------------------------
          LAYOUTS
-------------------------*/
export const Col = ({ xs, sm, md, lg, xl, xxl, k2, className, card, children, ...rest }) => {
    const classNames = [];
    if (xs) {
        classNames.push(`w${xs}`);
    }
    else {
        classNames.push(`w100`);
    }
    if (sm) {
        classNames.push(`sm-w${sm}`);
    }
    if (md) {
        classNames.push(`md-w${md}`);
    }
    if (lg) {
        classNames.push(`lg-w${lg}`);
    }
    if (xl) {
        classNames.push(`xl-w${xl}`);
    }
    if (xxl) {
        classNames.push(`xxl-w${xxl}`);
    }
    if (k2) {
        classNames.push(`k2-w${k2}`);
    }

    classNames.push(className);

    return <div {...rest} className={classNames.join(" ")}>
        {
            card ? <div className={card}>{children}</div> : children
        }
    </div>
}





export const Bull = ({ list, className }) => <div className={`flex aic ${className}`}>
        {
            list.map((e, i) => <Fragment key={i}>
                {
                    i > 0 && <span className="ml25 mr25 f18 o4 lh1">&bull;</span>
                }
                <span>{e}</span>
            </Fragment>)
        }
    </div>


export const Avatar = ({ className, img }) => <div
        className={`avatar ic30 br50 bc ${className}`}
        style={{
            backgroundImage: `url(${img})`
        }} />

/*--------------------------
          LAYOUTS
-------------------------*/



/*--------------------------
          RIPPLE
-------------------------*/
// export const Ripple = ({ children, ...rest }) => {
//     const { coords, rippleClick } = useRipple();

//     return (
//         <>
//             {cloneElement(children, {
//                 className: `${children.props.className} ripple`,
//                 onMouseDown: (e) => rippleClick(e),
//                 // onClick,
//                 style: coords,
//                 ...rest
//             })}
//         </>
//     );
// };


/*--------------------------
          RIPPLE
-------------------------*/




// export const Threedot = ({ children }) => {
//     const [more, setmore] = useState(false);

//     const refMenu = useRef();
//     useOnOutside(refMenu, () => setmore(false));


//     return (<div className="ic40 pr">
//         <div onClick={() => setmore(true)} className="ix-three-dot cgraya ic40 br50 ic hover-graye"></div>
//         {
//             more && <div ref={refMenu} className="white bslg dark pa t0 r0 br10 z10 pt50">
//                 {children}
//             </div>
//         }
//     </div>);
// };



export const NoData = ({
    className = "tc py2",
    text = "No data found"
}) => (
        <div className={className}>
            <img src={`${urls.appBaseUrl}/assets/svg/no-data.svg`}  className="w50 mw300" alt="no data" />
            <div>{text}</div>
        </div>
    );




/*--------------------------
          FORM
-------------------------*/
export const Input = (props) => {
    const {
        type = "text",
    } = props;

    if (type === "textarea") {
        // return <Textarea {...props} />
    }
    if (type === "radio" || type === "checkbox") {
        // return <Checkbox {...props} />
    }
    if (type === "switch") {
        // return <Switch {...props} />
    }

    // return <InputBox {...props} />
}



// function InputBox(props) {
//     const {
//         children,
//         type = "text",
//         label = "",
//         className = "",
//         prefix = "",
//         ...rest
//     } = props;

//     const [inputRef, setInputFocus] = useFocus()
//     const [inputType, setInputType] = useState(type);

//     const togglePassword = () => {
//         setInputType(inputType === "text" ? "password" : "text");
//         setInputFocus();
//     }


//     return <div className={`ninput ${className}`} prefix={prefix}>
//         {
//             // formik compatibility
//             children ? children : <input {...rest} type={inputType} ref={inputRef} placeholder={label} />
//         }
//         <label>{label}</label>
//         {
//             type === "password" && <div
//                 className={`password-toggle pa ic50 cp z2 t0 r0 ${inputType}`}
//                 onClick={togglePassword}
//             ></div>
//         }
//     </div>
// }











// function Textarea(props) {
//     const {
//         className = "",
//         label = "",
//         ...rest
//     } = props;
//     return <div className={`ninput ${className}`}>
//         <textarea {...rest} placeholder={label}></textarea>
//         <label>{label}</label>
//     </div>
// }



// function Checkbox(props) {
//     const {
//         type = "checkbox",
//         label = "",
//         ...rest
//     } = props;

//     return (<label className={`checkbox ${type}`}>
//         <input {...rest} type={type} className="rb dn" />
//         <div className="tick">
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29 29" className="pr z100">
//                 <circle></circle>
//                 <path fill="none" stroke="#075EDD" strokeWidth="2" d="M5.3999023,14.2783203 l4.8852539,6.7744141l13.9477539-10.6259766"></path>
//             </svg>
//         </div>
//         <div className="text">{label}</div>
//     </label>)
// }




// function Switch({ ...rest }) {
//     return (<label className="switch" >
//         <input {...rest} type="checkbox" />
//         <span className="slider"></span>
//     </label>)
// }




export const Spinner = ({ size = "" }) => <div className={`loader ${size}`}>
        <div className="wrap">
            <svg viewBox="25 25 50 50" className="w100">
                <circle
                    className="path"
                    strokeLinecap="round"
                    strokeWidth="3px"
                    fill="none"
                    r="20"
                    cx="50"
                    cy="50" />
            </svg>
        </div>
    </div>
/*--------------------------
          FORM
-------------------------*/


