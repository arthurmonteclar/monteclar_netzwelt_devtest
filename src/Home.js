import { React, useEffect, useState } from "react";

const Home = () => {

    const [territories, territoriesupdate] = useState([]);

    function hasChild(id){
        let checkForChild = false;
        territories.data.forEach(
            (element) => {
                if (element.parent === id){
                    checkForChild = true;
                }
            }
        );
        return checkForChild;
    }

    function RenderTerritories(parent) {
        let checkForChild = false;
        let dataSample;
        if (territories === undefined) {
            dataSample = [
                {
                    "id": "Loading...",
                    "name": "Fetching Data...",
                    "parent": "Loading..."
                }
            ]
        } else {
            dataSample = territories.data;
        }
        const listItems = dataSample.map(
            (element) => {
                if (element.parent === parent) {
                    checkForChild = true;
                    if(hasChild(element.id)){
                        return (
                            <li key={element.id}>
                                <span className="caret" onClick={clickScript}>{element.name}</span>
                                {RenderTerritories(element.id)}
                            </li>
                        )   
                    }else{
                        return (
                            <li key={element.id}>
                                {element.name}
                            </li>
                        )    
                    }
                }
            }
        );
        if (!checkForChild) {
            return(null)
        }
        else if (parent === null) {
            return (
                <ul id="myUL">
                    {listItems}
                </ul>
            )
        }
        else {
            return (
                <ul className="nested">
                    {listItems}
                </ul>
            )

        }
    }

    const fetchData = async () => {
        var requestOptions = {
            method: 'GET',
            mode: 'cors',
            redirect: 'follow'
        };

        const data = await fetch("http://localhost:8010/proxy/Territories/All", requestOptions);
        const terr = await data.json();
        territoriesupdate(terr);
    };

    function clickScript(event){
        event.currentTarget.parentElement.querySelector(".nested").classList.toggle("active");
        event.currentTarget.classList.toggle("caret-down");
    }

    useEffect(() => {
        fetchData();
    }, []);

    return territories.data !== undefined && (
        <div>
            <h2>Territories</h2>
            <p>Here are the list of territories</p>
            {RenderTerritories(null)}
        </div>
    );
}

export default Home;