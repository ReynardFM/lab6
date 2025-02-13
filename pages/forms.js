import React, { use } from "react";
import { useState, useRef, useEffect } from "react";

export default function ControlledComponents() {
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const password = useRef(null);
    const [passwordError, setPasswordError] = useState("");

    useEffect(() => {
        if(name === ""){
            setNameError("Name cannot be empty");
        }else{
            setNameError("");
        }
        if(email === ""){
            setEmailError("Email cannot be empty");
        } else if(!(email.includes("@") && email.includes("."))){
            setEmailError("Email must contain @ and a domain");
        } else {
            setEmailError("");
        }
    }, [name, email]);

    function handleName(e){
        setName(e.target.value);
    };

    function handleEmail(e){
        setEmail(e.target.value);
    };

    function handlePass(e){
        if(password.current.value.length < 6){
            setPasswordError("Password must be at least 6 characters long");
        } else{
            setPasswordError("");
        }
    }

    function validate(e){
        e.preventDefault();
        if(nameError || emailError || passwordError || password.current.value === ""){
            alert("Please enter valid details");
        } else{
            alert("Form submitted");
            console.log("Name: " + name, "Email: " + email, "Password: " + password.current.value);
            setName("");
            setEmail("");
            password.current.value = "";
        }
    };

    return(
        <div>
            <form onSubmit={validate}>
                <label for="name">Name  :</label>
                <input type="text" name="name" placeholder="Enter your name" value={name} onChange={handleName}></input>
                {nameError && <span style={{color: "red"}}>{nameError}</span>}
                <br/>
                <label for="email">Email :</label>                
                <input type="text" name="email" placeholder="Enter your email" value={email} onChange={handleEmail}></input>
                {emailError && <span style={{color: "red"}}>{emailError}</span>}
                <br/>
                <label for="password">Password :</label>
                <input type="password" name="password" ref={password} onChange={handlePass}></input>
                {passwordError && <span style={{color: "red"}}>{passwordError}</span>}
                <br/>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}