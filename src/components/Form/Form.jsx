import React, { useEffect, useState } from "react";
import useAxios from "axios-hooks";

import "./Form.scss";

const Form = ({ setTestDiagnose, setError }) => {
    const [testName, setTestName] = useState("");
    const [testResult, setTestResult] = useState(0);

    const isFormValid = testName && testResult;

    const [{ data, loading, error }, getTestResult] = useAxios(
        {
            url: "http://localhost:3000/api/v1/tests/test",
            method: "POST",
            data: { testName, userTestResult: testResult },
        },
        { manual: true }
    );

    const handleSendButton = () => {
        if (isFormValid) {
            getTestResult();
        }
    };

    const handleSendOnEnter = (e) => {
        if (e.key === "Enter") {
            handleSendButton();
        }
    };

    const handleTestResultInput = (e) => {
        if (e.target.value.includes("-")) {
            setTestResult("");
            return;
        }

        setTestResult(e.target.value);
    }

    useEffect(() => {
        setTestDiagnose({ ...data, isLoading: loading });
    }, [data, setTestDiagnose, loading]);

    useEffect(() => {
        if (error) {
            setError(error);
        }
    }, [setError, error]);

    return (
        <div className="form" onKeyDown={handleSendOnEnter}>
            <div className="form__input-container">
                <input
                    type="text"
                    className="form__input"
                    value={testName}
                    onChange={(e) => setTestName(e.target.value)}
                    placeholder="Enter test's name"
                />
                <input
                    type="number"
                    className="form__input"
                    value={testResult || ""}
                    onChange={handleTestResultInput}
                    placeholder="Enter test's result"
                />
            </div>
            <button
                className="form__button"
                onClick={handleSendButton}
                disabled={!isFormValid}
            >
                Send
            </button>
        </div>
    );
};

export default Form;
