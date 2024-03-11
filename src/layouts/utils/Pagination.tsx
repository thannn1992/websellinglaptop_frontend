import React from "react";
interface PaginationAPIInterface {
    presentPage: number;
    totalPage: number;
    pagination: any;
}

export const Pagination: React.FC<PaginationAPIInterface> = (props) => {
    const listPages = [];

    if (props.presentPage === 1) {
        listPages.push(props.presentPage);
        if (props.totalPage >= props.presentPage + 1) {
            listPages.push(props.presentPage + 1);
        }
        if (props.totalPage >= props.presentPage + 2) {
            listPages.push(props.presentPage + 2);
        }
        if (props.totalPage >= props.presentPage + 3) {
            listPages.push(props.presentPage + 3);
        }
    } else if (props.presentPage > 1) {
        // page -2
        if (props.presentPage >= 3) {
            listPages.push(props.presentPage - 2);
        }
        // page -1
        if (props.presentPage >= 2) {
            listPages.push(props.presentPage - 1);
        }
        listPages.push(props.presentPage)
        // page +1
        if (props.totalPage >= props.presentPage + 1) {
            listPages.push(props.presentPage + 1);
        }
        if (props.totalPage >= props.presentPage + 2) {
            listPages.push(props.presentPage + 2);
        }
        if (props.totalPage >= props.presentPage + 3) {
            listPages.push(props.presentPage + 3);
        }
    }

    return (
        <div className="container">
            <ul className="Pagination-container pagination">
                <li className="Pagination-container-items page-items" onClick={() => props.pagination(1)}>
                    <button >
                       <p>
                       &laquo;
                        </p>
                    </button>
                </li>

                {
                    listPages.map(page => (
                        <li className="Pagination-container-items page-item Pagination-button-middle" key={page} onClick={() => props.pagination(page)}>
                            <button className={"page-link " + (props.presentPage===page?"active":"")}>
                            {page}
                            </button>
                        </li>

                    ))
                }

                <li className="Pagination-container-items " onClick={() => props.pagination(props.totalPage)}>
                    <button >
                    <p>
                    &raquo;
                        </p>
                    </button>

                </li>
            </ul>


        </div>
    )



}