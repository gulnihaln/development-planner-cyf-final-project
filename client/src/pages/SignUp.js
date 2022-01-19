import * as React from "react";
import Navbar from "../components/Navbar";
import SignUpForm from "../components/SignUpForm";
import Footer from "../components/Footer";


export default function SignUp() {
    return(
        <>
            <section>
                <Navbar />
                <SignUpForm />
            </section>
            <Footer />
        </>
    );
}
