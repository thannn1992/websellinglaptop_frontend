import React from "react";
export const Banner02 = () => {

    return (
        <div className="banner02">
            <div className="container">
                <div className="banner02-content " >
                    <div className="banner02-content-1"  >
                        {/* img-fluid -> max-width: 100%, height:auto */}
                        {/* rounded -> round 6px */}
                        <a href="#"><img className="img-fluid rounded" style={{height:'140px'}} src={require('./../../../images/banner/banner02.webp')} alt="" /></a>
                    </div>
                
                    <div className="banner02-content-2 " >
                        <a href="#"><img className="img-fluid rounded" style={{height:'140px'}} src={require('./../../../images/banner/banner0201.webp')} alt="" /></a>
                    </div>
                </div>
            </div>
        </div>
    )
}