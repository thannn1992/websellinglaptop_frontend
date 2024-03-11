import React from "react";
export const Banner02 = () => {

    return (
        <div className="banner02">
            <div className="container">
                <div className="banner02-content row " >
                    <div className="col-6"  >
                        {/* img-fluid -> max-width: 100%, height:auto */}
                        {/* rounded -> round 6px */}
                        <a href="#"><img className="img-fluid rounded" style={{height:'135px'}} src={require('./../../../images/banner/banner02.webp')} alt="" /></a>
                    </div>
                    <div className="col-6 " >
                        <a href="#"><img className="img-fluid rounded" style={{height:'135px'}} src={require('./../../../images/banner/banner0201.webp')} alt="" /></a>
                    </div>
                </div>
            </div>
        </div>
    )
}