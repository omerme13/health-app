import React, { useEffect, useState } from "react";

import Form from "./components/Form/Form";

import "./App.scss";

const App = () => {
    const [testDiagnose, setTestDiagnose] = useState({});
    const [error, setError] = useState(null);
    const [isErrorShown, setIsErrorShown] = useState(false);
    
    const isContentShown = testDiagnose.data || testDiagnose.isLoading;
    const errMessage = error?.response?.data.message || 'No connection to server';

    const getContent = () => {
        if (error) {
            return '';
        }

        if (testDiagnose.isLoading) {
            return "Loading...";
        }

        return testDiagnose.isFound ? (
            <div>
                <div className="diagnose__content-name">
                    {testDiagnose.data.name}
                </div>
                <br />
                <div>
                    {testDiagnose.data.isGoodDiagnose ? "Good 🙂" : "Bad 🙁"}
                </div>
            </div>
        ) : (
            testDiagnose.data.name // name is unknown
        );
    };

    const getContentClass = () => {
        if (!testDiagnose.data || testDiagnose.isLoading || error) {
            return '';
        }

        if (!testDiagnose.isFound) {
            return "unknown";
        }

        return testDiagnose.data.isGoodDiagnose ? "good" : "bad";
    };

    useEffect(() => {
        if (error) {
            setIsErrorShown(true);
            let timer = setTimeout(() => setIsErrorShown(false), 3000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [error, setIsErrorShown]);

    return (
        <div className="app">
            <h1 className="app__header">Health App</h1>
            <div className="app__content">
                <Form setTestDiagnose={setTestDiagnose} setError={setError} />
                <div className="diagnose">
                    {isContentShown && (
                        <div
                            className={`diagnose__content diagnose__content--${getContentClass()}`}
                        >
                            {getContent()}
                        </div>
                    )}
                </div>
            </div>
            {isErrorShown && (
                <div className="app__error">{errMessage}</div>
            )}
        </div>
    );
};

export default App;
