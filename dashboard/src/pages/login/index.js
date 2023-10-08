import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
// import { gapi, loadAuth2 } from 'gapi-script';

import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";

import Button from '@mui/material/Button';
import GoogleLogin from 'components/auth/google-login';
import { Input, Spinner } from "components/xbl";

import useLogin from "hooks/useLogin";

import LogoWhite from "assets/logo/logo-full-red-white.svg";
import LogoColor from "assets/logo/logo-full-color.svg";



export default function Login() {
    const query = new URLSearchParams(window.location.search);
    const redirect = query.get('r') || "/dashboard";

    const navigate = useNavigate();
    const user = useSelector(state => state.user.value);


    const authenticate = useLogin(redirect);


    const initialValues = {
        email: "",
        password: "",
        type: "password",
    }

    useEffect(() => {
        // check if logged in
        if (user.token && user.token !== null) {
            // console.log("token found in cache p/l/43",);
            navigate(redirect);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])



    const handleSubmit = (values, { setSubmitting }) => {
        authenticate(values, setSubmitting)
    }


    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email address format")
            .required("Email is required"),
        password: Yup.string()
            .min(8, "Password must be 8 characters at minimum")
            .required("Password is required"),
    });


    return (
        <div className="p50 h100vh ic ">
            <div className='w100 mw400 mauto white br10 p2'>
                <div className='w60 mauto mb2'>
                    <img src={LogoWhite} alt="Art" className="for-dark w100" />
                    <img src={LogoColor} alt="Art" className=" for-light w100" />
                </div>

                <GoogleLogin />

                <div className='ic my2'>
                    <div className='ic40 graye ic f08 bold cgray7 br30'>OR</div>
                </div>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                    }) => (
                        <Form className='mt2' onSubmit={handleSubmit}>
                            <Input
                                className="email"
                                label="Email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                            />
                            <ErrorMessage name="email" component={FormikError} />

                            <Input
                                type="password"
                                name="password"
                                label="Password"
                                className="mt2"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                            <ErrorMessage name="password" component={FormikError} />

                            <div className=" mt2">
                                {isSubmitting ?
                                    <Spinner /> :
                                    <Button
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                    >
                                        Login
                                    </Button>}
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}



export const FormikError = ({ children }) => <div className="form-error">
        {children}
    </div>