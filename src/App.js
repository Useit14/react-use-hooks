import React, {useEffect, useState} from "react";
import useDocumentVisibility from "./useDocumentVisibility";
import MediaQuery from "./react-responsive/MediaQuery";

function App() {
    const {count, visible} = useDocumentVisibility();


    return (
        <div className="App">
            <div>
                Вы покинули страницу: {count} раз
                Вкладка активна? {visible ? 'да' : 'нет'}
            </div>
            <div>
                <h1>Device Test!</h1>
                <MediaQuery minWidth={1224} context={
                    <MediaQuery minWidth={1824} context={
                        <p>You also have a huge screen</p>
                    }>
                    </MediaQuery>
                }>
                </MediaQuery>
                <MediaQuery maxWidth="600px" context={
                    <p>Tablet</p>
                }>
                </MediaQuery>
                <MediaQuery orientation="portrait" context={
                    <p>You are retina</p>
                }>
                </MediaQuery>
            </div>
        </div>);
}


export default App