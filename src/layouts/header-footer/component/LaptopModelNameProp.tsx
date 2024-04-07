import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { takeAllModelofABrand, takeModelFromID } from "../../../api/ModelAPI";
import ModelModel from "../../../models/ModelModel";

export function LaptopModelNameProp( {brandID}:{brandID: number}) {
    const [listModels, setListModels] = useState<ModelModel[]>([]);
    const [informError, setInformError] = useState(null);

    useEffect(() => {
        takeAllModelofABrand(brandID).then(
            modelData => {
                setListModels(modelData);
            }
        ).catch(
            error => {
                setInformError(error.message);
            }
        );

    }, [])

    return (
        <div>
            {listModels.map((model) => (
                <li key={model.getModelID()}> <Link to={`/model/${model.getModelID()}`}><p>{model.getModelName()}</p> </Link>  </li>
            ))}
        </div>
    )
}