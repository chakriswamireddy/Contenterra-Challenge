import React, { useEffect, useState } from 'react'
import { convertHtmlToReact } from '@hedgedoc/html-to-react';

import { useCollapse } from "react-collapsed";



function SingleItem({ item,style }) {

    const RenderedHTML = convertHtmlToReact(item.selftext_html);

    const [htmlContentHeight, setHtmlContentHeight] = useState(null)

    const [isExpanded, setExpanded] = useState(false);
    const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded, collapsedHeight: 50, });

    // console.log(RenderedHTML)

    useEffect(()=> {
        setHtmlContentHeight()
    },[])


    return (


        <div style={style}  className="card mb-4 w-100 w-sm-75 border-blue-500 rounded-4 ">
            <div className="card-body">
                <h3 className="card-title "> {item.title}
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className='ms-2  icon-link icon-link-hover'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4H4v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5M9 15L20 4m-5 0h5v5" />
                        </svg>
                    </a>
                </h3>



                {RenderedHTML.length > 0 &&
                    <div className='overflow-hidden  ms-4' {...getCollapseProps()}
                        dangerouslySetInnerHTML={{ __html: RenderedHTML }} />
                }

                <div className='d-flex flex-column  '>
                    {RenderedHTML.length > 0 &&
                        <a className=' text-secondary d-block link-underline-warning  align-self-end w-100 text-end '
                            {...getToggleProps({
                                onClick: () => setExpanded((prevExpanded) => !prevExpanded),
                            })}
                        >
                            {isExpanded ? "Collapse ▲" : "Expand ▼"}
                        </a>
                    }
                <div className="badge rounded-pill text-bg-success border align-self-start mt-2 ms-2"> Score:  {item.score || 0} </div>
                </div>


            </div>
        </div>




    )
}

export default SingleItem
